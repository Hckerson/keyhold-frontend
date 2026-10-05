import type { LucideIcon } from "lucide-react";
import type { JourneyStationState } from "./journey";
import type { ChartTone } from "@/lib/config/chart-tones";

export type Trend = "up" | "down";

export interface NavRoute {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: number;
}

export interface SidebarNavItem {
    label: string;
    icon: LucideIcon;
    href?: string;
    badge?: number | string;
    count?: number;
    state?: JourneyStationState;
}

export interface SidebarSection {
    label?: string;
    spine?: boolean;
    items: SidebarNavItem[];
}

export interface CommandItem {
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: number;
    here?: boolean;
    run: () => void;
}

export interface TrailCrumb {
    label: string;
    href: string;
    current: boolean;
}

export type StatusTone = "neutral" | "success" | "warning" | "error" | "info";

export interface StatItem {
    label: string;
    value: string | number;
    icon?: LucideIcon;
    change?: string;
    trend?: Trend;
    caption?: string;
    series?: number[];
    href?: string;
    featured?: boolean;
}

export interface MetricItem {
    label: string;
    value: string;
}

export interface QuickAction {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export type ActivityType =
    | "viewing"
    | "offer"
    | "message"
    | "showing"
    | "listing";

export interface ActivityEntry {
    id: string | number;
    type: ActivityType;
    title: string;
    description: string;
    time: string;
}

export interface PlatformGuarantee {
    id: string;
    icon: LucideIcon;
    label: string;
    statement: string;
    detail: string;
}

export interface TrustBadge {
    icon: LucideIcon;
    label: string;
    detail: string;
}

export interface FilterTileDatum<T extends string> {
    id: T;
    label: string;
    icon: LucideIcon;
    tone: ChartTone;
    count: number;
    percent: number;
}

export type SegmentOption<T extends string> = Pick<
    FilterTileDatum<T>,
    "id" | "label" | "count"
>;
