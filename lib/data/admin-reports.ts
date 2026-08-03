import type { ColumnSeries } from "@/components/ui/charts/column-chart";
import type { MetricItem, Trend } from "@/lib/types";
import {
    CLOSED_DEALS_YTD,
    GMV_YTD,
    TAKE_RATE_LABEL,
} from "@/lib/data/admin-platform";
import {
    ACTIVE_USERS,
    TOTAL_USERS,
    USER_GROWTH_LABEL,
    USER_GROWTH_SERIES,
    USER_ROLE_SEGMENTS,
    USER_TIER_SEGMENTS,
} from "@/lib/data/admin-users";
import { formatCompactUsd, formatCount, formatMillions } from "@/lib/utils";

export type ReportMetricKey = "gmv" | "deals" | "users";

export interface RegionMetric {
    region: string;
    listings: number;
    volume: number;
    avgPrice: number;
}

export interface RegionPerformance extends RegionMetric {
    rank: number;
    intensity: number;
}

export interface ReportSignal {
    label: string;
    value: string;
    caption: string;
    change: string;
    trend: Trend;
}

export interface ReportHeadline {
    label: string;
    value: string;
    change: string;
    trend: Trend;
    caption: string;
    series: number[];
    metrics: MetricItem[];
}

export interface ReportTrendMetric {
    id: ReportMetricKey;
    label: string;
    series: ColumnSeries[];
    divideBy: number;
    valuePrefix: string;
    valueSuffix: string;
    summary: MetricItem[];
}

const GMV_YOY_CHANGE = "+22%";
const LISTINGS_MOM_CHANGE = "+18%";
const AVG_TRANSACTION_CHANGE = "+8%";

const REPORT_MONTH_LABELS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const GMV_WEIGHTS = [0.14, 0.15, 0.16, 0.18, 0.19, 0.18];
const DEAL_WEIGHTS = [0.15, 0.15, 0.17, 0.17, 0.18, 0.18];

const sum = (values: number[]) =>
    values.reduce((total, value) => total + value, 0);

const average = (values: number[]) => Math.round(sum(values) / values.length);

const distribute = (total: number, weights: number[]) => {
    const parts = weights.map((weight) => Math.round(total * weight));
    const drift = total - sum(parts);
    return parts.map((part, index) =>
        index === parts.length - 1 ? part + drift : part,
    );
};

const percentChange = (from: number, to: number) =>
    Math.round(((to - from) / from) * 1_000) / 10;

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value}%`;

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
    { region: "Malibu", listings: 45, volume: 142_000_000, avgPrice: 3_100_000 },
];

const rankedRegions = [...REGION_METRICS].sort((a, b) => b.volume - a.volume);
const leadingVolume = rankedRegions[0].volume;

export const REGION_PERFORMANCE: RegionPerformance[] = rankedRegions.map(
    (metric, index) => ({
        ...metric,
        rank: index + 1,
        intensity: Math.round((metric.volume / leadingVolume) * 100),
    }),
);

export const ACTIVE_LISTINGS = sum(
    REGION_METRICS.map((metric) => metric.listings),
);

export const AVG_TRANSACTION_VALUE = GMV_YTD / CLOSED_DEALS_YTD;

interface ReportMonth extends Record<string, string | number> {
    month: string;
    gmv: number;
    deals: number;
    users: number;
}

const GMV_BY_MONTH = distribute(GMV_YTD, GMV_WEIGHTS);
const DEALS_BY_MONTH = distribute(CLOSED_DEALS_YTD, DEAL_WEIGHTS);

export const REPORT_MONTHS: ReportMonth[] = REPORT_MONTH_LABELS.map(
    (month, index) => ({
        month,
        gmv: GMV_BY_MONTH[index],
        deals: DEALS_BY_MONTH[index],
        users: USER_GROWTH_SERIES[index],
    }),
);

export const REPORT_PERIOD_LABEL = `${REPORT_MONTH_LABELS[0]}–${
    REPORT_MONTH_LABELS[REPORT_MONTH_LABELS.length - 1]
} · ${REPORT_MONTHS.length} months tracked`;

const peakMonthFor = (values: number[]) =>
    REPORT_MONTH_LABELS[values.indexOf(Math.max(...values))];

const latestChange = (values: number[]) =>
    percentChange(values[values.length - 2], values[values.length - 1]);

const USERS_BY_MONTH = REPORT_MONTHS.map((month) => month.users);

export const REPORT_TREND_METRICS: ReportTrendMetric[] = [
    {
        id: "gmv",
        label: "GMV",
        series: [{ key: "gmv", name: "Gross volume", tone: "accent" }],
        divideBy: 1_000_000,
        valuePrefix: "$",
        valueSuffix: "M",
        summary: [
            {
                label: "Peak month",
                value: `${peakMonthFor(GMV_BY_MONTH)} · ${formatCompactUsd(
                    Math.max(...GMV_BY_MONTH),
                )}`,
            },
            {
                label: "Monthly average",
                value: formatCompactUsd(average(GMV_BY_MONTH)),
            },
            {
                label: "Month over month",
                value: signed(latestChange(GMV_BY_MONTH)),
            },
        ],
    },
    {
        id: "deals",
        label: "Closed deals",
        series: [{ key: "deals", name: "Closed deals", tone: "info" }],
        divideBy: 1,
        valuePrefix: "",
        valueSuffix: "",
        summary: [
            {
                label: "Peak month",
                value: `${peakMonthFor(DEALS_BY_MONTH)} · ${Math.max(
                    ...DEALS_BY_MONTH,
                )}`,
            },
            {
                label: "Monthly average",
                value: formatCount(average(DEALS_BY_MONTH)),
            },
            {
                label: "Closed year to date",
                value: formatCount(CLOSED_DEALS_YTD),
            },
        ],
    },
    {
        id: "users",
        label: "Platform users",
        series: [{ key: "users", name: "Platform users", tone: "highlight" }],
        divideBy: 1,
        valuePrefix: "",
        valueSuffix: "",
        summary: [
            { label: "Registered", value: formatCount(TOTAL_USERS) },
            {
                label: "Net added",
                value: `+${formatCount(
                    USERS_BY_MONTH[USERS_BY_MONTH.length - 1] -
                        USERS_BY_MONTH[0],
                )}`,
            },
            {
                label: "Month over month",
                value: signed(latestChange(USERS_BY_MONTH)),
            },
        ],
    },
];

export const REPORT_HEADLINE: ReportHeadline = {
    label: "Gross merchandise value",
    value: formatMillions(GMV_YTD, 0),
    change: GMV_YOY_CHANGE,
    trend: "up",
    caption: `Year to date · ${REPORT_PERIOD_LABEL}`,
    series: GMV_BY_MONTH,
    metrics: [
        { label: "Closed deals", value: formatCount(CLOSED_DEALS_YTD) },
        {
            label: "Avg deal size",
            value: formatMillions(AVG_TRANSACTION_VALUE, 2),
        },
        { label: "Take rate", value: TAKE_RATE_LABEL },
    ],
};

export const REPORT_SIGNALS: ReportSignal[] = [
    {
        label: "Active listings",
        value: formatCount(ACTIVE_LISTINGS),
        caption: `${REGION_METRICS.length} regions tracked`,
        change: LISTINGS_MOM_CHANGE,
        trend: "up",
    },
    {
        label: "Avg transaction",
        value: formatMillions(AVG_TRANSACTION_VALUE, 2),
        caption: "vs market benchmark",
        change: AVG_TRANSACTION_CHANGE,
        trend: "up",
    },
    {
        label: "Active users",
        value: formatCount(ACTIVE_USERS),
        caption: `${formatCount(TOTAL_USERS)} registered`,
        change: USER_GROWTH_LABEL,
        trend: "up",
    },
];

export const TOTAL_USERS_LABEL = formatCount(TOTAL_USERS);

export { USER_ROLE_SEGMENTS, USER_TIER_SEGMENTS };
