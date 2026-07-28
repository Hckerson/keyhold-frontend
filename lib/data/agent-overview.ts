import {
    BarChart3,
    Home,
    Users,
    TrendingUp,
    FileSignature,
    UserPlus,
    CalendarPlus,
} from "lucide-react";
import type { ActivityEntry, QuickAction, StatItem } from "@/lib/types";

export interface PipelineStage {
    name: string;
    count: number;
    value: number;
}

export interface TopPerformer {
    id: string;
    address: string;
    price: number;
    closedOn: string;
    overAsk: string;
    days: number;
}

export interface UpcomingShowing {
    id: string;
    address: string;
    client: string;
    when: string;
}

export interface RecentLead {
    id: string;
    name: string;
    budget: string;
    score: "Hot" | "Warm" | "Cold";
    variant: "accent" | "warning" | "default";
    received: string;
}

export const PIPELINE_STAGE_CAPACITY = 12;

export const stats: StatItem[] = [
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

export const pipelineStages: PipelineStage[] = [
    { name: "Leads", count: 12, value: 0 },
    { name: "Offers", count: 8, value: 18400000 },
    { name: "Pending", count: 3, value: 9850000 },
    { name: "Closed", count: 2, value: 6200000 },
];

export const topPerformers: TopPerformer[] = [
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

export const upcomingShowings: UpcomingShowing[] = [
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

export const recentLeads: RecentLead[] = [
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

export const recentActivity: ActivityEntry[] = [
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

export const quickActions: QuickAction[] = [
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

export const monthlySummary = [
    { label: "Showings", value: "24" },
    { label: "New Listings", value: "8" },
    { label: "Closed Deals", value: "2" },
];
