import {
    BadgeCheck,
    CircleSlash,
    Flame,
    Snowflake,
    Sparkles,
    Thermometer,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { LeadStage, LeadTemperature } from "@/lib/types/lead";
import type { StatusTone } from "@/lib/types";

export const LEAD_STAGE_KEYS: LeadStage[] = ["pending", "accepted", "declined"];

export interface LeadStageMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
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

export interface LeadTemperatureMeta {
    label: string;
    icon: LucideIcon;
    tone: StatusTone;
    chartTone: ChartTone;
    floor: number;
}

export const LEAD_TEMPERATURE_KEYS: LeadTemperature[] = ["hot", "warm", "cold"];

export const LEAD_TEMPERATURES: Record<LeadTemperature, LeadTemperatureMeta> = {
    hot: {
        label: "Hot",
        icon: Flame,
        tone: "error",
        chartTone: "error",
        floor: 60,
    },
    warm: {
        label: "Warm",
        icon: Thermometer,
        tone: "warning",
        chartTone: "warning",
        floor: 30,
    },
    cold: {
        label: "Cold",
        icon: Snowflake,
        tone: "neutral",
        chartTone: "neutral",
        floor: 0,
    },
};
