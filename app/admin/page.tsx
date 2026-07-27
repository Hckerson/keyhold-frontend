import Link from "next/link";
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
    ChevronRight,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { SummaryRow } from "@/components/ui/summary-row";
import { ColumnChart, type ColumnSeries } from "@/components/ui/column-chart";
import {
    QuickActions,
    type QuickAction,
} from "@/components/dashboard/quick-actions";
import { PENDING_VERIFICATIONS } from "@/lib/config/admin-nav";
import { cn } from "@/lib/utils";

type Trend = "up" | "down";

const volumeMetrics: {
    label: string;
    value: string | number;
    icon: LucideIcon;
    href: string;
    change: string;
    trend: Trend;
    caption: string;
    series: number[];
    featured?: boolean;
}[] = [
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

const revenueMonths: Record<string, string | number>[] = [
    { month: "Feb", gmv: 231_000_000 },
    { month: "Mar", gmv: 248_000_000 },
    { month: "Apr", gmv: 267_000_000 },
    { month: "May", gmv: 289_000_000 },
    { month: "Jun", gmv: 304_000_000 },
    { month: "Jul", gmv: 312_000_000 },
];

const revenueSeries: ColumnSeries[] = [
    { key: "gmv", name: "Gross merchandise value", tone: "accent" },
];

const revenueSummary: { label: string; value: string }[] = [
    { label: "GMV (YTD)", value: "$847M" },
    { label: "Commissions (YTD)", value: "$21.2M" },
    { label: "Platform take rate", value: "2.50%" },
    { label: "Avg commission per deal", value: "$61.8K" },
];

type QueueTone = "warning" | "error";

const moderationQueue: {
    label: string;
    value: number;
    href: string;
    tone: QueueTone;
    icon: LucideIcon;
}[] = [
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

type AlertTone = "info" | "error" | "warning";

const alerts: {
    id: number;
    title: string;
    description: string;
    time: string;
    tone: AlertTone;
}[] = [
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

const dotTone: Record<AlertTone, string> = {
    info: "bg-info",
    error: "bg-error",
    warning: "bg-warning",
};

const quickActions: QuickAction[] = [
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

type SystemState = "operational" | "degraded";

const OVERALL_UPTIME = "99.92%";
const OVERALL_ERROR_RATE = "0.09%";

const systems: {
    label: string;
    icon: LucideIcon;
    uptime: string;
    errorRate: string;
    state: SystemState;
}[] = [
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

const systemState: Record<
    SystemState,
    { label: string; dot: string; text: string }
> = {
    operational: {
        label: "Operational",
        dot: "bg-success",
        text: "text-success",
    },
    degraded: { label: "Degraded", dot: "bg-warning", text: "text-warning" },
};

const microLabel = "font-mono text-[10px] uppercase tracking-wide";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-4">
            <PageHeader
                title="Admin Dashboard"
                description="System health, volume, revenue, and content moderation"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {volumeMetrics.map((metric) => (
                    <StatCard
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        icon={metric.icon}
                        href={metric.href}
                        change={metric.change}
                        trend={metric.trend}
                        caption={metric.caption}
                        series={metric.series}
                        featured={metric.featured}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <Panel
                    title="Revenue"
                    description="Gross merchandise value and platform commissions"
                    className="lg:col-span-2"
                    action={
                        <Link href="/admin/payments">
                            <Button variant="secondary" size="sm">
                                Payments
                            </Button>
                        </Link>
                    }
                >
                    <ColumnChart
                        data={revenueMonths}
                        xKey="month"
                        series={revenueSeries}
                        divideBy={1_000_000}
                        valuePrefix="$"
                        valueSuffix="M"
                        height={220}
                    />
                </Panel>

                <Panel title="Revenue Breakdown">
                    <div className="divide-border-light flex flex-col divide-y">
                        {revenueSummary.map((item) => (
                            <SummaryRow
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                className="py-2.5 first:pt-0 last:pb-0"
                            />
                        ))}
                    </div>
                </Panel>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <Panel
                    title="System Alerts"
                    description="Recent notifications requiring attention"
                    count={alerts.length}
                    className="lg:col-span-2"
                >
                    <ul className="divide-border-light divide-y">
                        {alerts.map((alert) => (
                            <li
                                key={alert.id}
                                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                            >
                                <span
                                    className={cn(
                                        "mt-1.5 size-2 shrink-0 rounded-full",
                                        dotTone[alert.tone],
                                    )}
                                />
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-text text-xs font-medium">
                                        {alert.title}
                                    </h4>
                                    <p className="text-text-secondary mt-0.5 text-xs">
                                        {alert.description}
                                    </p>
                                    <p className="text-text-muted mt-1 text-xs">
                                        {alert.time}
                                    </p>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="shrink-0"
                                >
                                    Review
                                </Button>
                            </li>
                        ))}
                    </ul>
                </Panel>

                <div className="space-y-3">
                    <Panel title="Moderation Queue">
                        <ul className="divide-border-light divide-y">
                            {moderationQueue.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="hover:bg-background-alt ease-smooth -mx-2 flex items-center gap-2 rounded-lg px-2 py-2.5 transition-colors"
                                    >
                                        <item.icon
                                            size={12}
                                            strokeWidth={1.5}
                                            className="text-text-muted shrink-0"
                                        />
                                        <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                                            {item.label}
                                        </span>
                                        <StatusBadge tone={item.tone}>
                                            {item.value}
                                        </StatusBadge>
                                        <ChevronRight
                                            size={12}
                                            strokeWidth={1.5}
                                            className="text-text-muted shrink-0"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Panel>

                    <Panel title="Quick Actions">
                        <QuickActions actions={quickActions} />
                    </Panel>

                    <Panel
                        title="System Health"
                        description={`Uptime ${OVERALL_UPTIME} · Error rate ${OVERALL_ERROR_RATE} (24h)`}
                    >
                        <ul className="divide-border-light divide-y">
                            {systems.map((system) => (
                                <li
                                    key={system.label}
                                    className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                                >
                                    <div className="flex min-w-0 items-start gap-2">
                                        <system.icon
                                            size={12}
                                            strokeWidth={1.5}
                                            className="text-text-muted mt-0.5 shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <p className="text-text truncate text-xs">
                                                {system.label}
                                            </p>
                                            <p
                                                className={cn(
                                                    "text-text-muted mt-0.5 tabular-nums",
                                                    microLabel,
                                                )}
                                            >
                                                Uptime {system.uptime} · Err{" "}
                                                {system.errorRate}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="flex shrink-0 items-center gap-1.5">
                                        <span
                                            className={cn(
                                                "size-1.5 rounded-full",
                                                systemState[system.state].dot,
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "text-xs",
                                                systemState[system.state].text,
                                            )}
                                        >
                                            {systemState[system.state].label}
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Panel>
                </div>
            </div>
        </div>
    );
}
