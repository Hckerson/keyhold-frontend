import { ArrowLeftRight, Home, Layers, Users, Wallet } from "lucide-react";
import type { StatDatum } from "@/components/patterns/stat-cell";
import type { RegionPerformance, ReportSignal, Trend } from "@/lib/types";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import type { RegionMetric } from "@/lib/validations/stats";
import type {
    PlatformStats,
    TrendStats,
    UserStats,
} from "@/lib/validations/stats";
import { formatCount, formatMillions } from "@/lib/utils";

const NO_VALUE = "—";

const totalOf = (values: number[]) =>
    values.reduce((total, value) => total + value, 0);

const latestChange = (points: { value: number }[]) => {
    const prior = points[points.length - 2]?.value;
    const latest = points[points.length - 1]?.value;
    if (!prior || latest === undefined) return 0;
    return Math.round(((latest - prior) / prior) * 100);
};

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value}%`;

const trendOf = (change: number): Trend => (change < 0 ? "down" : "up");

export const regionPerformance = (
    regions: RegionMetric[],
): RegionPerformance[] => {
    const volume = totalOf(regions.map((metric) => metric.volume));

    return [...regions]
        .sort((a, b) => b.volume - a.volume)
        .map((metric, index) => ({
            ...metric,
            rank: index + 1,
            share: volume ? Math.round((metric.volume / volume) * 100) : 0,
        }));
};

export const activeListings = (regions: RegionMetric[]) =>
    totalOf(regions.map((metric) => metric.listings));

export const averageTransactionValue = (platform: PlatformStats | undefined) =>
    platform?.completedTransactions
        ? platform.volume / platform.completedTransactions
        : 0;

export const reportStats = (
    platform: PlatformStats | undefined,
    users: UserStats | undefined,
): StatDatum[] => [
    {
        id: "gmv",
        icon: Wallet,
        label: "Settled volume",
        value: formatMillions(platform?.volume ?? 0, 0),
        tone: "success",
        href: "/admin/transactions",
    },
    {
        id: "deals",
        icon: ArrowLeftRight,
        label: "Closed deals",
        value: formatCount(platform?.completedTransactions ?? 0),
        tone: "highlight",
        href: "/admin/transactions",
    },
    {
        id: "listings",
        icon: Home,
        label: "Live listings",
        value: formatCount(platform?.activeProperties ?? 0),
        tone: "info",
        href: "/admin/listings",
    },
    {
        id: "avg-deal",
        icon: Layers,
        label: "Avg deal",
        value: averageTransactionValue(platform)
            ? formatMillions(averageTransactionValue(platform), 2)
            : NO_VALUE,
        tone: "accent",
    },
    {
        id: "members",
        icon: Users,
        label: "Members",
        value: formatCount(users?.total ?? 0),
        tone: "neutral",
        href: "/admin/users",
    },
];

export const reportSignals = (
    platform: PlatformStats | undefined,
    users: UserStats | undefined,
    regions: RegionMetric[],
    trend: TrendStats | undefined,
): ReportSignal[] => {
    const listingsChange = latestChange(trend?.listings ?? []);
    const dealsChange = latestChange(trend?.deals ?? []);
    const gmvChange = latestChange(trend?.gmv ?? []);
    const usersChange = latestChange(trend?.users ?? []);
    const commissions = (platform?.volume ?? 0) * DEFAULT_COMMISSION_RATE;

    return [
        {
            id: "listings",
            value: formatCount(platform?.activeProperties ?? 0),
            caption: `${regions.length} regions`,
            change: signed(listingsChange),
            trend: trendOf(listingsChange),
        },
        {
            id: "transaction",
            value: averageTransactionValue(platform)
                ? formatMillions(averageTransactionValue(platform), 2)
                : NO_VALUE,
            caption: "per closed deal",
            change: signed(gmvChange),
            trend: trendOf(gmvChange),
        },
        {
            id: "revenue",
            value: formatMillions(commissions, 1),
            caption: `${(DEFAULT_COMMISSION_RATE * 100).toFixed(2)}% take rate`,
            change: signed(gmvChange),
            trend: trendOf(gmvChange),
        },
        {
            id: "velocity",
            value: formatCount(platform?.completedTransactions ?? 0),
            caption: "closed to date",
            change: signed(dealsChange),
            trend: trendOf(dealsChange),
        },
        {
            id: "audience",
            value: formatCount(users?.active ?? 0),
            caption: `${formatCount(users?.total ?? 0)} registered`,
            change: signed(usersChange),
            trend: trendOf(usersChange),
        },
    ];
};
