import type { LucideIcon } from "lucide-react";
import type { JourneyStationState } from "./journey";

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

export type BadgeTone = "neutral" | "success" | "warning" | "error" | "info";

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
    label: string;
    href: string;
    icon: LucideIcon;
    description?: string;
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
