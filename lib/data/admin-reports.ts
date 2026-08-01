import type { BarDatum } from "@/components/ui/charts/bar-chart";
import type { StatItem } from "@/lib/types";
import { GMV_YTD, CLOSED_DEALS_YTD } from "@/lib/data/admin-platform";
import {
    ACTIVE_USERS,
    TOTAL_USERS,
    USER_GROWTH_LABEL,
    USER_ROLE_SEGMENTS,
    USER_TIER_SEGMENTS,
} from "@/lib/data/admin-users";
import { formatCount, formatMillions } from "@/lib/utils";

export interface RegionMetric {
    region: string;
    listings: number;
    volume: number;
    avgPrice: number;
}

export const REGION_METRICS: RegionMetric[] = [
    { region: "Beverly Hills", listings: 87, volume: 285, avgPrice: 3.2 },
    { region: "Bel Air", listings: 56, volume: 198, avgPrice: 3.5 },
    { region: "West Hollywood", listings: 72, volume: 156, avgPrice: 2.1 },
    { region: "Malibu", listings: 45, volume: 142, avgPrice: 3.1 },
    { region: "Santa Monica", listings: 82, volume: 166, avgPrice: 2.0 },
];

export const REGION_BARS: BarDatum[] = [...REGION_METRICS]
    .sort((a, b) => b.volume - a.volume)
    .map((metric) => ({ label: metric.region, value: metric.volume }));

export const ACTIVE_LISTINGS = REGION_METRICS.reduce(
    (total, metric) => total + metric.listings,
    0,
);

export const AVG_TRANSACTION_VALUE = GMV_YTD / CLOSED_DEALS_YTD;

export const TOTAL_USERS_LABEL = formatCount(TOTAL_USERS);

export const REPORT_STATS: StatItem[] = [
    {
        label: "GMV (YTD)",
        value: formatMillions(GMV_YTD, 0),
        change: "+22%",
        trend: "up",
        caption: "vs prior year",
        featured: true,
    },
    {
        label: "Active Listings",
        value: ACTIVE_LISTINGS,
        change: "+18%",
        trend: "up",
        caption: "month over month",
    },
    {
        label: "User Growth",
        value: USER_GROWTH_LABEL,
        caption: `${formatCount(ACTIVE_USERS)} active users`,
    },
    {
        label: "Avg Transaction",
        value: formatMillions(AVG_TRANSACTION_VALUE, 2),
        change: "+8%",
        trend: "up",
        caption: "vs market",
    },
];

export { USER_ROLE_SEGMENTS, USER_TIER_SEGMENTS };
