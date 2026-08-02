import {
    Search,
    Heart,
    FileText,
    CalendarDays,
    MessageSquare,
} from "lucide-react";
import type {
    ActivityEntry,
    QuickAction,
    StatItem,
    Viewing,
} from "@/lib/types";

export interface PriceAlert {
    id: number;
    address: string;
    note: string;
    tone: "success" | "muted";
}

export const stats: StatItem[] = [
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

export const recentActivity: ActivityEntry[] = [
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

export const upcomingViewings: Viewing[] = [
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

export const quickActions: QuickAction[] = [
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

export const priceAlerts: PriceAlert[] = [
    { id: 1, address: "456 Oak Avenue", note: "↓ $150K", tone: "success" },
    { id: 2, address: "678 Elm Street", note: "New match", tone: "muted" },
    { id: 3, address: "234 Oak Street", note: "Under offer", tone: "muted" },
];
