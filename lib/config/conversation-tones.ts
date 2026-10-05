import {
    CalendarCheck,
    CheckCheck,
    Clock,
    File,
    FileImage,
    FileText,
    Hourglass,
    Reply,
    Timer,
    Zap,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { ConversationStatus, StatusTone } from "@/lib/types";

export const CONVERSATION_STATUS_KEYS: ConversationStatus[] = [
    "awaiting-you",
    "awaiting-agent",
    "scheduled",
    "closed",
];

export interface ConversationStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    chartTone: ChartTone;
    rank: number;
}

export const CONVERSATION_STATUSES: Record<
    ConversationStatus,
    ConversationStatusMeta
> = {
    "awaiting-you": {
        label: "Waiting on you",
        icon: Reply,
        tone: "warning",
        chartTone: "warning",
        rank: 4,
    },
    "awaiting-agent": {
        label: "Waiting on agent",
        icon: Timer,
        tone: "info",
        chartTone: "info",
        rank: 3,
    },
    scheduled: {
        label: "Viewing booked",
        icon: CalendarCheck,
        tone: "success",
        chartTone: "success",
        rank: 2,
    },
    closed: {
        label: "Closed",
        icon: CheckCheck,
        tone: "neutral",
        chartTone: "neutral",
        rank: 1,
    },
};

export const RESPONSE_BAND_KEYS = ["fast", "steady", "slow"] as const;

export type ResponseBand = (typeof RESPONSE_BAND_KEYS)[number];

export interface ResponseBandMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    ceiling: number;
}

export const RESPONSE_BANDS: Record<ResponseBand, ResponseBandMeta> = {
    fast: {
        label: "Fast — replies under 30 min",
        icon: Zap,
        tone: "success",
        ceiling: 30,
    },
    steady: {
        label: "Steady — under 3 hours",
        icon: Clock,
        tone: "accent",
        ceiling: 180,
    },
    slow: {
        label: "Slow — over 3 hours",
        icon: Hourglass,
        tone: "warning",
        ceiling: Infinity,
    },
};

export interface DocumentKindMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

const DOCUMENT_KINDS: { prefix: string; meta: DocumentKindMeta }[] = [
    {
        prefix: "image/",
        meta: { label: "Image", icon: FileImage, tone: "info" },
    },
    {
        prefix: "application/pdf",
        meta: { label: "PDF", icon: FileText, tone: "error" },
    },
];

const FALLBACK_DOCUMENT: DocumentKindMeta = {
    label: "File",
    icon: File,
    tone: "neutral",
};

export const documentKindOf = (mimeType: string): DocumentKindMeta =>
    DOCUMENT_KINDS.find((kind) => mimeType.startsWith(kind.prefix))?.meta ??
    FALLBACK_DOCUMENT;
