import {
    LayoutDashboard,
    Home,
    Users,
    ArrowLeftRight,
    CreditCard,
    ShieldCheck,
    Scale,
    Flag,
    BarChart3,
    ChartColumnBig,
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
                label: "Analytics",
                href: ADMIN_ROUTES.analytics,
                icon: ChartColumnBig,
                description: "Trends & live counts",
            },
            {
                label: "Reports",
                href: ADMIN_ROUTES.reports,
                icon: BarChart3,
                description: "Monthly statement & export",
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
            {
                label: "Flags",
                href: ADMIN_ROUTES.flags,
                icon: Flag,
                description: "Reported members & messages",
            },
            {
                label: "Disputes",
                href: ADMIN_ROUTES.disputes,
                icon: Scale,
                description: "Contested deals & outcomes",
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
