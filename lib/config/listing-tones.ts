import {
    Activity,
    BadgeCheck,
    CircleSlash,
    Clock,
    FilePen,
    Flame,
    Handshake,
    Hourglass,
    Moon,
    Sparkles,
    Store,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { DotTone } from "@/components/patterns/status-dot";
import type { ManagedListingStatus } from "@/lib/types";

export const LISTING_STATUS_KEYS: ManagedListingStatus[] = [
    "active",
    "under-offer",
    "sold",
    "draft",
    "expired",
];

export interface ListingStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
    onMarket: boolean;
}

export const LISTING_STATUSES: Record<ManagedListingStatus, ListingStatusMeta> =
    {
        active: {
            label: "Active",
            icon: Store,
            tone: "success",
            chartTone: "success",
            rank: 5,
            onMarket: true,
        },
        "under-offer": {
            label: "Under Offer",
            icon: Handshake,
            tone: "warning",
            chartTone: "warning",
            rank: 4,
            onMarket: true,
        },
        sold: {
            label: "Sold",
            icon: BadgeCheck,
            tone: "info",
            chartTone: "info",
            rank: 3,
            onMarket: false,
        },
        draft: {
            label: "Draft",
            icon: FilePen,
            tone: "neutral",
            chartTone: "neutral",
            rank: 2,
            onMarket: false,
        },
        expired: {
            label: "Expired",
            icon: CircleSlash,
            tone: "error",
            chartTone: "error",
            rank: 1,
            onMarket: false,
        },
    };

export const DEMAND_BAND_KEYS = ["hot", "steady", "quiet"] as const;

export type DemandBand = (typeof DEMAND_BAND_KEYS)[number];

export interface DemandBandMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    floor: number;
}

export const DEMAND_BANDS: Record<DemandBand, DemandBandMeta> = {
    hot: {
        label: "Hot — save rate above 6%",
        icon: Flame,
        tone: "highlight",
        floor: 6,
    },
    steady: {
        label: "Steady — 3% to 6%",
        icon: Activity,
        tone: "accent",
        floor: 3,
    },
    quiet: { label: "Quiet — under 3%", icon: Moon, tone: "neutral", floor: 0 },
};

export const AGE_BAND_KEYS = ["fresh", "maturing", "stale"] as const;

export type AgeBand = (typeof AGE_BAND_KEYS)[number];

export interface AgeBandMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    ceiling: number;
}

export const AGE_BANDS: Record<AgeBand, AgeBandMeta> = {
    fresh: {
        label: "Fresh — under 30 days",
        icon: Sparkles,
        tone: "success",
        ceiling: 30,
    },
    maturing: {
        label: "Maturing — 30 to 90 days",
        icon: Clock,
        tone: "warning",
        ceiling: 90,
    },
    stale: {
        label: "Stale — over 90 days",
        icon: Hourglass,
        tone: "error",
        ceiling: Infinity,
    },
};

const EXPOSURE_IDLE = 20;
const EXPOSURE_MODEST = 55;
const EXPOSURE_STRONG = 80;

export const exposureTone = (percent: number): ChartTone => {
    if (percent < EXPOSURE_IDLE) return "neutral";
    if (percent < EXPOSURE_MODEST) return "warning";
    if (percent < EXPOSURE_STRONG) return "accent";
    return "success";
};
