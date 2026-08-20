import {
    BadgeCheck,
    CircleSlash,
    Sparkles,
    type LucideIcon,
} from "lucide-react";
import type { DotTone } from "@/components/patterns/status-dot";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { LeadStage } from "@/lib/types/lead";

export const LEAD_STAGE_KEYS: LeadStage[] = ["pending", "accepted", "declined"];

export interface LeadStageMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    chartTone: ChartTone;
    rank: number;
    nextAction: string;
}

export const LEAD_STAGES: Record<LeadStage, LeadStageMeta> = {
    pending: {
        label: "Awaiting reply",
        icon: Sparkles,
        tone: "info",
        chartTone: "info",
        rank: 3,
        nextAction: "Accept or decline the enquiry",
    },
    accepted: {
        label: "Accepted",
        icon: BadgeCheck,
        tone: "success",
        chartTone: "success",
        rank: 2,
        nextAction: "Arrange a viewing",
    },
    declined: {
        label: "Declined",
        icon: CircleSlash,
        tone: "neutral",
        chartTone: "neutral",
        rank: 1,
        nextAction: "No action outstanding",
    },
};
