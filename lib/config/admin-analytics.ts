import { ADMIN_ROUTES } from "@/lib/constants";
import type { TimeFilter } from "@/lib/enums/enums";
import type { AnalyticsPanelMeta, ColumnSeries, FilterPill } from "@/lib/types";

export const DEFAULT_ANALYTICS_WINDOW: TimeFilter = "month";

export const ANALYTICS_WINDOWS: readonly FilterPill<TimeFilter>[] = [
    { id: "month", label: "12 months" },
    { id: "year", label: "5 years" },
];

const single = (name: string): ColumnSeries[] => [
    { key: "value", name, tone: "accent" },
];

type AnalyticsSeriesId = "gmv" | "deals" | "members" | "listings";

export const ANALYTICS_SERIES: Record<AnalyticsSeriesId, ColumnSeries[]> = {
    gmv: single("Settled GMV"),
    deals: single("Closed deals"),
    members: single("New members"),
    listings: single("New listings"),
};

export const ANALYTICS_PANELS: readonly AnalyticsPanelMeta[] = [
    {
        id: "pipeline",
        title: "Deal pipeline",
        action: "Transactions",
        href: ADMIN_ROUTES.transactions,
    },
    {
        id: "escrow",
        title: "Escrow",
        action: "Payments",
        href: ADMIN_ROUTES.payments,
    },
    {
        id: "queues",
        title: "Trust & safety",
        action: "Dashboard",
        href: ADMIN_ROUTES.overview,
    },
    {
        id: "status",
        title: "Account status",
        action: "Users",
        href: ADMIN_ROUTES.users,
    },
    {
        id: "tiers",
        title: "Membership tiers",
        action: "Users",
        href: ADMIN_ROUTES.users,
    },
    {
        id: "markets",
        title: "Markets",
        action: "Listings",
        href: ADMIN_ROUTES.listings,
    },
];
