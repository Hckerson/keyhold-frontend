import {
    LayoutDashboard,
    Home,
    Users,
    ArrowLeftRight,
    CreditCard,
    ShieldCheck,
    BarChart3,
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
        label: "Trust & Safety",
        items: [
            {
                label: "Verifications",
                href: "/admin/verifications",
                icon: ShieldCheck,
                description: "Identity & listing checks",
                badge: 7,
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
];

export const ADMIN_ROUTES: AdminNavItem[] = ADMIN_NAV.flatMap(
    (section) => section.items,
);
