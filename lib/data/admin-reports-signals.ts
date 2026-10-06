import type { ReportSignal, Trend } from "@/lib/types";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import type {
    PlatformStats,
    RegionMetric,
    TrendStats,
    UserStats,
} from "@/lib/validations/stats";
import { formatCount, formatMillions } from "@/lib/utils";
import { averageTransactionValue } from "@/lib/data/admin-reports";

const NO_VALUE = "—";

const latestChange = (points: { value: number }[]) => {
    const prior = points[points.length - 2]?.value;
    const latest = points[points.length - 1]?.value;
    if (!prior || latest === undefined) return 0;
    return Math.round(((latest - prior) / prior) * 100);
};

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value}%`;

const trendOf = (change: number): Trend => (change < 0 ? "down" : "up");

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
