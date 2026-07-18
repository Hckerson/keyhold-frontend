import Link from "next/link";
import {
    Search,
    Heart,
    FileText,
    CalendarDays,
    MessageSquare,
    CalendarClock,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { SummaryRow } from "@/components/ui/summary-row";
import {
    ActivityFeed,
    type ActivityEntry,
} from "@/components/dashboard/activity-feed";
import {
    QuickActions,
    type QuickAction,
} from "@/components/dashboard/quick-actions";

const stats = [
    {
        label: "Saved Listings",
        value: 8,
        icon: Heart,
        href: "/dashboard/saved",
    },
    {
        label: "Active Offers",
        value: 2,
        icon: FileText,
        href: "/dashboard/offers",
    },
    {
        label: "Scheduled Viewings",
        value: 3,
        icon: CalendarDays,
        href: "/dashboard/viewings",
    },
    {
        label: "New Messages",
        value: 1,
        icon: MessageSquare,
        href: "/dashboard/messages",
    },
];

const recentActivity: ActivityEntry[] = [
    {
        id: 1,
        type: "viewing",
        title: "Viewing Scheduled",
        description:
            "Your viewing for 456 Oak Avenue has been confirmed for today at 3:00 PM",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "offer",
        title: "Offer Accepted",
        description:
            "Your offer of $2.95M for 789 Sunset Blvd has been accepted",
        time: "5 hours ago",
    },
    {
        id: 3,
        type: "message",
        title: "New Message",
        description:
            "Your concierge agent has sent you a message about 234 Oak Street",
        time: "1 day ago",
    },
];

const quickActions: QuickAction[] = [
    {
        label: "Browse Properties",
        href: "/search",
        icon: Search,
        description: "Explore the latest listings",
    },
    {
        label: "View Saved",
        href: "/dashboard/saved",
        icon: Heart,
        description: "8 bookmarked",
    },
    {
        label: "Your Offers",
        href: "/dashboard/offers",
        icon: FileText,
        description: "2 active",
    },
    {
        label: "Schedule a Viewing",
        href: "/dashboard/viewings",
        icon: CalendarDays,
        description: "3 upcoming",
    },
];

const priceAlerts: {
    id: number;
    address: string;
    note: string;
    tone: "success" | "muted";
}[] = [
    { id: 1, address: "456 Oak Avenue", note: "↓ $150K", tone: "success" },
    { id: 2, address: "678 Elm Street", note: "New match", tone: "muted" },
    { id: 3, address: "234 Oak Street", note: "Under offer", tone: "muted" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="Welcome back, John"
                description="Here's what's happening with your property journey"
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Browse Properties
                        </Button>
                    </Link>
                }
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        href={stat.href}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                    <section className="bg-background-muted border-border-light relative overflow-hidden rounded-xl border p-5 shadow-sm">
                        <span
                            aria-hidden="true"
                            className="bg-accent absolute inset-y-0 left-0 w-0.75"
                        />
                        <div className="flex items-center gap-2">
                            <CalendarClock
                                size={16}
                                strokeWidth={1.5}
                                className="text-accent"
                            />
                            <span className="text-accent text-caption font-medium tracking-wide uppercase">
                                Upcoming Viewing · Today
                            </span>
                        </div>
                        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="text-text-secondary text-sm">
                                    456 Oak Avenue, Beverly Hills
                                </p>
                                <p className="text-h4 font-display text-text mt-1 font-light">
                                    $3.2M
                                </p>
                            </div>
                            <Button variant="primary" size="sm">
                                View Details
                            </Button>
                        </div>
                        <div className="border-border-light mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t pt-4">
                            <SummaryRow label="Time" value="3:00 PM" />
                            <SummaryRow label="Agent" value="Sarah Chen" />
                        </div>
                    </section>

                    <Panel title="Recent Activity">
                        <ActivityFeed entries={recentActivity} />
                    </Panel>
                </div>

                <div className="space-y-3">
                    <Panel title="Quick Actions">
                        <QuickActions actions={quickActions} />
                    </Panel>

                    <Panel
                        title="Price Alerts"
                        action={
                            <Link
                                href="/dashboard/alerts"
                                className="text-accent hover:text-accent-dark ease-smooth inline-flex items-center gap-1 text-sm font-medium transition-colors"
                            >
                                View all
                                <ChevronRight size={14} strokeWidth={2} />
                            </Link>
                        }
                    >
                        <ul className="flex flex-col gap-3">
                            {priceAlerts.map((alert) => (
                                <li
                                    key={alert.id}
                                    className="flex items-center justify-between gap-3"
                                >
                                    <span className="text-text truncate text-sm">
                                        {alert.address}
                                    </span>
                                    <span
                                        className={
                                            alert.tone === "success"
                                                ? "text-success shrink-0 text-xs font-medium"
                                                : "text-text-muted shrink-0 text-xs"
                                        }
                                    >
                                        {alert.note}
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
