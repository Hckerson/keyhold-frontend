import {
    LayoutDashboard,
    Home,
    Inbox,
    Users,
    BarChart3,
    LineChart,
    CalendarDays,
    Sparkles,
    Settings,
    type LucideIcon,
} from "lucide-react";
import { AGENT_ROUTES } from "@/lib/constants";

export interface AgentNavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    description: string;
    badge?: number;
}

export interface AgentNavSection {
    label: string;
    items: AgentNavItem[];
}

export const AGENT_NAV: AgentNavSection[] = [
    {
        label: "Overview",
        items: [
            {
                label: "Dashboard",
                href: AGENT_ROUTES.overview,
                icon: LayoutDashboard,
                description: "Your book of business at a glance",
            },
            {
                label: "Requests",
                href: AGENT_ROUTES.requests,
                icon: Inbox,
                description: "Viewings and offers awaiting your reply",
            },
        ],
    },
    {
        label: "Business",
        items: [
            {
                label: "Listings",
                href: AGENT_ROUTES.listings,
                icon: Home,
                description: "Manage your active listings",
            },
            {
                label: "Leads",
                href: AGENT_ROUTES.leads,
                icon: Users,
                description: "Track and nurture prospects",
            },
            {
                label: "Pipeline",
                href: AGENT_ROUTES.pipeline,
                icon: BarChart3,
                description: "Deals in progress",
            },
            {
                label: "Analytics",
                href: AGENT_ROUTES.analytics,
                icon: LineChart,
                description: "Performance and market insights",
            },
        ],
    },
    {
        label: "Schedule",
        items: [
            {
                label: "Calendar",
                href: AGENT_ROUTES.calendar,
                icon: CalendarDays,
                description: "Appointments and showings",
            },
        ],
    },
    {
        label: "Concierge",
        items: [
            {
                label: "VIP Concierge",
                href: AGENT_ROUTES.concierge,
                icon: Sparkles,
                description: "White-glove client services",
            },
        ],
    },
    {
        label: "Account",
        items: [
            {
                label: "Settings",
                href: AGENT_ROUTES.settings,
                icon: Settings,
                description: "Profile, preferences, and notifications",
            },
        ],
    },
];

export interface AgentBadges {
    leads: number;
    requests: number;
}

const BADGE_BY_ROUTE: Record<string, keyof AgentBadges> = {
    [AGENT_ROUTES.leads]: "leads",
    [AGENT_ROUTES.requests]: "requests",
};

export const agentNav = (badges: AgentBadges): AgentNavSection[] =>
    AGENT_NAV.map((section) => ({
        ...section,
        items: section.items.map((item) => {
            const key = BADGE_BY_ROUTE[item.href];
            return key ? { ...item, badge: badges[key] || undefined } : item;
        }),
    }));
