import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import type { ColumnSeries, DecisionLane, MonthDelta } from "@/lib/types";
import type { DisputeCounts } from "@/lib/validations/dispute";
import type { FlagCounts } from "@/lib/validations/flag";
import type { KycCounts } from "@/lib/validations/kyc";
import type { GrowthPoint, TrendStats } from "@/lib/validations/stats";
import { minutesSince } from "@/lib/utils/elapsed";
import { formatMillions } from "@/lib/utils";

const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const monthLabel = (key: string) =>
    MONTH_LABELS[Number(key.slice(5, 7)) - 1];

const monthIndex = (key: string) =>
    Number(key.slice(0, 4)) * MONTH_LABELS.length + Number(key.slice(5, 7)) - 1;

const monthKey = (index: number) =>
    `${Math.floor(index / MONTH_LABELS.length)}-${String((index % MONTH_LABELS.length) + 1).padStart(2, "0")}`;

export const completeMonths = (
    points: GrowthPoint[],
    today = new Date(),
): GrowthPoint[] => {
    const current =
        today.getUTCFullYear() * MONTH_LABELS.length + today.getUTCMonth();
    return points.filter((point) => monthIndex(point.name) < current);
};

export const fillMonths = (points: GrowthPoint[]): GrowthPoint[] => {
    if (points.length === 0) return points;
    const values = new Map(points.map((point) => [point.name, point.value]));
    const first = monthIndex(points[0].name);
    const span = monthIndex(points[points.length - 1].name) - first + 1;

    return Array.from({ length: span }, (_, offset) => {
        const name = monthKey(first + offset);
        return { name, value: values.get(name) ?? 0 };
    });
};

const ageOf = (iso: string | null | undefined) =>
    iso ? minutesSince(iso) : null;

export const moderationLoad = (
    flags: FlagCounts | undefined,
    kyc: KycCounts | undefined,
    disputes: DisputeCounts | undefined,
): Omit<DecisionLane, "share">[] => [
    {
        id: "verifications",
        backlog: kyc?.pending ?? 0,
        oldestMinutes: ageOf(kyc?.oldestPendingAt),
    },
    {
        id: "listings",
        backlog: flags?.byType.properties ?? 0,
        oldestMinutes: null,
    },
    {
        id: "flags",
        backlog: (flags?.byType.users ?? 0) + (flags?.byType.messages ?? 0),
        oldestMinutes: ageOf(flags?.oldestActiveAt),
    },
    {
        id: "disputes",
        backlog: disputes?.byStatus.OPEN ?? 0,
        oldestMinutes: ageOf(disputes?.oldestOpenAt),
    },
];

export const GMV_SERIES: ColumnSeries[] = [
    { key: "gmv", name: "Gross merchandise value", tone: "accent" },
];

export const gmvMonths = (
    trend: TrendStats | undefined,
): Record<string, string | number>[] =>
    (trend?.gmv ?? []).map((point) => ({
        month: monthLabel(point.name),
        gmv: point.value,
    }));

export interface GmvReading {
    value: number;
    month: string;
    delta: MonthDelta | null;
    commissionEstimate: string;
    commissionRate: string;
}

export const monthOverMonth = (points: GrowthPoint[]): MonthDelta | null => {
    const latest = points[points.length - 1]?.value ?? 0;
    const previous = points[points.length - 2]?.value ?? 0;
    if (previous <= 0 || latest === previous) return null;

    const change = Math.round(((latest - previous) / previous) * 100);

    return {
        label: `${change > 0 ? "+" : ""}${change}%`,
        direction: change < 0 ? "down" : "up",
    };
};

export const gmvReading = (
    trend: TrendStats | undefined,
    rate = DEFAULT_COMMISSION_RATE,
): GmvReading | null => {
    const points = trend?.gmv ?? [];
    const latest = points[points.length - 1];
    if (!latest) return null;

    return {
        value: latest.value,
        month: monthLabel(latest.name),
        delta: monthOverMonth(points),
        commissionEstimate: formatMillions(latest.value * rate, 1),
        commissionRate: `${(rate * 100).toFixed(1)}%`,
    };
};
