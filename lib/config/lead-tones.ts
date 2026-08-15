import {
    BadgeCheck,
    BookOpen,
    CircleSlash,
    DoorOpen,
    Footprints,
    Globe,
    Handshake,
    Mail,
    Megaphone,
    PhoneCall,
    Sparkles,
    Zap,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { DotTone } from "@/components/patterns/status-dot";

export const LEAD_STAGE_KEYS = [
    "new",
    "contacted",
    "qualified",
    "lost",
] as const;

export type LeadStage = (typeof LEAD_STAGE_KEYS)[number];

export interface LeadStageMeta {
    label: string;
    icon: LucideIcon;
    tone: DotTone;
    rank: number;
    next: { id: LeadStage; label: string };
}

export const LEAD_STAGES: Record<LeadStage, LeadStageMeta> = {
    new: {
        label: "New",
        icon: Sparkles,
        tone: "info",
        rank: 2,
        next: { id: "contacted", label: "Mark contacted" },
    },
    contacted: {
        label: "Contacted",
        icon: PhoneCall,
        tone: "warning",
        rank: 3,
        next: { id: "qualified", label: "Mark qualified" },
    },
    qualified: {
        label: "Qualified",
        icon: BadgeCheck,
        tone: "success",
        rank: 4,
        next: { id: "lost", label: "Mark lost" },
    },
    lost: {
        label: "Lost",
        icon: CircleSlash,
        tone: "neutral",
        rank: 1,
        next: { id: "new", label: "Reopen" },
    },
};

export const LEAD_SCORE_KEYS = ["hot", "warm", "cold"] as const;

export type LeadScore = (typeof LEAD_SCORE_KEYS)[number];

export interface LeadScoreMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    play: string;
    rank: number;
}

export const LEAD_SCORES: Record<LeadScore, LeadScoreMeta> = {
    hot: {
        label: "Hot",
        icon: Zap,
        tone: "highlight",
        play: "Call within 24 hours",
        rank: 3,
    },
    warm: {
        label: "Warm",
        icon: Mail,
        tone: "warning",
        play: "Monthly market report",
        rank: 2,
    },
    cold: {
        label: "Cold",
        icon: BookOpen,
        tone: "info",
        play: "Quarterly education drip",
        rank: 1,
    },
};

export const LEAD_SOURCE_KEYS = [
    "referral",
    "portal",
    "open-house",
    "campaign",
    "walk-in",
] as const;

export type LeadSource = (typeof LEAD_SOURCE_KEYS)[number];

export interface LeadSourceMeta {
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const LEAD_SOURCES: Record<LeadSource, LeadSourceMeta> = {
    referral: { label: "Referral", icon: Handshake, tone: "accent" },
    portal: { label: "Portal", icon: Globe, tone: "info" },
    "open-house": { label: "Open house", icon: DoorOpen, tone: "highlight" },
    campaign: { label: "Campaign", icon: Megaphone, tone: "warning" },
    "walk-in": { label: "Walk-in", icon: Footprints, tone: "neutral" },
};

const FIT_IDLE = 35;
const FIT_MODEST = 65;
const FIT_STRONG = 85;

export const fitTone = (percent: number): ChartTone => {
    if (percent < FIT_IDLE) return "neutral";
    if (percent < FIT_MODEST) return "warning";
    if (percent < FIT_STRONG) return "accent";
    return "success";
};
