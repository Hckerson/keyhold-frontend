import {
    Ban,
    CircleCheck,
    Clock,
    Handshake,
    Scale,
    ScrollText,
    Undo2,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { DotTone } from "@/components/patterns/status-dot";
import type { OfferStatus } from "@/lib/types";

export const OFFER_STATUS_KEYS: OfferStatus[] = [
    "countered",
    "submitted",
    "accepted",
    "rejected",
    "withdrawn",
];

export interface OfferStatusMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
    open: boolean;
}

export const OFFER_STATUSES: Record<OfferStatus, OfferStatusMeta> = {
    countered: {
        label: "Countered",
        icon: Handshake,
        tone: "info",
        chartTone: "info",
        rank: 5,
        open: true,
    },
    submitted: {
        label: "Submitted",
        icon: ScrollText,
        tone: "warning",
        chartTone: "warning",
        rank: 4,
        open: true,
    },
    accepted: {
        label: "Accepted",
        icon: CircleCheck,
        tone: "success",
        chartTone: "success",
        rank: 3,
        open: false,
    },
    rejected: {
        label: "Rejected",
        icon: Ban,
        tone: "error",
        chartTone: "error",
        rank: 2,
        open: false,
    },
    withdrawn: {
        label: "Withdrawn",
        icon: Undo2,
        tone: "neutral",
        chartTone: "neutral",
        rank: 1,
        open: false,
    },
};

export const GAP_BAND_KEYS = ["at-ask", "close", "wide"] as const;

export type GapBand = (typeof GAP_BAND_KEYS)[number];

export interface GapBandMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    ceiling: number;
}

export const GAP_BANDS: Record<GapBand, GapBandMeta> = {
    "at-ask": {
        label: "At or above ask",
        icon: CircleCheck,
        tone: "success",
        ceiling: 1,
    },
    close: {
        label: "Within 5% of ask",
        icon: Scale,
        tone: "accent",
        ceiling: 5,
    },
    wide: {
        label: "More than 5% under",
        icon: Clock,
        tone: "warning",
        ceiling: Infinity,
    },
};

export const gapBandOf = (discountPercent: number): GapBand =>
    GAP_BAND_KEYS.find((id) => discountPercent < GAP_BANDS[id].ceiling) ??
    "wide";

export const gapTone = (discountPercent: number): ChartTone =>
    GAP_BANDS[gapBandOf(discountPercent)].tone;
