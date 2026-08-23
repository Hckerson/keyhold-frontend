import {
    Bell,
    LayoutDashboard,
    MessageSquare,
    Receipt,
    Settings,
    type LucideIcon,
} from "lucide-react";
import type { JourneyStation, JourneyStationState } from "@/lib/types";

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

export const JOURNEY_LABEL = "Journey";

export const dashboardNav = (
    stations: JourneyStation[],
    unreadMessages: number,
    unreadAlerts: number,
): DashboardNavSection[] => [
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
        label: JOURNEY_LABEL,
        spine: true,
        items: stations,
    },
    {
        label: "Inbox",
        items: [
            {
                label: "Messages",
                href: "/dashboard/messages",
                icon: MessageSquare,
                description: "Chat with your agents",
                badge: unreadMessages || undefined,
            },
            {
                label: "Alerts",
                href: "/dashboard/alerts",
                icon: Bell,
                description: "Price drops and new matches",
                badge: unreadAlerts || undefined,
            },
        ],
    },
    {
        label: "Money",
        items: [
            {
                label: "Transactions",
                href: "/dashboard/transactions",
                icon: Receipt,
                description: "Escrow holds and settlements",
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

export const DASHBOARD_ROUTES = dashboardNav([], 0, 0)
    .flatMap((section) => section.items)
    .filter(
        (item): item is DashboardNavItem & { href: string } =>
            item.href !== undefined,
    );
