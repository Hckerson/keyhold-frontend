import { Banknote, CircleCheck, ShieldAlert, Wallet } from "lucide-react";
import type { FilterPill } from "@/components/patterns/filter-pills";
import type { StatDatum } from "@/components/patterns/stat-cell";
import { PAYOUT_PIPELINE_ORDER, PAYOUT_STATES } from "@/lib/config/admin-tones";
import { PLATFORM_PAYOUT_FEE_RATE } from "@/lib/constants";
import type { MetricItem, Payout, PayoutStage, PayoutState } from "@/lib/types";
import type { EscrowStage } from "@/lib/validations/escrow";
import { formatCompactUsd, formatUsd, sum } from "@/lib/utils";
import { minutesSince } from "@/lib/utils/elapsed";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const FULL_PERCENT = 100;
const NO_WINDOW = "—";

export type PayoutStateFilter = "all" | PayoutState;

export const payoutFee = (payout: Payout) =>
    Math.round(payout.gross * PLATFORM_PAYOUT_FEE_RATE);

export const payoutNet = (payout: Payout) => payout.gross - payoutFee(payout);

const sumGross = (payouts: Payout[]) =>
    sum(payouts.map((payout) => payout.gross));

const byState = (payouts: Payout[], state: PayoutState) =>
    payouts.filter((payout) => payout.state === state);

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

export const inspectionLabel = (payout: Payout) => {
    if (!payout.inspectionEndsAt) return NO_WINDOW;
    const days = Math.ceil(
        (new Date(payout.inspectionEndsAt).getTime() - Date.now()) / MS_PER_DAY,
    );
    return days <= 0 ? "Window closed" : `${days}d left`;
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

export const stageShare = (stage: PayoutStage, stages: PayoutStage[]) => {
    const total = sum(stages.map((entry) => entry.count));
    return total ? Math.round((stage.count / total) * FULL_PERCENT) : 0;
};

export const PAYOUT_FILTERS: readonly FilterPill<PayoutStateFilter>[] = [
    { id: "all", label: "All" },
    ...PAYOUT_PIPELINE_ORDER.map((id) => ({
        id,
        label: PAYOUT_STATES[id].label,
    })),
];

export const matchesPayoutFilters = (
    payout: Payout,
    state: PayoutStateFilter,
) => state === "all" || payout.state === state;

export const payoutCounts = (
    payouts: Payout[],
): Record<PayoutStateFilter, number> =>
    PAYOUT_PIPELINE_ORDER.reduce<Record<PayoutStateFilter, number>>(
        (counts, id) => ({ ...counts, [id]: byState(payouts, id).length }),
        { all: payouts.length } as Record<PayoutStateFilter, number>,
    );

export const paymentStats = (payouts: Payout[]): StatDatum[] => [
    {
        id: "held",
        icon: Wallet,
        label: "Held in escrow",
        value: formatCompactUsd(outstandingPayout(payouts)),
        tone: "warning",
    },
    {
        id: "holds",
        icon: Banknote,
        label: "Open holds",
        value: `${heldPayouts(payouts).length}`,
        tone: "accent",
    },
    {
        id: "released",
        icon: CircleCheck,
        label: "Released",
        value: formatCompactUsd(sumGross(byState(payouts, "RELEASED"))),
        tone: "success",
    },
    {
        id: "disputed",
        icon: ShieldAlert,
        label: "Disputed",
        value: `${byState(payouts, "DISPUTED").length}`,
        tone: "error",
    },
];

export const settlementMetrics = (payouts: Payout[]): MetricItem[] => [
    {
        label: "Gross held",
        value: formatUsd(outstandingPayout(payouts)),
    },
    {
        label: "Platform fee",
        value: formatUsd(sum(heldPayouts(payouts).map(payoutFee))),
    },
    {
        label: "Net to sellers",
        value: formatUsd(sum(heldPayouts(payouts).map(payoutNet))),
    },
    {
        label: "Fee rate",
        value: `${(PLATFORM_PAYOUT_FEE_RATE * FULL_PERCENT).toFixed(1)}%`,
    },
];

export const paymentsSummary = (payouts: Payout[]) =>
    `${byState(payouts, "DISPUTED").length} disputed · ${
        heldPayouts(payouts).length
    } held · ${formatCompactUsd(outstandingPayout(payouts))} awaiting release`;
