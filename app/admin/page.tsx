import {
    Users,
    Home,
    ShieldCheck,
    Flag,
    Database,
    Server,
    HardDrive,
    BarChart3,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
    QuickActions,
    type QuickAction,
} from "@/components/dashboard/quick-actions";
import { cn } from "@/lib/utils";

type MetricTone = "success" | "warning" | "error";

const metrics: {
    label: string;
    value: string | number;
    icon: LucideIcon;
    tone: MetricTone;
    status: string;
}[] = [
    {
        label: "Total Users",
        value: "1,247",
        icon: Users,
        tone: "success",
        status: "Healthy",
    },
    {
        label: "Active Listings",
        value: "342",
        icon: Home,
        tone: "success",
        status: "Healthy",
    },
    {
        label: "Pending Verifications",
        value: 18,
        icon: ShieldCheck,
        tone: "warning",
        status: "Attention",
    },
    {
        label: "Flagged Content",
        value: 3,
        icon: Flag,
        tone: "error",
        status: "Action needed",
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
        description: "7 pending",
    },
    {
        label: "View Reports",
        href: "/admin/reports",
        icon: BarChart3,
        description: "Platform analytics",
    },
];

const systems: { label: string; icon: LucideIcon }[] = [
    { label: "Database", icon: Database },
    { label: "API Gateway", icon: Server },
    { label: "File Storage", icon: HardDrive },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Admin Dashboard"
                description="System health, user management, and content moderation"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <StatCard
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        icon={metric.icon}
                        badge={
                            <StatusBadge tone={metric.tone}>
                                {metric.status}
                            </StatusBadge>
                        }
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
                                    <h4 className="text-text text-sm font-medium">
                                        {alert.title}
                                    </h4>
                                    <p className="text-text-secondary mt-0.5 text-sm">
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

                <div className="space-y-4">
                    <Panel title="Quick Actions">
                        <QuickActions actions={quickActions} />
                    </Panel>

                    <Panel title="System Status">
                        <ul className="flex flex-col gap-3">
                            {systems.map((system) => (
                                <li
                                    key={system.label}
                                    className="flex items-center justify-between gap-3"
                                >
                                    <div className="flex min-w-0 items-center gap-2">
                                        <system.icon
                                            size={16}
                                            strokeWidth={1.5}
                                            className="text-text-muted shrink-0"
                                        />
                                        <span className="text-text text-sm">
                                            {system.label}
                                        </span>
                                    </div>
                                    <span className="flex shrink-0 items-center gap-1.5">
                                        <span className="bg-success size-1.5 rounded-full" />
                                        <span className="text-text-secondary text-xs">
                                            Operational
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
