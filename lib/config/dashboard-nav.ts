import {
    LayoutDashboard,
    Heart,
    FileText,
    CalendarDays,
    MessageSquare,
    Bell,
    Settings,
    type LucideIcon,
} from "lucide-react";

export interface DashboardNavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    description: string;
    badge?: number;
}

export interface DashboardNavSection {
    label: string;
    items: DashboardNavItem[];
}

export const DASHBOARD_NAV: DashboardNavSection[] = [
    {
        label: "Browsing",
        items: [
            {
                label: "Overview",
                href: "/dashboard",
                icon: LayoutDashboard,
                description: "Your property journey at a glance",
            },
            {
                label: "Saved Listings",
                href: "/dashboard/saved",
                icon: Heart,
                description: "Properties you've bookmarked",
            },
        ],
    },
    {
        label: "Activity",
        items: [
            {
                label: "Offers",
                href: "/dashboard/offers",
                icon: FileText,
                description: "Track your submitted offers",
            },
            {
                label: "Viewings",
                href: "/dashboard/viewings",
                icon: CalendarDays,
                description: "Upcoming property tours",
            },
            {
                label: "Messages",
                href: "/dashboard/messages",
                icon: MessageSquare,
                description: "Chat with your agents",
                badge: 1,
            },
            {
                label: "Alerts",
                href: "/dashboard/alerts",
                icon: Bell,
                description: "Price drops and new matches",
                badge: 2,
            },
        ],
    },
    {
        label: "Account",
        items: [
            {
                label: "Settings",
                href: "/dashboard/settings",
                icon: Settings,
                description: "Profile and preferences",
            },
        ],
    },
];

export const DASHBOARD_ROUTES: DashboardNavItem[] = DASHBOARD_NAV.flatMap(
    (section) => section.items,
);
