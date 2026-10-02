import { ADMIN_ROUTES } from "@/lib/constants";
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

const figureOf = (
    base: FigureBase,
    points: GrowthPoint[],
    total: number,
): BusinessFigure => {
    const latest = points[points.length - 1];

    return {
        ...base,
        latest: latest
            ? `${formatCount(latest.value)} in ${monthLabel(latest.name)}`
            : "No months yet",
        delta: monthOverMonth(points),
        points: points.map((point) => point.value),
        total: formatCount(total),
    };
};

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
            trend?.deals ?? [],
            completed,
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
            trend?.listings ?? [],
            stock,
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
            trend?.users ?? [],
            platform?.users ?? 0,
        ),
    ];
};

export const lifetimeVolume = (
    platform: PlatformStats | undefined,
): LifetimeVolume => {
    const volume = platform?.volume ?? 0;
    const completed = platform?.completedTransactions ?? 0;

    return {
        settled: formatMillions(volume, 1),
        averageDeal:
            completed > 0 ? formatMillions(volume / completed, 1) : null,
    };
};

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
