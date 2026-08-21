import {
    LayoutDashboard,
    Home,
    Users,
    BarChart3,
    LineChart,
    CalendarDays,
    Sparkles,
    Settings,
    type LucideIcon,
} from "lucide-react";

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
                href: "/agent",
                icon: LayoutDashboard,
                description: "Your book of business at a glance",
            },
        ],
    },
    {
        label: "Business",
        items: [
            {
                label: "Listings",
                href: "/agent/listings",
                icon: Home,
                description: "Manage your active listings",
            },
            {
                label: "Leads",
                href: "/agent/leads",
                icon: Users,
                description: "Track and nurture prospects",
                badge: 4,
            },
            {
                label: "Pipeline",
                href: "/agent/pipeline",
                icon: BarChart3,
                description: "Deals in progress",
            },
            {
                label: "Analytics",
                href: "/agent/analytics",
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
                href: "/agent/calendar",
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
                href: "/agent/concierge",
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
                href: "/agent/settings",
                icon: Settings,
                description: "Profile, preferences, and notifications",
            },
        ],
    },
];

export const AGENT_ROUTES: AgentNavItem[] = AGENT_NAV.flatMap(
    (section) => section.items,
);
