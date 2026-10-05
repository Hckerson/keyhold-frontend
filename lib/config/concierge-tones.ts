import type { ChartTone } from "@/lib/config/chart-tones";
import type { StatusTone } from "@/lib/types";

export const CONCIERGE_TIER_KEYS = ["platinum", "vip", "premium"] as const;

export type ConciergeTier = (typeof CONCIERGE_TIER_KEYS)[number];

export interface ConciergeTierMeta {
    label: string;
    tone: StatusTone;
    rank: number;
}

export const CONCIERGE_TIERS: Record<ConciergeTier, ConciergeTierMeta> = {
    platinum: { label: "Platinum", tone: "info", rank: 3 },
    vip: { label: "VIP", tone: "success", rank: 2 },
    premium: { label: "Premium", tone: "neutral", rank: 1 },
};

export const CONCIERGE_STATUS_KEYS = [
    "acquiring",
    "under-contract",
    "divesting",
    "dormant",
] as const;

export type ConciergeStatus = (typeof CONCIERGE_STATUS_KEYS)[number];

export interface ConciergeStatusMeta {
    label: string;
    tone: StatusTone;
    badgeTone: StatusTone;
}

export const CONCIERGE_STATUSES: Record<ConciergeStatus, ConciergeStatusMeta> =
    {
        acquiring: {
            label: "Acquiring",
            tone: "success",
            badgeTone: "success",
        },
        "under-contract": {
            label: "Under contract",
            tone: "info",
            badgeTone: "info",
        },
        divesting: {
            label: "Divesting",
            tone: "warning",
            badgeTone: "warning",
        },
        dormant: { label: "Dormant", tone: "neutral", badgeTone: "neutral" },
    };

const ALLOCATION_IDLE = 1;
const ALLOCATION_LOW = 50;
const ALLOCATION_HIGH = 90;

export const allocationTone = (percent: number): ChartTone => {
    if (percent < ALLOCATION_IDLE) return "neutral";
    if (percent < ALLOCATION_LOW) return "info";
    if (percent < ALLOCATION_HIGH) return "accent";
    return "success";
};

const COVERAGE_PARTIAL = 60;
const COVERAGE_FULL = 100;

export const coverageTone = (percent: number): ChartTone => {
    if (percent < COVERAGE_PARTIAL) return "warning";
    if (percent < COVERAGE_FULL) return "accent";
    return "success";
};
