import {
    Users,
    Home,
    ArrowLeftRight,
    Wallet,
    ShieldCheck,
    Flag,
    ClipboardCheck,
    Database,
    Server,
    HardDrive,
    BarChart3,
    type LucideIcon,
} from "lucide-react";
import type { ColumnSeries } from "@/components/ui/charts/column-chart";
import type { DotTone } from "@/components/patterns/status-dot";
import { PENDING_VERIFICATIONS } from "@/lib/config/admin-nav";
import type { QuickAction, StatItem } from "@/lib/types";

export type QueueTone = "warning" | "error";
export type AlertTone = "info" | "error" | "warning";
export type SystemState = "operational" | "degraded";

export interface ModerationQueueItem {
    label: string;
    value: number;
    href: string;
    tone: QueueTone;
    icon: LucideIcon;
}

export interface SystemAlert {
    id: number;
    title: string;
    description: string;
    time: string;
    tone: AlertTone;
}

export interface SystemHealth {
    label: string;
    icon: LucideIcon;
    uptime: string;
    errorRate: string;
    state: SystemState;
}

export interface RevenueMetric {
    label: string;
    value: string;
}

export interface RevenueBreakdown {
    headline: RevenueMetric;
    metrics: RevenueMetric[];
}

export const volumeMetrics: StatItem[] = [
    {
        label: "Total Users",
        value: "1,247",
        icon: Users,
        href: "/admin/users",
        change: "+6.2%",
        trend: "up",
        caption: "1,102 active this month",
        series: [980, 1015, 1060, 1108, 1174, 1247],
    },
    {
        label: "Active Listings",
        value: 342,
        icon: Home,
        href: "/admin/listings",
        change: "+18%",
        trend: "up",
        caption: "12 awaiting review",
        series: [242, 258, 279, 298, 320, 342],
    },
    {
        label: "Transactions (30d)",
        value: 128,
        icon: ArrowLeftRight,
        href: "/admin/transactions",
        change: "+9.4%",
        trend: "up",
        caption: "41 in escrow",
        series: [92, 101, 96, 112, 117, 128],
    },
    {
        label: "GMV (30d)",
        value: "$312M",
        icon: Wallet,
        href: "/admin/reports",
        change: "+22%",
        trend: "up",
        caption: "$7.8M commissions",
        series: [214, 231, 248, 267, 289, 312],
        featured: true,
    },
];

export const revenueMonths: Record<string, string | number>[] = [
    { month: "Feb", gmv: 231_000_000 },
    { month: "Mar", gmv: 248_000_000 },
    { month: "Apr", gmv: 267_000_000 },
    { month: "May", gmv: 289_000_000 },
    { month: "Jun", gmv: 304_000_000 },
    { month: "Jul", gmv: 312_000_000 },
];

export const revenueSeries: ColumnSeries[] = [
    { key: "gmv", name: "Gross merchandise value", tone: "accent" },
];

export const revenueBreakdown: RevenueBreakdown = {
    headline: { label: "Commissions (YTD)", value: "$21.2M" },
    metrics: [
        { label: "GMV (YTD)", value: "$847M" },
        { label: "Platform take rate", value: "2.50%" },
        { label: "Avg commission per deal", value: "$61.8K" },
    ],
};

export const moderationQueue: ModerationQueueItem[] = [
    {
        label: "Pending verifications",
        value: PENDING_VERIFICATIONS,
        href: "/admin/verifications",
        tone: "warning",
        icon: ShieldCheck,
    },
    {
        label: "Listings awaiting review",
        value: 12,
        href: "/admin/listings",
        tone: "warning",
        icon: ClipboardCheck,
    },
    {
        label: "Flagged content",
        value: 3,
        href: "/admin/listings",
        tone: "error",
        icon: Flag,
    },
];

export const alerts: SystemAlert[] = [
    {
        id: 1,
        title: "High-Value Agent Verification",
        description:
            "Robert Chen (Agent) requesting Platinum tier verification",
        time: "1 hour ago",
        tone: "info",
    },
    {
        id: 2,
        title: "Inappropriate Listing Image",
        description: "Listing #4521 flagged for explicit content",
        time: "2 hours ago",
        tone: "error",
    },
    {
        id: 3,
        title: "Large Transaction Alert",
        description: "$8.5M transaction pending escrow confirmation",
        time: "4 hours ago",
        tone: "warning",
    },
];

export const quickActions: QuickAction[] = [
    {
        label: "Manage Users",
        href: "/admin/users",
        icon: Users,
        description: "Members & roles",
    },
    {
        label: "Review Listings",
        href: "/admin/listings",
        icon: Home,
        description: "Moderate listings",
    },
    {
        label: "Process Verifications",
        href: "/admin/verifications",
        icon: ShieldCheck,
        description: `${PENDING_VERIFICATIONS} pending`,
    },
    {
        label: "View Reports",
        href: "/admin/reports",
        icon: BarChart3,
        description: "Platform analytics",
    },
];

export const OVERALL_UPTIME = "99.92%";
export const OVERALL_ERROR_RATE = "0.09%";

export const systems: SystemHealth[] = [
    {
        label: "Database",
        icon: Database,
        uptime: "99.99%",
        errorRate: "0.01%",
        state: "operational",
    },
    {
        label: "API Gateway",
        icon: Server,
        uptime: "99.96%",
        errorRate: "0.04%",
        state: "operational",
    },
    {
        label: "File Storage",
        icon: HardDrive,
        uptime: "99.82%",
        errorRate: "0.21%",
        state: "degraded",
    },
];

export const systemState: Record<
    SystemState,
    { label: string; tone: DotTone; text: string }
> = {
    operational: {
        label: "Operational",
        tone: "success",
        text: "text-success",
    },
    degraded: { label: "Degraded", tone: "warning", text: "text-warning" },
};
