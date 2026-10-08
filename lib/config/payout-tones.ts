import {
    CircleCheck,
    Hourglass,
    Lock,
    LockOpen,
    ShieldAlert,
    Undo2,
    type LucideIcon,
} from "lucide-react";
import { bandTone, type ToneBand } from "@/lib/config/admin-tones";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { PayoutPhase, PayoutState, StatusTone } from "@/lib/types";

export interface PayoutStateMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    chartTone: ChartTone;
    rank: number;
    held: boolean;
    settlable: boolean;
}

export const PAYOUT_STATES: Record<PayoutState, PayoutStateMeta> = {
    DISPUTED: {
        label: "Disputed",
        icon: ShieldAlert,
        tone: "error",
        chartTone: "error",
        rank: 4,
        held: true,
        settlable: false,
    },
    HELD: {
        label: "Held",
        icon: Lock,
        tone: "warning",
        chartTone: "neutral",
        rank: 3,
        held: true,
        settlable: true,
    },
    REFUNDED: {
        label: "Refunded",
        icon: Undo2,
        tone: "neutral",
        chartTone: "neutral",
        rank: 2,
        held: false,
        settlable: false,
    },
    RELEASED: {
        label: "Released",
        icon: CircleCheck,
        tone: "success",
        chartTone: "accent",
        rank: 1,
        held: false,
        settlable: false,
    },
};

export interface PayoutPhaseMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    rank: number;
}

export const PAYOUT_PHASES: Record<PayoutPhase, PayoutPhaseMeta> = {
    disputed: { label: "Disputed", icon: ShieldAlert, tone: "error", rank: 0 },
    ready: { label: "Ready", icon: LockOpen, tone: "success", rank: 1 },
    inspecting: {
        label: "In inspection",
        icon: Hourglass,
        tone: "neutral",
        rank: 2,
    },
    paid: { label: "Paid", icon: CircleCheck, tone: "neutral", rank: 3 },
    refunded: { label: "Refunded", icon: Undo2, tone: "neutral", rank: 4 },
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
    { ceiling: PAYOUT_SLA_MINUTES, tone: "neutral" },
    { ceiling: 10_080, tone: "neutral" },
];

export const payoutAgeTone = (minutes: number) =>
    bandTone(PAYOUT_AGE_BANDS, minutes, "error");
