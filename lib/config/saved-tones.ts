import {
    BadgeCheck,
    CircleSlash,
    Clock,
    Compass,
    Eye,
    EyeOff,
    Handshake,
    Sparkles,
    Store,
    Target,
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

export const MATCH_BAND_KEYS = ["strong", "close", "loose"] as const;

export type MatchBand = (typeof MATCH_BAND_KEYS)[number];

export interface MatchBandMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    floor: number;
}

export const MATCH_BANDS: Record<MatchBand, MatchBandMeta> = {
    strong: {
        label: "Strong — 85% and above",
        icon: Sparkles,
        tone: "success",
        floor: 85,
    },
    close: {
        label: "Close — 70% to 85%",
        icon: Target,
        tone: "accent",
        floor: 70,
    },
    loose: {
        label: "Loose — under 70%",
        icon: Compass,
        tone: "neutral",
        floor: 0,
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

export const matchBandOf = (score: number): MatchBand =>
    MATCH_BAND_KEYS.find((id) => score >= MATCH_BANDS[id].floor) ?? "loose";

export const matchTone = (score: number): ChartTone =>
    MATCH_BANDS[matchBandOf(score)].tone;

export const watchBandOf = (days: number): WatchBand =>
    WATCH_BAND_KEYS.find((id) => days < WATCH_BANDS[id].ceiling) ?? "cold";

export const watchTone = (days: number): ChartTone =>
    WATCH_BANDS[watchBandOf(days)].tone;
