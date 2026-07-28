import Link from "next/link";
import {
    Search,
    Heart,
    FileText,
    CalendarDays,
    MessageSquare,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import {
    ActivityFeed,
    type ActivityEntry,
} from "@/components/dashboard/activity-feed";
import {
    QuickActions,
    type QuickAction,
} from "@/components/dashboard/quick-actions";
import { UpcomingViewings } from "@/components/dashboard/upcoming-viewings";
import type { Viewing } from "@/components/dashboard/viewing-row";

type StatItem = {
    label: string;
    value: number;
    icon: LucideIcon;
    href: string;
    change: string;
    trend: "up" | "down";
    series: number[];
};

const stats: StatItem[] = [
    {
        label: "Saved Listings",
        value: 8,
        icon: Heart,
        href: "/dashboard/saved",
        change: "+2",
        trend: "up",
        series: [3, 4, 4, 5, 6, 6, 8],
    },
    {
        label: "Active Offers",
        value: 2,
        icon: FileText,
        href: "/dashboard/offers",
        change: "+1",
        trend: "up",
        series: [0, 1, 1, 1, 1, 2, 2],
    },
    {
        label: "Scheduled Viewings",
        value: 3,
        icon: CalendarDays,
        href: "/dashboard/viewings",
        change: "+1",
        trend: "up",
        series: [1, 2, 2, 3, 2, 3, 3],
    },
    {
        label: "New Messages",
        value: 1,
        icon: MessageSquare,
        href: "/dashboard/messages",
        change: "+1",
        trend: "up",
        series: [0, 1, 0, 1, 0, 0, 1],
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
    {
        id: 4,
        type: "listing",
        title: "Price Drop",
        description:
            "456 Oak Avenue dropped $150,000 since you saved it last week",
        time: "2 days ago",
    },
    {
        id: 5,
        type: "showing",
        title: "Listing Viewed",
        description:
            "You viewed 567 Palm Drive, Malibu for the third time this month",
        time: "3 days ago",
    },
];

const upcomingViewings: Viewing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        date: "2026-07-28",
        time: "3:00 PM",
        agent: "Sarah Chen",
        agentPhone: "(310) 555-0123",
        status: "confirmed",
    },
    {
        id: "2",
        address: "234 Oak Street, Bel Air, CA",
        date: "2026-07-30",
        time: "10:00 AM",
        agent: "Michael Rodriguez",
        agentPhone: "(310) 555-0456",
        status: "confirmed",
    },
    {
        id: "3",
        address: "567 Palm Drive, Malibu, CA",
        date: "2026-08-03",
        time: "2:00 PM",
        agent: "Jennifer Martinez",
        agentPhone: "(310) 555-0789",
        status: "pending",
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
    {
        label: "Messages",
        href: "/dashboard/messages",
        icon: MessageSquare,
        description: "1 unread",
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

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                    <Panel
                        title="Upcoming Viewings"
                        count={upcomingViewings.length}
                        action={
                            <Link
                                href="/dashboard/viewings"
                                className="text-accent hover:text-accent-dark ease-smooth inline-flex items-center gap-1 text-xs font-medium transition-colors"
                            >
                                View all
                                <ChevronRight size={12} strokeWidth={1.5} />
                            </Link>
                        }
                    >
                        <UpcomingViewings initialViewings={upcomingViewings} />
                    </Panel>

                    <Panel
                        title="Recent Activity"
                        count={recentActivity.length}
                    >
                        <ActivityFeed entries={recentActivity} />
                    </Panel>
                </div>

                <div className="space-y-3">
                    <Panel title="Quick Links">
                        <QuickActions actions={quickActions} />
                    </Panel>

                    <Panel
                        title="New Alerts"
                        count={priceAlerts.length}
                        action={
                            <Link
                                href="/dashboard/alerts"
                                className="text-accent hover:text-accent-dark ease-smooth inline-flex items-center gap-1 text-xs font-medium transition-colors"
                            >
                                View all
                                <ChevronRight size={12} strokeWidth={1.5} />
                            </Link>
                        }
                    >
                        <ul className="flex flex-col gap-2">
                            {priceAlerts.map((alert) => (
                                <li
                                    key={alert.id}
                                    className="flex items-center justify-between gap-3"
                                >
                                    <span className="text-text truncate text-xs">
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
