import { REPORT_DAY_WINDOW } from "@/lib/config/report-export";
import { monthLabel } from "@/lib/data/admin-overview";
import { formatMonthName } from "@/lib/utils";
import type { ReportGrain, ReportMonth } from "@/lib/types";
import type { GrowthPoint, TrendStats } from "@/lib/validations/stats";

const DAY_KEY_LENGTH = 10;

const dayKeyOf = (date: Date) => date.toISOString().slice(0, DAY_KEY_LENGTH);

const valueAt = (points: GrowthPoint[], key: string) =>
    points.find((point) => point.name === key)?.value ?? 0;

export const trendKeys = (trend: TrendStats) =>
    [trend.gmv, trend.deals, trend.listings, trend.users]
        .flat()
        .map((point) => point.name)
        .sort();

export const trendGrain = (
    trend: TrendStats | undefined,
    fallback: ReportGrain,
): ReportGrain => {
    const [key] = trend ? trendKeys(trend) : [];
    if (!key) return fallback;
    return key.length === DAY_KEY_LENGTH ? "day" : "month";
};

export const tallyOf = (trend: TrendStats, key: string) => ({
    gmv: valueAt(trend.gmv, key),
    deals: valueAt(trend.deals, key),
    listings: valueAt(trend.listings, key),
    members: valueAt(trend.users, key),
});

export const reportDays = (trend: TrendStats, today: Date): ReportMonth[] =>
    Array.from({ length: REPORT_DAY_WINDOW }, (_, index) => {
        const key = dayKeyOf(
            new Date(
                Date.UTC(
                    today.getUTCFullYear(),
                    today.getUTCMonth(),
                    today.getUTCDate() - (REPORT_DAY_WINDOW - 1 - index),
                ),
            ),
        );
        const day = Number(key.slice(DAY_KEY_LENGTH - 2));
        const short = `${day} ${monthLabel(key)}`;

        return {
            key,
            grain: "day",
            short,
            year: key.slice(0, 4),
            name: `${day} ${formatMonthName(key.slice(0, 7))}`,
            label: `${short} ${key.slice(0, 4)}`,
            tick: short,
            ...tallyOf(trend, key),
            partial: key === dayKeyOf(today),
        };
    });
