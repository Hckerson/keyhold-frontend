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
    UserPlus,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { DotTone } from "@/components/patterns/status-dot";
import type { AlertChannel, AlertType } from "@/lib/types";

export const ALERT_TYPE_KEYS: AlertType[] = [
    "PRICE_DROP",
    "OFFER_RESPONSE",
    "NEW_LISTING",
    "MESSAGE_RECEIVED",
    "CONNECTION_REQUEST",
    "UNDER_OFFER",
    "VIEWING_CONFIRMATION",
    "STATUS_CHANGE",
];

export interface AlertTypeMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
}

export const ALERT_TYPES: Record<AlertType, AlertTypeMeta> = {
    PRICE_DROP: {
        label: "Price Drop",
        icon: TrendingDown,
        tone: "success",
        chartTone: "success",
        rank: 8,
    },
    OFFER_RESPONSE: {
        label: "Offer Reply",
        icon: FileText,
        tone: "info",
        chartTone: "info",
        rank: 7,
    },
    NEW_LISTING: {
        label: "New Match",
        icon: Sparkles,
        tone: "info",
        chartTone: "highlight",
        rank: 6,
    },
    MESSAGE_RECEIVED: {
        label: "Message",
        icon: MessageSquare,
        tone: "info",
        chartTone: "info",
        rank: 5,
    },
    CONNECTION_REQUEST: {
        label: "Enquiry",
        icon: UserPlus,
        tone: "info",
        chartTone: "accent",
        rank: 4,
    },
    UNDER_OFFER: {
        label: "Under Offer",
        icon: Handshake,
        tone: "warning",
        chartTone: "warning",
        rank: 3,
    },
    VIEWING_CONFIRMATION: {
        label: "Viewing",
        icon: CalendarCheck,
        tone: "success",
        chartTone: "accent",
        rank: 2,
    },
    STATUS_CHANGE: {
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
    short: string;
    icon: LucideIcon;
    chartTone: ChartTone;
}

export const ALERT_CHANNELS: Record<AlertChannel, AlertChannelMeta> = {
    email: { label: "Email", short: "Eml", icon: Mail, chartTone: "info" },
    sms: {
        label: "SMS",
        short: "Sms",
        icon: MessageSquare,
        chartTone: "warning",
    },
    inApp: { label: "In-app", short: "App", icon: Bell, chartTone: "accent" },
};

const DELIVERY_GRID_BASE = "grid items-center gap-x-2";

export const ALERT_DELIVERY_COLUMNS = {
    volume: "grid-cols-[1.5rem_minmax(0,1fr)_1.75rem_2.5rem_repeat(3,1.75rem)_1.75rem]",
    plain: "grid-cols-[1.5rem_minmax(0,1fr)_repeat(3,1.75rem)_1.75rem]",
} as const;

export type AlertDeliveryVariant = keyof typeof ALERT_DELIVERY_COLUMNS;

export const alertDeliveryGrid = (variant: AlertDeliveryVariant) =>
    `${DELIVERY_GRID_BASE} ${ALERT_DELIVERY_COLUMNS[variant]}`;

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
