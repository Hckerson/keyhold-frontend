import {
    BarChart3,
    Home,
    Users,
    TrendingUp,
    UserPlus,
    CalendarPlus,
    type LucideIcon,
} from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SummaryRow } from "@/components/ui/summary-row";
import {
    ActivityFeed,
    type ActivityEntry,
} from "@/components/dashboard/activity-feed";
import {
    QuickActions,
    type QuickAction,
} from "@/components/dashboard/quick-actions";

type StatItem = {
    label: string;
    value: string | number;
    icon: LucideIcon;
    href: string;
    change?: string;
    trend?: "up" | "down";
    caption?: string;
};

const stats: StatItem[] = [
    {
        label: "Total Pipeline",
        value: "$34.45M",
        icon: BarChart3,
        href: "/agent/pipeline",
        caption: "25 active deals",
    },
    {
        label: "Active Listings",
        value: 14,
        icon: Home,
        href: "/agent/listings",
        change: "+8",
        trend: "up",
        caption: "new this month",
    },
    {
        label: "Active Leads",
        value: 12,
        icon: Users,
        href: "/agent/leads",
        caption: "3 hot prospects",
    },
    {
        label: "Closed This Year",
        value: "$42.3M",
        icon: TrendingUp,
        href: "/agent/analytics",
        change: "+12%",
        trend: "up",
        caption: "vs last year",
    },
];

const pipelineStages = [
    { name: "Leads", count: 12, value: 0 },
    { name: "Showing", count: 8, value: 18400000 },
    { name: "Under Offer", count: 3, value: 9850000 },
    { name: "Closing", count: 2, value: 6200000 },
];

const recentActivity: ActivityEntry[] = [
    {
        id: 1,
        type: "offer",
        title: "Offer Received",
        description: "$3.1M offer on 456 Oak Avenue",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "showing",
        title: "Property Showed",
        description: "789 Sunset Blvd shown to client",
        time: "5 hours ago",
    },
    {
        id: 3,
        type: "listing",
        title: "New Listing Posted",
        description: "234 Oak Street listed at $4.5M",
        time: "1 day ago",
    },
];

const quickActions: QuickAction[] = [
    {
        label: "List Property",
        href: "/agent/listings",
        icon: Home,
        description: "Post a new listing",
    },
    {
        label: "Add Lead",
        href: "/agent/leads",
        icon: UserPlus,
        description: "Capture a prospect",
    },
    {
        label: "Schedule Showing",
        href: "/agent/calendar",
        icon: CalendarPlus,
        description: "Book an appointment",
    },
];

export default function AgentDashboardPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Welcome back, Sarah"
                description="Your sales pipeline and performance overview"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    <Panel
                        title="Sales Pipeline"
                        description="Current deals by stage"
                    >
                        <div className="space-y-4">
                            {pipelineStages.map((stage) => (
                                <div key={stage.name}>
                                    <div className="mb-1.5 flex items-center justify-between gap-3">
                                        <span className="text-text text-sm font-medium">
                                            {stage.name}
                                        </span>
                                        <span className="text-text-secondary text-xs tabular-nums">
                                            {stage.count} deals
                                            {stage.value > 0 &&
                                                ` · $${(stage.value / 1_000_000).toFixed(1)}M`}
                                        </span>
                                    </div>
                                    <ProgressBar
                                        value={Math.min(
                                            (stage.count / 12) * 100,
                                            100,
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    </Panel>

                    <Panel
                        title="Recent Activity"
                        count={recentActivity.length}
                    >
                        <ActivityFeed entries={recentActivity} />
                    </Panel>
                </div>

                <div className="space-y-4">
                    <Panel title="Quick Actions">
                        <QuickActions actions={quickActions} />
                    </Panel>

                    <Panel title="This Month">
                        <div className="space-y-3">
                            <SummaryRow label="Showings" value="24" />
                            <SummaryRow label="Offers Received" value="8" />
                            <SummaryRow label="Closed Deals" value="2" />
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    );
}
