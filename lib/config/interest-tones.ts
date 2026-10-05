import {
    Ban,
    CalendarDays,
    CircleCheck,
    Clock,
    FileText,
    Handshake,
    MessageSquare,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { InterestStatus } from "@/lib/types/interest";
import type { StatusTone } from "@/lib/types";

export const INTEREST_STATUS_KEYS: InterestStatus[] = [
    "pending",
    "connected",
    "declined",
];

export interface InterestStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    chartTone: ChartTone;
    rank: number;
    open: boolean;
}

export const INTEREST_STATUSES: Record<InterestStatus, InterestStatusMeta> = {
    pending: {
        label: "Awaiting reply",
        icon: Clock,
        tone: "warning",
        chartTone: "warning",
        rank: 3,
        open: true,
    },
    connected: {
        label: "Introduced",
        icon: CircleCheck,
        tone: "success",
        chartTone: "success",
        rank: 2,
        open: true,
    },
    declined: {
        label: "Declined",
        icon: Ban,
        tone: "error",
        chartTone: "error",
        rank: 1,
        open: false,
    },
};

export const TRACTION_KEYS = [
    "bidding",
    "touring",
    "talking",
    "quiet",
] as const;

export type Traction = (typeof TRACTION_KEYS)[number];

export interface TractionMeta {
    label: string;
    short: string;
    icon: LucideIcon;
    tone: ChartTone;
    rank: number;
}

export const TRACTIONS: Record<Traction, TractionMeta> = {
    bidding: {
        label: "Offer on the table",
        short: "Bidding",
        icon: FileText,
        tone: "accent",
        rank: 4,
    },
    touring: {
        label: "Viewing arranged",
        short: "Touring",
        icon: CalendarDays,
        tone: "info",
        rank: 3,
    },
    talking: {
        label: "In conversation",
        short: "Talking",
        icon: MessageSquare,
        tone: "highlight",
        rank: 2,
    },
    quiet: {
        label: "No contact yet",
        short: "Quiet",
        icon: Handshake,
        tone: "neutral",
        rank: 1,
    },
};
