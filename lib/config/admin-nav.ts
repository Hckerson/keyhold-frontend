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
                href: "/admin",
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
                href: "/admin/listings",
                icon: Home,
                description: "Moderate all property listings",
            },
            {
                label: "Users",
                href: "/admin/users",
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
                href: "/admin/transactions",
                icon: ArrowLeftRight,
                description: "Deal transactions",
            },
            {
                label: "Payments",
                href: "/admin/payments",
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
                href: "/admin/reports",
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
                href: "/admin/verifications",
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
                href: "/admin/settings",
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
            item.href === "/admin/verifications"
                ? { ...item, badge: pendingVerifications || undefined }
                : item,
        ),
    }));
