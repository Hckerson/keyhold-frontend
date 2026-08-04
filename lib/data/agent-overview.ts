import {
    Home,
    Users,
    TrendingUp,
    FileSignature,
    UserPlus,
    CalendarPlus,
    type LucideIcon,
} from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { ActivityEntry } from "@/lib/types";

export const DAYS_ON_MARKET_BENCHMARK = 60;
export const FAST_SALE_DAYS = 21;
export const SLOW_SALE_DAYS = 40;
export const GOAL_ON_TRACK_RATIO = 0.75;
export const GOAL_AT_RISK_RATIO = 0.4;

export interface PipelineSummary {
    label: string;
    value: number;
    dealCount: number;
    href: string;
}

export interface PipelineStage {
    id: string;
    name: string;
    count: number;
    value: number;
    tone: ChartTone;
}

export interface AgentStat {
    id: string;
    label: string;
    value: string;
    icon: LucideIcon;
    href: string;
    tone: ChartTone;
}

export interface ClosedSale {
    id: string;
    address: string;
    price: number;
    closedOn: string;
    overAskPct: number;
    days: number;
}

export type ShowingTiming = "today" | "tomorrow" | "later";

export interface UpcomingShowing {
    id: string;
    address: string;
    client: string;
    when: string;
    timing: ShowingTiming;
}

export type LeadScore = "Hot" | "Warm" | "Cold";

export interface RecentLead {
    id: string;
    name: string;
    budget: number;
    score: LeadScore;
    received: string;
}

export interface MonthlyGoal {
    id: string;
    label: string;
    value: number;
    target: number;
}

export interface AgentQuickAction {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export const pipelineSummary: PipelineSummary = {
    label: "Total pipeline",
    value: 34_450_000,
    dealCount: 25,
    href: "/agent/pipeline",
};

export const pipelineStages: PipelineStage[] = [
    { id: "leads", name: "Leads", count: 12, value: 0, tone: "neutral" },
    { id: "offers", name: "Offers", count: 8, value: 18_400_000, tone: "info" },
    {
        id: "pending",
        name: "Pending",
        count: 3,
        value: 9_850_000,
        tone: "warning",
    },
    {
        id: "closed",
        name: "Closed",
        count: 2,
        value: 6_200_000,
        tone: "success",
    },
];

export const stats: AgentStat[] = [
    {
        id: "listings",
        label: "Active listings",
        value: "14",
        icon: Home,
        href: "/agent/listings",
        tone: "accent",
    },
    {
        id: "leads",
        label: "Active leads",
        value: "12",
        icon: Users,
        href: "/agent/leads",
        tone: "info",
    },
    {
        id: "offers",
        label: "Open offers",
        value: "8",
        icon: FileSignature,
        href: "/agent/pipeline",
        tone: "warning",
    },
    {
        id: "closed",
        label: "Closed YTD",
        value: "$42.3M",
        icon: TrendingUp,
        href: "/agent/analytics",
        tone: "success",
    },
];

export const closedSales: ClosedSale[] = [
    {
        id: "1",
        address: "890 Beverly Grove",
        price: 3_450_000,
        closedOn: "Jul 09",
        overAskPct: 4.2,
        days: 18,
    },
    {
        id: "2",
        address: "1420 Mulholland Drive",
        price: 5_900_000,
        closedOn: "Jun 28",
        overAskPct: 2.8,
        days: 24,
    },
    {
        id: "3",
        address: "58 Coldwater Canyon",
        price: 2_780_000,
        closedOn: "Jun 14",
        overAskPct: 0,
        days: 31,
    },
];

export const upcomingShowings: UpcomingShowing[] = [
    {
        id: "1",
        address: "456 Oak Avenue",
        client: "John Doe",
        when: "2:00 PM",
        timing: "today",
    },
    {
        id: "2",
        address: "12 Canyon Ridge",
        client: "Priya Raman",
        when: "11:00 AM",
        timing: "tomorrow",
    },
    {
        id: "3",
        address: "234 Oak Street",
        client: "Michael Chen",
        when: "Fri 9:30",
        timing: "later",
    },
];

export const recentLeads: RecentLead[] = [
    {
        id: "1",
        name: "Robert Lang",
        budget: 6_200_000,
        score: "Hot",
        received: "20m",
    },
    {
        id: "2",
        name: "Michael Johnson",
        budget: 5_000_000,
        score: "Hot",
        received: "2h",
    },
    {
        id: "3",
        name: "Patricia Brown",
        budget: 3_500_000,
        score: "Warm",
        received: "1d",
    },
];

export const recentActivity: ActivityEntry[] = [
    {
        id: 1,
        type: "offer",
        title: "Offer received",
        description: "$3.1M on 456 Oak Avenue",
        time: "2h",
    },
    {
        id: 2,
        type: "showing",
        title: "Property showed",
        description: "789 Sunset Blvd shown to client",
        time: "5h",
    },
    {
        id: 3,
        type: "listing",
        title: "New listing posted",
        description: "234 Oak Street listed at $4.5M",
        time: "1d",
    },
];

export const quickActions: AgentQuickAction[] = [
    {
        id: "list-property",
        label: "List a property",
        href: "/agent/listings",
        icon: Home,
        tone: "accent",
    },
    {
        id: "add-lead",
        label: "Add a lead",
        href: "/agent/leads",
        icon: UserPlus,
        tone: "info",
    },
    {
        id: "schedule-showing",
        label: "Schedule a showing",
        href: "/agent/calendar",
        icon: CalendarPlus,
        tone: "highlight",
    },
];

export const monthlyGoals: MonthlyGoal[] = [
    { id: "showings", label: "Showings", value: 24, target: 30 },
    { id: "listings", label: "New listings", value: 8, target: 10 },
    { id: "deals", label: "Closed deals", value: 2, target: 4 },
];
