import { ArrowLeftRight, Home, Layers, Users, Wallet } from "lucide-react";
import type { RegionPerformance, StatDatum } from "@/lib/types";
import type {
    PlatformStats,
    RegionMetric,
    UserStats,
} from "@/lib/validations/stats";
import { formatCount, formatMillions } from "@/lib/utils";

const NO_VALUE = "—";

const totalOf = (values: number[]) =>
    values.reduce((total, value) => total + value, 0);

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
