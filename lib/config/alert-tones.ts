import {
    Activity,
    Bell,
    CalendarCheck,
    Clock,
    FileText,
    Handshake,
    History,
    Mail,
    MessageSquare,
    Radio,
    Sparkles,
    TrendingDown,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { DotTone } from "@/components/patterns/status-dot";
import type { AlertChannel, AlertType } from "@/lib/types";

export const ALERT_TYPE_KEYS: AlertType[] = [
    "price-drop",
    "offer-response",
    "new-listing",
    "under-offer",
    "viewing-confirmation",
    "status-change",
];

export interface AlertTypeMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
}

export const ALERT_TYPES: Record<AlertType, AlertTypeMeta> = {
    "price-drop": {
        label: "Price Drop",
        icon: TrendingDown,
        tone: "success",
        chartTone: "success",
        rank: 6,
    },
    "offer-response": {
        label: "Offer Reply",
        icon: FileText,
        tone: "info",
        chartTone: "info",
        rank: 5,
    },
    "new-listing": {
        label: "New Match",
        icon: Sparkles,
        tone: "info",
        chartTone: "highlight",
        rank: 4,
    },
    "under-offer": {
        label: "Under Offer",
        icon: Handshake,
        tone: "warning",
        chartTone: "warning",
        rank: 3,
    },
    "viewing-confirmation": {
        label: "Viewing",
        icon: CalendarCheck,
        tone: "success",
        chartTone: "accent",
        rank: 2,
    },
    "status-change": {
        label: "Status Move",
        icon: Activity,
        tone: "neutral",
        chartTone: "neutral",
        rank: 1,
    },
};

export const ALERT_CHANNEL_KEYS: AlertChannel[] = ["email", "sms", "inApp"];

export interface AlertChannelMeta {
    label: string;
    icon: LucideIcon;
    chartTone: ChartTone;
}

export const ALERT_CHANNELS: Record<AlertChannel, AlertChannelMeta> = {
    email: { label: "Email", icon: Mail, chartTone: "info" },
    sms: { label: "SMS", icon: MessageSquare, chartTone: "warning" },
    inApp: { label: "In-app", icon: Bell, chartTone: "accent" },
};

export const RECENCY_BAND_KEYS = ["live", "today", "earlier"] as const;

export type RecencyBand = (typeof RECENCY_BAND_KEYS)[number];

export interface RecencyBandMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    ceiling: number;
}

export const RECENCY_BANDS: Record<RecencyBand, RecencyBandMeta> = {
    live: {
        label: "Live — within the hour",
        icon: Radio,
        tone: "success",
        ceiling: 60,
    },
    today: {
        label: "Today — under 24 hours",
        icon: Clock,
        tone: "accent",
        ceiling: 1_440,
    },
    earlier: {
        label: "Earlier — over a day old",
        icon: History,
        tone: "neutral",
        ceiling: Infinity,
    },
};
