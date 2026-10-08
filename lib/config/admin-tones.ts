import {
    ClipboardCheck,
    Flag,
    Gavel,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import { ADMIN_ROUTES } from "@/lib/constants";
import type { ModerationQueueId, ServiceState, StatusTone } from "@/lib/types";

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
            tone: "neutral",
        },
        listings: {
            label: "Listing review",
            icon: ClipboardCheck,
            href: ADMIN_ROUTES.listings,
            tone: "neutral",
        },
        flags: {
            label: "Flagged content",
            icon: Flag,
            href: ADMIN_ROUTES.flags,
            tone: "neutral",
        },
        disputes: {
            label: "Disputes",
            icon: Gavel,
            href: ADMIN_ROUTES.disputes,
            tone: "neutral",
        },
    };

export interface ServiceStateMeta {
    label: string;
    tone: StatusTone;
    chartTone: ChartTone;
}

export const SERVICE_STATES: Record<ServiceState, ServiceStateMeta> = {
    operational: {
        label: "Operational",
        tone: "success",
        chartTone: "accent",
    },
    degraded: { label: "Degraded", tone: "error", chartTone: "error" },
    down: { label: "Down", tone: "error", chartTone: "error" },
};

const AGE_BANDS: ToneBand[] = [
    { ceiling: 60, tone: "neutral" },
    { ceiling: 240, tone: "neutral" },
    { ceiling: 1_440, tone: "neutral" },
];

const LOAD_BANDS: ToneBand[] = [
    { ceiling: 60, tone: "accent" },
    { ceiling: 85, tone: "neutral" },
];

const ERROR_RATE_BANDS: ToneBand[] = [
    { ceiling: 0.05, tone: "accent" },
    { ceiling: 0.2, tone: "neutral" },
];

export const UPTIME_SLO = 99.9;

export const errorBudgetUsed = (uptime: number) =>
    Math.min(100, Math.round(((100 - uptime) / (100 - UPTIME_SLO)) * 100));

export const ageTone = (minutes: number) =>
    bandTone(AGE_BANDS, minutes, "error");

export const loadTone = (share: number) => bandTone(LOAD_BANDS, share, "error");

export const errorRateTone = (rate: number) =>
    bandTone(ERROR_RATE_BANDS, rate, "error");
