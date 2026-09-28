import type { DotTone } from "@/components/patterns/status-dot";
import { bandTone, type ToneBand } from "@/lib/config/admin-tones";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { PayoutState } from "@/lib/types";

export interface PayoutStateMeta {
    label: string;
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
    held: boolean;
}

export const PAYOUT_STATES: Record<PayoutState, PayoutStateMeta> = {
    DISPUTED: {
        label: "Disputed",
        tone: "error",
        chartTone: "error",
        rank: 4,
        held: true,
    },
    HELD: {
        label: "Held",
        tone: "warning",
        chartTone: "warning",
        rank: 3,
        held: true,
    },
    REFUNDED: {
        label: "Refunded",
        tone: "neutral",
        chartTone: "neutral",
        rank: 2,
        held: false,
    },
    RELEASED: {
        label: "Released",
        tone: "success",
        chartTone: "success",
        rank: 1,
        held: false,
    },
};

export const PAYOUT_PIPELINE_ORDER: PayoutState[] = [
    "DISPUTED",
    "HELD",
    "REFUNDED",
    "RELEASED",
];

export const PAYOUT_SLA_MINUTES = 4_320;

const PAYOUT_AGE_BANDS: ToneBand[] = [
    { ceiling: 1_440, tone: "neutral" },
    { ceiling: PAYOUT_SLA_MINUTES, tone: "info" },
    { ceiling: 10_080, tone: "warning" },
];

export const payoutAgeTone = (minutes: number) =>
    bandTone(PAYOUT_AGE_BANDS, minutes, "error");
