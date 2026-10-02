import {
    ClipboardCheck,
    Flag,
    Gavel,
    ShieldCheck,
    UserCheck,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { ChartTone } from "@/lib/config/chart-tones";
import { ADMIN_ROUTES } from "@/lib/constants";
import type {
    DecisionLaneId,
    ModerationQueueId,
    ServiceState,
} from "@/lib/types";

export interface ToneBand {
    ceiling: number;
    tone: ChartTone;
}

export const bandTone = (
    bands: ToneBand[],
    value: number,
    fallback: ChartTone,
) => bands.find((band) => value < band.ceiling)?.tone ?? fallback;

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
            href: ADMIN_ROUTES.verifications,
            tone: "accent",
        },
        listings: {
            label: "Listing review",
            icon: ClipboardCheck,
            href: ADMIN_ROUTES.listings,
            tone: "info",
        },
        flags: {
            label: "Flagged accounts & messages",
            icon: Flag,
            href: ADMIN_ROUTES.flags,
            tone: "warning",
        },
        disputes: {
            label: "Disputes",
            icon: Gavel,
            href: ADMIN_ROUTES.disputes,
            tone: "error",
        },
    };

export const DECISION_LANES: Record<DecisionLaneId, ModerationQueueMeta> = {
    ...MODERATION_QUEUES,
    accounts: {
        label: "Account approvals",
        icon: UserCheck,
        href: ADMIN_ROUTES.users,
        tone: "highlight",
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
