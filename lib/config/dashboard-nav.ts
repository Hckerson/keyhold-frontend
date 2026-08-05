import {
    Bell,
    LayoutDashboard,
    MessageSquare,
    Settings,
    type LucideIcon,
} from "lucide-react";
import { buyerJourney } from "@/lib/data/dashboard-journey";
import type { JourneyStationState } from "@/lib/types";

export interface DashboardNavItem {
    label: string;
    icon: LucideIcon;
    description: string;
    href?: string;
    badge?: number;
    count?: number;
    state?: JourneyStationState;
}

export interface DashboardNavSection {
    label?: string;
    spine?: boolean;
    items: DashboardNavItem[];
}

export const DASHBOARD_NAV: DashboardNavSection[] = [
    {
        items: [
            {
                label: "Overview",
                href: "/dashboard",
                icon: LayoutDashboard,
                description: "Your property journey at a glance",
            },
        ],
    },
    {
        label: buyerJourney.label,
        spine: true,
        items: buyerJourney.stations,
    },
    {
        label: "Inbox",
        items: [
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

export const DASHBOARD_STATUS = buyerJourney.status;

export const DASHBOARD_ROUTES = DASHBOARD_NAV.flatMap(
    (section) => section.items,
).filter(
    (item): item is DashboardNavItem & { href: string } =>
        item.href !== undefined,
);
