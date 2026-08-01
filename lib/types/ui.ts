import type { LucideIcon } from "lucide-react";

export type Trend = "up" | "down";

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
