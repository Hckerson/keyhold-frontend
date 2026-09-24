import {
    ClipboardCheck,
    Flag,
    Gavel,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { ModerationQueueId, PayoutState, ServiceState } from "@/lib/types";

interface ToneBand {
    ceiling: number;
    tone: ChartTone;
}

const bandTone = (bands: ToneBand[], value: number, fallback: ChartTone) =>
    bands.find((band) => value < band.ceiling)?.tone ?? fallback;

export interface ModerationQueueMeta {
    label: string;
    icon: LucideIcon;
    href: string;
    tone: ChartTone;
}

export const MODERATION_QUEUES: Record<ModerationQueueId, ModerationQueueMeta> =
    {
        verifications: {
            label: "Verifications",
            icon: ShieldCheck,
            href: "/admin/verifications",
            tone: "accent",
        },
        listings: {
            label: "Listing review",
            icon: ClipboardCheck,
            href: "/admin/listings",
            tone: "info",
        },
        flags: {
            label: "Flagged accounts & messages",
            icon: Flag,
            href: "/admin/flags",
            tone: "warning",
        },
        disputes: {
            label: "Disputes",
            icon: Gavel,
            href: "/admin/transactions",
            tone: "error",
        },
    };

export interface ServiceStateMeta {
    label: string;
    tone: DotTone;
    chartTone: ChartTone;
}

export const SERVICE_STATES: Record<ServiceState, ServiceStateMeta> = {
    operational: {
        label: "Operational",
        tone: "success",
        chartTone: "success",
    },
    degraded: { label: "Degraded", tone: "warning", chartTone: "warning" },
    down: { label: "Down", tone: "error", chartTone: "error" },
};

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

const AGE_BANDS: ToneBand[] = [
    { ceiling: 60, tone: "neutral" },
    { ceiling: 240, tone: "info" },
    { ceiling: 1_440, tone: "warning" },
];

const LOAD_BANDS: ToneBand[] = [
    { ceiling: 60, tone: "success" },
    { ceiling: 85, tone: "warning" },
];

const ERROR_RATE_BANDS: ToneBand[] = [
    { ceiling: 0.05, tone: "success" },
    { ceiling: 0.2, tone: "warning" },
];

export const UPTIME_SLO = 99.9;

export const errorBudgetUsed = (uptime: number) =>
    Math.min(100, Math.round(((100 - uptime) / (100 - UPTIME_SLO)) * 100));

export const ageTone = (minutes: number) =>
    bandTone(AGE_BANDS, minutes, "error");

export const loadTone = (share: number) => bandTone(LOAD_BANDS, share, "error");

export const errorRateTone = (rate: number) =>
    bandTone(ERROR_RATE_BANDS, rate, "error");
