import Link from "next/link";
import {
    BarChart3,
    Home,
    Users,
    TrendingUp,
    FileSignature,
    UserPlus,
    CalendarPlus,
    type LucideIcon,
} from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SummaryRow } from "@/components/ui/summary-row";
import { buttonVariants } from "@/components/ui/button";
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
    featured?: boolean;
};

const stats: StatItem[] = [
    {
        label: "Total Pipeline",
        value: "$34.45M",
        icon: BarChart3,
        href: "/agent/pipeline",
        caption: "25 active deals",
        featured: true,
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
        label: "Open Offers",
        value: 8,
        icon: FileSignature,
        href: "/agent/pipeline",
        change: "+3",
        trend: "up",
        caption: "awaiting response",
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
    { name: "Offers", count: 8, value: 18400000 },
    { name: "Pending", count: 3, value: 9850000 },
    { name: "Closed", count: 2, value: 6200000 },
];

type TopPerformer = {
    id: string;
    address: string;
    price: number;
    closedOn: string;
    overAsk: string;
    days: number;
};

const topPerformers: TopPerformer[] = [
    {
        id: "1",
        address: "890 Beverly Grove",
        price: 3450000,
        closedOn: "Jul 09",
        overAsk: "+4.2% over ask",
        days: 18,
    },
    {
        id: "2",
        address: "1420 Mulholland Drive",
        price: 5900000,
        closedOn: "Jun 28",
        overAsk: "+2.8% over ask",
        days: 24,
    },
    {
        id: "3",
        address: "58 Coldwater Canyon",
        price: 2780000,
        closedOn: "Jun 14",
        overAsk: "At ask",
        days: 31,
    },
];

type UpcomingShowing = {
    id: string;
    address: string;
    client: string;
    when: string;
};

const upcomingShowings: UpcomingShowing[] = [
    {
        id: "1",
        address: "456 Oak Avenue",
        client: "John Doe",
        when: "Today · 2:00 PM",
    },
    {
        id: "2",
        address: "12 Canyon Ridge",
        client: "Priya Raman",
        when: "Tomorrow · 11:00 AM",
    },
    {
        id: "3",
        address: "234 Oak Street",
        client: "Michael Chen",
        when: "Fri · 9:30 AM",
    },
];

type RecentLead = {
    id: string;
    name: string;
    budget: string;
    score: "Hot" | "Warm" | "Cold";
    variant: "accent" | "warning" | "default";
    received: string;
};

const recentLeads: RecentLead[] = [
    {
        id: "1",
        name: "Robert Lang",
        budget: "$6.20M",
        score: "Hot",
        variant: "accent",
        received: "20 min ago",
    },
    {
        id: "2",
        name: "Michael Johnson",
        budget: "$5.00M",
        score: "Hot",
        variant: "accent",
        received: "2 hours ago",
    },
    {
        id: "3",
        name: "Patricia Brown",
        budget: "$3.50M",
        score: "Warm",
        variant: "warning",
        received: "1 day ago",
    },
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

function PanelLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
            {label}
        </Link>
    );
}

export default function AgentDashboardPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Welcome back, Sarah"
                description="Your sales pipeline and performance overview"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    <Panel
                        title="Sales Pipeline"
                        description="Current deals by stage"
                        action={
                            <PanelLink
                                href="/agent/pipeline"
                                label="Open CRM"
                            />
                        }
                    >
                        <div className="space-y-3">
                            {pipelineStages.map((stage) => (
                                <div key={stage.name}>
                                    <div className="mb-1.5 flex items-center justify-between gap-3">
                                        <span className="text-text text-xs font-medium">
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
                        title="Top Performers"
                        description="Recent closed sales and comps"
                        action={
                            <PanelLink
                                href="/agent/analytics"
                                label="View comps"
                            />
                        }
                    >
                        <div className="divide-border divide-y">
                            {topPerformers.map((sale) => (
                                <div
                                    key={sale.id}
                                    className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
                                >
                                    <div className="min-w-0">
                                        <p className="text-text truncate text-xs font-medium">
                                            {sale.address}
                                        </p>
                                        <p className="text-text-muted mt-0.5 text-xs tabular-nums">
                                            Closed {sale.closedOn} · {sale.days}{" "}
                                            days on market
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-text text-xs font-medium tabular-nums">
                                            $
                                            {(sale.price / 1_000_000).toFixed(
                                                2,
                                            )}
                                            M
                                        </p>
                                        <p className="text-success mt-0.5 text-xs">
                                            {sale.overAsk}
                                        </p>
                                    </div>
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

                    <Panel
                        title="Upcoming Showings"
                        count={upcomingShowings.length}
                        action={
                            <PanelLink
                                href="/agent/calendar"
                                label="Calendar"
                            />
                        }
                    >
                        <div className="divide-border divide-y">
                            {upcomingShowings.map((showing) => (
                                <div
                                    key={showing.id}
                                    className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
                                >
                                    <div className="min-w-0">
                                        <p className="text-text truncate text-xs font-medium">
                                            {showing.address}
                                        </p>
                                        <p className="text-text-muted mt-0.5 truncate text-xs">
                                            {showing.client}
                                        </p>
                                    </div>
                                    <span className="text-text-secondary shrink-0 text-xs tabular-nums">
                                        {showing.when}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    <Panel
                        title="Recent Leads"
                        count={recentLeads.length}
                        action={
                            <PanelLink href="/agent/leads" label="All leads" />
                        }
                    >
                        <div className="divide-border divide-y">
                            {recentLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
                                >
                                    <div className="min-w-0">
                                        <p className="text-text truncate text-xs font-medium">
                                            {lead.name}
                                        </p>
                                        <p className="text-text-muted mt-0.5 text-xs tabular-nums">
                                            {lead.budget} · {lead.received}
                                        </p>
                                    </div>
                                    <Badge size="sm" variant={lead.variant}>
                                        {lead.score}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    <Panel title="This Month">
                        <div className="space-y-3">
                            <SummaryRow label="Showings" value="24" />
                            <SummaryRow label="New Listings" value="8" />
                            <SummaryRow label="Closed Deals" value="2" />
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    );
}
