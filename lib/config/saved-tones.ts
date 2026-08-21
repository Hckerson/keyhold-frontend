import {
    BadgeCheck,
    CircleSlash,
    Clock,
    Eye,
    EyeOff,
    Handshake,
    Store,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { DotTone } from "@/components/patterns/status-dot";
import type { SavedStatus } from "@/lib/types";

export const SAVED_STATUS_KEYS: SavedStatus[] = [
    "available",
    "under-offer",
    "sold",
    "withdrawn",
];

export interface SavedStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    live: boolean;
}

export const SAVED_STATUSES: Record<SavedStatus, SavedStatusMeta> = {
    available: {
        label: "Available",
        icon: Store,
        tone: "success",
        chartTone: "success",
        live: true,
    },
    "under-offer": {
        label: "Under Offer",
        icon: Handshake,
        tone: "warning",
        chartTone: "warning",
        live: true,
    },
    sold: {
        label: "Sold",
        icon: BadgeCheck,
        tone: "info",
        chartTone: "info",
        live: false,
    },
    withdrawn: {
        label: "Withdrawn",
        icon: CircleSlash,
        tone: "error",
        chartTone: "error",
        live: false,
    },
};

export const WATCH_BAND_KEYS = ["watching", "warm", "cold"] as const;

export type WatchBand = (typeof WATCH_BAND_KEYS)[number];

export interface WatchBandMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    ceiling: number;
}

export const WATCH_BANDS: Record<WatchBand, WatchBandMeta> = {
    watching: {
        label: "Watching — seen this week",
        icon: Eye,
        tone: "success",
        ceiling: 7,
    },
    warm: {
        label: "Warm — seen this month",
        icon: Clock,
        tone: "warning",
        ceiling: 30,
    },
    cold: {
        label: "Cold — over a month unseen",
        icon: EyeOff,
        tone: "neutral",
        ceiling: Infinity,
    },
};

export const watchBandOf = (days: number): WatchBand =>
    WATCH_BAND_KEYS.find((id) => days < WATCH_BANDS[id].ceiling) ?? "cold";

export const watchTone = (days: number): ChartTone =>
    WATCH_BANDS[watchBandOf(days)].tone;
