import type { GrowthPoint, TrendStats } from "@/lib/validations/stats";
import { monthLabel } from "@/lib/data/admin-overview";

const NO_PERIOD = "No activity recorded yet";

export const reportMonths = (
    trend: TrendStats | undefined,
): Record<string, string | number>[] => {
    const keys = [
        ...new Set([
            ...(trend?.gmv ?? []).map((point) => point.name),
            ...(trend?.deals ?? []).map((point) => point.name),
            ...(trend?.users ?? []).map((point) => point.name),
        ]),
    ].sort();

    const valueAt = (points: GrowthPoint[] | undefined, key: string) =>
        points?.find((point) => point.name === key)?.value ?? 0;

    return keys.map((key) => ({
        month: monthLabel(key),
        gmv: valueAt(trend?.gmv, key),
        deals: valueAt(trend?.deals, key),
        users: valueAt(trend?.users, key),
    }));
};

export const reportPeriodLabel = (trend: TrendStats | undefined) => {
    const months = reportMonths(trend);
    if (months.length === 0) return NO_PERIOD;
    return `${months[0].month}–${months[months.length - 1].month} · ${months.length} months tracked`;
};
