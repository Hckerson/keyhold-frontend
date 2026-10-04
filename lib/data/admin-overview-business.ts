import { ADMIN_ROUTES, NO_READING } from "@/lib/constants";
import {
    gmvMonths,
    gmvReading,
    monthLabel,
    monthOverMonth,
} from "@/lib/data/admin-overview";
import { formatCount, formatMillions, percentOf } from "@/lib/utils";
import type { BusinessFigure, LifetimeVolume } from "@/lib/types";
import type {
    GrowthPoint,
    PlatformStats,
    TrendStats,
    UserStats,
} from "@/lib/validations/stats";

type FigureBase = Pick<BusinessFigure, "id" | "label" | "href" | "ratio">;

const latestOf = (points: GrowthPoint[] | undefined) => {
    if (!points) return NO_READING;
    const latest = points[points.length - 1];
    return latest
        ? `${formatCount(latest.value)} in ${monthLabel(latest.name)}`
        : "No months yet";
};

const figureOf = (
    base: FigureBase,
    points: GrowthPoint[] | undefined,
    total: number | undefined,
): BusinessFigure => ({
    ...base,
    latest: latestOf(points),
    delta: monthOverMonth(points ?? []),
    points: (points ?? []).map((point) => point.value),
    total: total === undefined ? NO_READING : formatCount(total),
});

export const businessFigures = (
    trend: TrendStats | undefined,
    platform: PlatformStats | undefined,
    users: UserStats | undefined,
): BusinessFigure[] => {
    const completed = platform?.completedTransactions ?? 0;
    const stock = platform?.properties ?? 0;

    return [
        figureOf(
            {
                id: "deals",
                label: "Deals closed",
                href: ADMIN_ROUTES.transactions,
                ratio: {
                    percent: percentOf(completed, platform?.transactions ?? 0),
                    label: "close rate",
                },
            },
            trend?.deals,
            platform?.completedTransactions,
        ),
        figureOf(
            {
                id: "listings",
                label: "New listings",
                href: ADMIN_ROUTES.listings,
                ratio: {
                    percent: percentOf(platform?.activeProperties ?? 0, stock),
                    label: "of stock live",
                },
            },
            trend?.listings,
            platform?.properties,
        ),
        figureOf(
            {
                id: "members",
                label: "New members",
                href: ADMIN_ROUTES.users,
                ratio: {
                    percent: percentOf(users?.active ?? 0, users?.total ?? 0),
                    label: "active",
                },
            },
            trend?.users,
            platform?.users,
        ),
    ];
};

export const lifetimeVolume = (
    platform: PlatformStats | undefined,
): LifetimeVolume | null =>
    platform
        ? {
              settled: formatMillions(platform.volume, 1),
              averageDeal:
                  platform.completedTransactions > 0
                      ? formatMillions(
                            platform.volume / platform.completedTransactions,
                            1,
                        )
                      : null,
          }
        : null;

export const businessDeck = (
    trend: TrendStats | undefined,
    platform: PlatformStats | undefined,
    users: UserStats | undefined,
) => ({
    reading: gmvReading(trend),
    months: gmvMonths(trend),
    figures: businessFigures(trend, platform, users),
    lifetime: lifetimeVolume(platform),
});
