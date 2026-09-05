import {
    LayoutDashboard,
    Home,
    Users,
    ArrowLeftRight,
    CreditCard,
    ShieldCheck,
    BarChart3,
    Settings,
    type LucideIcon,
} from "lucide-react";
import { ADMIN_ROUTES } from "@/lib/constants";

export interface AdminNavItem {
    label: string;
    href: string;
    icon: LucideIcon;
    description: string;
    badge?: number;
}

export interface AdminNavSection {
    label: string;
    items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavSection[] = [
    {
        label: "Overview",
        items: [
            {
                label: "Dashboard",
                href: ADMIN_ROUTES.overview,
                icon: LayoutDashboard,
                description: "Platform health at a glance",
            },
        ],
    },
    {
        label: "Marketplace",
        items: [
            {
                label: "Listings",
                href: ADMIN_ROUTES.listings,
                icon: Home,
                description: "Moderate all property listings",
            },
            {
                label: "Users",
                href: ADMIN_ROUTES.users,
                icon: Users,
                description: "Members, agents & roles",
            },
        ],
    },
    {
        label: "Finance",
        items: [
            {
                label: "Transactions",
                href: ADMIN_ROUTES.transactions,
                icon: ArrowLeftRight,
                description: "Deal transactions",
            },
            {
                label: "Payments",
                href: ADMIN_ROUTES.payments,
                icon: CreditCard,
                description: "Payments & payouts",
            },
        ],
    },
    {
        label: "Insights",
        items: [
            {
                label: "Reports",
                href: ADMIN_ROUTES.reports,
                icon: BarChart3,
                description: "Analytics & reports",
            },
        ],
    },
    {
        label: "Trust & Safety",
        items: [
            {
                label: "Verifications",
                href: ADMIN_ROUTES.verifications,
                icon: ShieldCheck,
                description: "Identity & listing checks",
            },
        ],
    },
    {
        label: "System",
        items: [
            {
                label: "Settings",
                href: ADMIN_ROUTES.settings,
                icon: Settings,
                description: "Platform configuration",
            },
        ],
    },
];

export const adminNav = (pendingVerifications: number): AdminNavSection[] =>
    ADMIN_NAV.map((section) => ({
        ...section,
        items: section.items.map((item) =>
            item.href === ADMIN_ROUTES.verifications
                ? { ...item, badge: pendingVerifications || undefined }
                : item,
        ),
    }));
