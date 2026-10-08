import {
    CalendarCheck,
    CalendarClock,
    CalendarRange,
    CalendarX,
    CheckCircle2,
    DoorOpen,
    History,
    Sunrise,
    Users,
    Video,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { StatusTone, ViewingMode, ViewingStatus } from "@/lib/types";

export const VIEWING_STATUS_KEYS: ViewingStatus[] = [
    "confirmed",
    "pending",
    "completed",
    "cancelled",
];

export interface ViewingStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    chartTone: ChartTone;
    active: boolean;
    scheduled: boolean;
    rank: number;
}

export const VIEWING_STATUSES: Record<ViewingStatus, ViewingStatusMeta> = {
    confirmed: {
        label: "Confirmed",
        icon: CalendarCheck,
        tone: "success",
        chartTone: "accent",
        active: true,
        scheduled: true,
        rank: 3,
    },
    pending: {
        label: "Pending",
        icon: CalendarClock,
        tone: "warning",
        chartTone: "neutral",
        active: true,
        scheduled: true,
        rank: 2,
    },
    completed: {
        label: "Completed",
        icon: CheckCircle2,
        tone: "info",
        chartTone: "neutral",
        active: false,
        scheduled: false,
        rank: 1,
    },
    cancelled: {
        label: "Cancelled",
        icon: CalendarX,
        tone: "neutral",
        chartTone: "neutral",
        active: false,
        scheduled: true,
        rank: 0,
    },
};

export const VIEWING_MODE_KEYS: ViewingMode[] = [
    "in-person",
    "virtual",
    "open-house",
];

export interface ViewingModeMeta {
    label: string;
    icon: LucideIcon;
    chartTone: ChartTone;
}

export const VIEWING_MODES: Record<ViewingMode, ViewingModeMeta> = {
    "in-person": { label: "In person", icon: DoorOpen, chartTone: "accent" },
    virtual: { label: "Virtual", icon: Video, chartTone: "neutral" },
    "open-house": { label: "Open house", icon: Users, chartTone: "neutral" },
};

export const TIMING_BAND_KEYS = ["past", "today", "soon", "later"] as const;

export type TimingBand = (typeof TIMING_BAND_KEYS)[number];

export interface TimingBandMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    ceiling: number;
}

export const TIMING_BANDS: Record<TimingBand, TimingBandMeta> = {
    past: {
        label: "Walked — already toured",
        icon: History,
        tone: "neutral",
        ceiling: 0,
    },
    today: {
        label: "Today — inside the day",
        icon: Sunrise,
        tone: "neutral",
        ceiling: 1,
    },
    soon: {
        label: "Soon — within three days",
        icon: CalendarClock,
        tone: "accent",
        ceiling: 4,
    },
    later: {
        label: "Later — beyond this week",
        icon: CalendarRange,
        tone: "neutral",
        ceiling: Infinity,
    },
};

export const timingBandOf = (days: number): TimingBand =>
    TIMING_BAND_KEYS.find((id) => days < TIMING_BANDS[id].ceiling) ?? "later";

export const timingTone = (days: number): ChartTone =>
    TIMING_BANDS[timingBandOf(days)].tone;
