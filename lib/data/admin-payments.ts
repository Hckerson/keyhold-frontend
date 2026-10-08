import {
    PAYOUT_PIPELINE_ORDER,
    PAYOUT_STATES,
} from "@/lib/config/payout-tones";
import { PLATFORM_PAYOUT_FEE_RATE } from "@/lib/constants";
import type {
    EscrowPosition,
    Payout,
    PayoutStage,
    PayoutState,
} from "@/lib/types";
import type { EscrowStage } from "@/lib/validations/escrow";
import { formatAge, formatCompactUsd, sum } from "@/lib/utils";
import { minutesSince } from "@/lib/utils/elapsed";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const FULL_PERCENT = 100;

export type PayoutStateFilter = "all" | PayoutState;

export const payoutFee = (payout: Payout) =>
    Math.round(payout.gross * PLATFORM_PAYOUT_FEE_RATE);

export const payoutNet = (payout: Payout) => payout.gross - payoutFee(payout);

const sumGross = (payouts: Payout[]) =>
    sum(payouts.map((payout) => payout.gross));

export const heldPayouts = (payouts: Payout[]) =>
    payouts.filter((payout) => PAYOUT_STATES[payout.state].held);

export const outstandingPayout = (payouts: Payout[]) =>
    sumGross(heldPayouts(payouts));

export const inspectionDaysLeft = (payout: Payout, now = new Date()) =>
    payout.inspectionEndsAt
        ? Math.ceil(
              (new Date(payout.inspectionEndsAt).getTime() - now.getTime()) /
                  MS_PER_DAY,
          )
        : null;

export const toPayoutStages = (stages: EscrowStage[]): PayoutStage[] =>
    PAYOUT_PIPELINE_ORDER.map((id) => {
        const stage = stages.find((entry) => entry.status === id);
        return {
            id,
            count: stage?.count ?? 0,
            amount: stage?.amount ?? 0,
            oldestMinutes: stage?.oldestAt ? minutesSince(stage.oldestAt) : 0,
        };
    });

export const matchesPayoutFilters = (
    payout: Payout,
    state: PayoutStateFilter,
) => state === "all" || payout.state === state;

export const FEE_RATE_LABEL = `${(PLATFORM_PAYOUT_FEE_RATE * FULL_PERCENT).toFixed(1)}%`;

export const escrowPosition = (stages: PayoutStage[]): EscrowPosition => {
    const held = stages.filter((stage) => PAYOUT_STATES[stage.id].held);
    const gross = sum(held.map((stage) => stage.amount));
    const fee = Math.round(gross * PLATFORM_PAYOUT_FEE_RATE);

    return {
        held: gross,
        holds: sum(held.map((stage) => stage.count)),
        fee,
        net: gross - fee,
    };
};

export function payoutTotals(payouts: Payout[]) {
    return {
        count: payouts.length,
        gross: sumGross(payouts),
        fee: sum(payouts.map(payoutFee)),
        net: sum(payouts.map(payoutNet)),
    };
}

const plural = (count: number, noun: string) =>
    `${count} ${noun}${count === 1 ? "" : "s"}`;

export const escrowCountLabel = (stage: PayoutStage) =>
    plural(stage.count, PAYOUT_STATES[stage.id].held ? "hold" : "payout");

export const payoutsReading = (
    payouts: Payout[],
    state: PayoutStateFilter = "all",
) => {
    const held = heldPayouts(payouts);

    if (payouts.length === 0) return "No payouts on record yet";
    if (state !== "all") {
        const rows = payouts.filter((payout) => payout.state === state);
        return `${PAYOUT_STATES[state].label} · ${plural(rows.length, "payout")}, ${formatCompactUsd(sumGross(rows))} gross`;
    }
    if (held.length === 0) return "Every payout has been settled";
    const oldest = Math.max(...held.map((payout) => payout.ageMinutes));
    return `${plural(held.length, "payout")} still held · the oldest has waited ${formatAge(oldest)}`;
};

export const matchesPayoutQuery = (payout: Payout, query: string) => {
    const needle = query.trim().toLowerCase();
    return (
        needle === "" ||
        [payout.recipient, payout.deal, payout.locality, payout.buyer].some(
            (field) => field.toLowerCase().includes(needle),
        )
    );
};
