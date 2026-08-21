import { ArrowLeftRight, Home, Layers, Users, Wallet } from "lucide-react";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type {
    RegionMetric,
    RegionPerformance,
    ReportSignal,
} from "@/lib/types";
import {
    CLOSED_DEALS_30D,
    CLOSED_DEALS_YTD,
    COMMISSIONS_YTD,
    GMV_YTD,
    TAKE_RATE_LABEL,
} from "@/lib/data/admin-platform";
import {
    ACTIVE_USERS,
    TOTAL_USERS,
    USER_GROWTH_LABEL,
    USER_ROLE_SEGMENTS,
    USER_TIER_SEGMENTS,
} from "@/lib/data/admin-users";
import { formatCount, formatMillions } from "@/lib/utils";

const LISTINGS_MOM_CHANGE = "+18%";
const AVG_TRANSACTION_CHANGE = "+8%";
const COMMISSION_MOM_CHANGE = "+19%";
const DEAL_VELOCITY_CHANGE = "-4%";

export const REGION_METRICS: RegionMetric[] = [
    {
        region: "Beverly Hills",
        listings: 87,
        volume: 285_000_000,
        avgPrice: 3_200_000,
    },
    {
        region: "Bel Air",
        listings: 56,
        volume: 198_000_000,
        avgPrice: 3_500_000,
    },
    {
        region: "Santa Monica",
        listings: 82,
        volume: 166_000_000,
        avgPrice: 2_000_000,
    },
    {
        region: "West Hollywood",
        listings: 72,
        volume: 156_000_000,
        avgPrice: 2_100_000,
    },
    {
        region: "Malibu",
        listings: 45,
        volume: 142_000_000,
        avgPrice: 3_100_000,
    },
];

const totalOf = (values: number[]) =>
    values.reduce((total, value) => total + value, 0);

const REGION_VOLUME = totalOf(REGION_METRICS.map((metric) => metric.volume));

export const REGION_PERFORMANCE: RegionPerformance[] = [...REGION_METRICS]
    .sort((a, b) => b.volume - a.volume)
    .map((metric, index) => ({
        ...metric,
        rank: index + 1,
        share: Math.round((metric.volume / REGION_VOLUME) * 100),
    }));

export const REGION_LEADER = REGION_PERFORMANCE[0];
export const REGION_PEERS = REGION_PERFORMANCE.slice(1);

export const ACTIVE_LISTINGS = totalOf(
    REGION_METRICS.map((metric) => metric.listings),
);

export const AVG_TRANSACTION_VALUE = GMV_YTD / CLOSED_DEALS_YTD;

export const REPORT_STATS: StatDatum[] = [
    {
        id: "gmv",
        icon: Wallet,
        label: "GMV YTD",
        value: formatMillions(GMV_YTD, 0),
        tone: "success",
        href: "/admin/transactions",
    },
    {
        id: "deals",
        icon: ArrowLeftRight,
        label: "Closed deals",
        value: formatCount(CLOSED_DEALS_YTD),
        tone: "highlight",
        href: "/admin/transactions",
    },
    {
        id: "listings",
        icon: Home,
        label: "Live listings",
        value: formatCount(ACTIVE_LISTINGS),
        tone: "info",
        href: "/admin/listings",
    },
    {
        id: "avg-deal",
        icon: Layers,
        label: "Avg deal",
        value: formatMillions(AVG_TRANSACTION_VALUE, 2),
        tone: "accent",
    },
    {
        id: "members",
        icon: Users,
        label: "Members",
        value: formatCount(TOTAL_USERS),
        tone: "neutral",
        href: "/admin/users",
    },
];

export const REPORT_SIGNALS: ReportSignal[] = [
    {
        id: "listings",
        value: formatCount(ACTIVE_LISTINGS),
        caption: `${REGION_METRICS.length} regions`,
        change: LISTINGS_MOM_CHANGE,
        trend: "up",
    },
    {
        id: "transaction",
        value: formatMillions(AVG_TRANSACTION_VALUE, 2),
        caption: "vs benchmark",
        change: AVG_TRANSACTION_CHANGE,
        trend: "up",
    },
    {
        id: "revenue",
        value: formatMillions(COMMISSIONS_YTD, 1),
        caption: `${TAKE_RATE_LABEL} take rate`,
        change: COMMISSION_MOM_CHANGE,
        trend: "up",
    },
    {
        id: "velocity",
        value: formatCount(CLOSED_DEALS_30D),
        caption: "last 30 days",
        change: DEAL_VELOCITY_CHANGE,
        trend: "down",
    },
    {
        id: "audience",
        value: formatCount(ACTIVE_USERS),
        caption: `${formatCount(TOTAL_USERS)} registered`,
        change: USER_GROWTH_LABEL,
        trend: "up",
    },
];

export const TOTAL_USERS_LABEL = formatCount(TOTAL_USERS);

export { USER_ROLE_SEGMENTS, USER_TIER_SEGMENTS };
