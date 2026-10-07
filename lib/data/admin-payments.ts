import {
    PAYOUT_PIPELINE_ORDER,
    PAYOUT_STATES,
} from "@/lib/config/payout-tones";
import { PLATFORM_PAYOUT_FEE_RATE } from "@/lib/constants";
import type {
    DataTableGroupDef,
    EscrowPosition,
    Payout,
    PayoutStage,
    PayoutState,
} from "@/lib/types";
import type { EscrowStage } from "@/lib/validations/escrow";
import { formatCompactUsd, sum } from "@/lib/utils";
import { minutesSince } from "@/lib/utils/elapsed";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const FULL_PERCENT = 100;
const WINDOW_CLOSED = "Closed";
const NO_WINDOW = "—";

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

export const rankPayouts = (payouts: Payout[]) =>
    [...payouts].sort(
        (a, b) =>
            PAYOUT_STATES[b.state].rank - PAYOUT_STATES[a.state].rank ||
            b.gross - a.gross,
    );

export const inspectionDaysLeft = (payout: Payout, now = new Date()) =>
    payout.inspectionEndsAt
        ? Math.ceil(
              (new Date(payout.inspectionEndsAt).getTime() - now.getTime()) /
                  MS_PER_DAY,
          )
        : null;

export const inspectionLabel = (payout: Payout, now = new Date()) => {
    const days = inspectionDaysLeft(payout, now);
    if (days === null) return NO_WINDOW;
    return days <= 0 ? WINDOW_CLOSED : `${days}d left`;
};

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
    return `${held.length} still held · oldest first in each group`;
};

export const matchesPayoutQuery = (payout: Payout, query: string) => {
    const needle = query.trim().toLowerCase();
    return (
        needle === "" ||
        payout.recipient.toLowerCase().includes(needle) ||
        payout.deal.toLowerCase().includes(needle)
    );
};

export const PAYOUT_GROUPS: DataTableGroupDef[] = [
    { id: "disputed", label: "Disputed" },
    { id: "ready", label: "Ready to release" },
    { id: "inspecting", label: "In inspection" },
    { id: "paid", label: "Paid out", collapsed: true },
];

export const payoutGroupOf = (payout: Payout, now = new Date()) => {
    if (payout.state === "DISPUTED") return "disputed";
    if (!PAYOUT_STATES[payout.state].held) return "paid";
    return (inspectionDaysLeft(payout, now) ?? 0) > 0 ? "inspecting" : "ready";
};

export const oldestHeld = (payouts: Payout[]) =>
    Math.max(
        0,
        ...payouts
            .filter((payout) => PAYOUT_STATES[payout.state].held)
            .map((payout) => payout.ageMinutes),
    );
