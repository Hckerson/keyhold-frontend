import type { ReportTrendMetric } from "@/lib/types";
import type { GrowthPoint, TrendStats } from "@/lib/validations/stats";
import { formatCompactUsd, formatCount, formatMillions } from "@/lib/utils";

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

const MILLION = 1_000_000;
const NO_PERIOD = "No activity recorded yet";

const monthLabel = (key: string) => MONTH_LABELS[Number(key.slice(5, 7)) - 1];

const valuesOf = (points: GrowthPoint[]) => points.map((point) => point.value);

const sum = (values: number[]) =>
    values.reduce((total, value) => total + value, 0);

const average = (values: number[]) =>
    values.length ? Math.round(sum(values) / values.length) : 0;

const peakMonthFor = (points: GrowthPoint[]) => {
    if (points.length === 0) return "";
    const values = valuesOf(points);
    return monthLabel(points[values.indexOf(Math.max(...values))].name);
};

const latestChange = (values: number[]) => {
    const prior = values[values.length - 2];
    const latest = values[values.length - 1];
    if (!prior) return 0;
    return Math.round(((latest - prior) / prior) * 1_000) / 10;
};

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value}%`;

const trendOf = (change: number) => (change < 0 ? "down" : "up");

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

export const reportTrendMetrics = (
    trend: TrendStats | undefined,
): ReportTrendMetric[] => {
    const gmv = trend?.gmv ?? [];
    const deals = trend?.deals ?? [];
    const users = trend?.users ?? [];

    const gmvValues = valuesOf(gmv);
    const dealValues = valuesOf(deals);
    const userValues = valuesOf(users);

    const gmvChange = latestChange(gmvValues);
    const dealsChange = latestChange(dealValues);
    const usersChange = latestChange(userValues);

    return [
        {
            id: "gmv",
            label: "GMV",
            eyebrow: "Gross merchandise value · settled",
            headline: formatMillions(sum(gmvValues), 0),
            change: signed(gmvChange),
            trend: trendOf(gmvChange),
            series: [{ key: "gmv", name: "Gross volume", tone: "accent" }],
            divideBy: MILLION,
            valuePrefix: "$",
            valueSuffix: "M",
            summary: [
                {
                    label: "Peak month",
                    value: gmvValues.length
                        ? `${peakMonthFor(gmv)} · ${formatCompactUsd(
                              Math.max(...gmvValues),
                          )}`
                        : "—",
                },
                {
                    label: "Monthly average",
                    value: formatCompactUsd(average(gmvValues)),
                },
                { label: "Month over month", value: signed(gmvChange) },
            ],
        },
        {
            id: "deals",
            label: "Closed deals",
            eyebrow: "Closed deals · settled",
            headline: formatCount(sum(dealValues)),
            change: signed(dealsChange),
            trend: trendOf(dealsChange),
            series: [{ key: "deals", name: "Closed deals", tone: "info" }],
            divideBy: 1,
            valuePrefix: "",
            valueSuffix: "",
            summary: [
                {
                    label: "Peak month",
                    value: dealValues.length
                        ? `${peakMonthFor(deals)} · ${Math.max(...dealValues)}`
                        : "—",
                },
                {
                    label: "Monthly average",
                    value: formatCount(average(dealValues)),
                },
                {
                    label: "Closed in range",
                    value: formatCount(sum(dealValues)),
                },
            ],
        },
        {
            id: "users",
            label: "Members",
            eyebrow: "Platform members · joined",
            headline: formatCount(sum(userValues)),
            change: signed(usersChange),
            trend: trendOf(usersChange),
            series: [
                { key: "users", name: "Platform members", tone: "highlight" },
            ],
            divideBy: 1,
            valuePrefix: "",
            valueSuffix: "",
            summary: [
                {
                    label: "Joined in range",
                    value: formatCount(sum(userValues)),
                },
                {
                    label: "Monthly average",
                    value: formatCount(average(userValues)),
                },
                {
                    label: "Peak month",
                    value: userValues.length
                        ? `${peakMonthFor(users)} · ${formatCount(
                              Math.max(...userValues),
                          )}`
                        : "—",
                },
            ],
        },
    ];
};
