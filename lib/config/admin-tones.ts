import {
    ArrowLeftRight,
    Banknote,
    ClipboardCheck,
    Flag,
    Gavel,
    Landmark,
    Percent,
    Receipt,
    Server,
    ShieldCheck,
    Sparkles,
    Star,
    Wallet,
    Zap,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { ChartTone } from "@/lib/config/chart-tones";
import { PENDING_VERIFICATIONS } from "@/lib/config/admin-nav";
import type {
    ModerationQueueId,
    PayoutMethod,
    PayoutState,
    RevenueStreamId,
    ServiceState,
    SignalDomain,
    SignalSeverity,
} from "@/lib/types";

interface ToneBand {
    ceiling: number;
    tone: ChartTone;
}

const bandTone = (bands: ToneBand[], value: number, fallback: ChartTone) =>
    bands.find((band) => value < band.ceiling)?.tone ?? fallback;

export interface SignalSeverityMeta {
    label: string;
    tone: DotTone;
    rank: number;
}

export const SIGNAL_SEVERITIES: Record<SignalSeverity, SignalSeverityMeta> = {
    critical: { label: "Critical", tone: "error", rank: 2 },
    elevated: { label: "Elevated", tone: "warning", rank: 1 },
    routine: { label: "Routine", tone: "info", rank: 0 },
};

export interface SignalDomainMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const SIGNAL_DOMAINS: Record<SignalDomain, SignalDomainMeta> = {
    verification: { label: "Verification", icon: ShieldCheck, tone: "accent" },
    moderation: { label: "Moderation", icon: Flag, tone: "warning" },
    transaction: {
        label: "Transaction",
        icon: ArrowLeftRight,
        tone: "highlight",
    },
    payout: { label: "Payout", icon: Wallet, tone: "info" },
    infrastructure: { label: "Platform", icon: Server, tone: "neutral" },
};

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
            label: "Flagged content",
            icon: Flag,
            href: "/admin/listings",
            tone: "warning",
        },
        disputes: {
            label: "Disputes",
            icon: Gavel,
            href: "/admin/transactions",
            tone: "error",
        },
    };

export const QUEUE_SEED_BACKLOG: Record<ModerationQueueId, number> = {
    verifications: PENDING_VERIFICATIONS,
    listings: 12,
    flags: 3,
    disputes: 2,
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
    failed: {
        label: "Failed",
        tone: "error",
        chartTone: "error",
        rank: 4,
        held: true,
    },
    review: {
        label: "In review",
        tone: "warning",
        chartTone: "warning",
        rank: 3,
        held: true,
    },
    approved: {
        label: "Approved",
        tone: "info",
        chartTone: "info",
        rank: 2,
        held: true,
    },
    scheduled: {
        label: "Scheduled",
        tone: "info",
        chartTone: "accent",
        rank: 1,
        held: true,
    },
    released: {
        label: "Released",
        tone: "success",
        chartTone: "success",
        rank: 0,
        held: false,
    },
};

export const PAYOUT_PIPELINE_ORDER: PayoutState[] = [
    "failed",
    "review",
    "approved",
    "scheduled",
    "released",
];

export interface PayoutMethodMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const PAYOUT_METHODS: Record<PayoutMethod, PayoutMethodMeta> = {
    wire: { label: "Wire", icon: Landmark, tone: "accent" },
    ach: { label: "ACH", icon: Banknote, tone: "info" },
    instant: { label: "Instant", icon: Zap, tone: "highlight" },
};

export const PAYOUT_METHOD_ORDER: PayoutMethod[] = ["wire", "ach", "instant"];

export interface RevenueStreamMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const REVENUE_STREAMS: Record<RevenueStreamId, RevenueStreamMeta> = {
    commission: { label: "Commission", icon: Percent, tone: "accent" },
    fees: { label: "Platform fees", icon: Receipt, tone: "info" },
    subscription: {
        label: "Agent subscriptions",
        icon: Sparkles,
        tone: "highlight",
    },
    featured: { label: "Featured placement", icon: Star, tone: "success" },
};

export const REVENUE_STREAM_ORDER: RevenueStreamId[] = [
    "commission",
    "fees",
    "subscription",
    "featured",
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
