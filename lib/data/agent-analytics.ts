import { Award, Clock, Gauge, TrendingUp } from "lucide-react";
import type { StatDatum, Trend } from "@/lib/types";
import type { AgentAnalytics, GrowthPoint } from "@/lib/validations/stats";
import { formatMillions, formatUsd } from "@/lib/utils";

const MONTHS_PER_QUARTER = 3;
const MONTH_KEY_LENGTH = 7;
const NO_VALUE = "—";

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

export interface ProductionSummary {
    label: string;
    volume: number;
    closings: number;
    change: string;
    trend: Trend;
}

export interface MonthlyProduction {
    id: string;
    month: string;
    closings: number;
    volume: number;
}

export type QuarterStatus = "complete" | "in-progress";

export interface QuarterSummary {
    id: string;
    label: string;
    status: QuarterStatus;
    closings: number;
    volume: number;
}

export type BenchmarkUnit = "usd" | "days" | "percent" | "score";

export interface Benchmark {
    id: string;
    label: string;
    you: number;
    market: number;
    unit: BenchmarkUnit;
    higherIsBetter: boolean;
}

const monthIndex = (key: string) => Number(key.slice(5, 7)) - 1;

const yearOf = (key: string) => key.slice(0, 4);

const quarterOf = (key: string) =>
    Math.floor(monthIndex(key) / MONTHS_PER_QUARTER) + 1;

const currentMonthKey = () =>
    new Date().toISOString().slice(0, MONTH_KEY_LENGTH);

const dealsByMonth = (analytics: AgentAnalytics) =>
    new Map(analytics.monthlyDeals.map((point) => [point.name, point.value]));

export const analyticsPeriod = (monthly: GrowthPoint[]) => {
    if (monthly.length === 0) return NO_VALUE;
    const first = monthly[0].name;
    const last = monthly[monthly.length - 1].name;
    const from = `${MONTH_LABELS[monthIndex(first)]} ${yearOf(first)}`;
    const to = `${MONTH_LABELS[monthIndex(last)]} ${yearOf(last)}`;
    return from === to ? from : `${from} – ${to}`;
};

export const monthlyProduction = (
    analytics: AgentAnalytics,
): MonthlyProduction[] => {
    const deals = dealsByMonth(analytics);

    return analytics.monthly.map((point) => ({
        id: point.name,
        month: MONTH_LABELS[monthIndex(point.name)],
        closings: deals.get(point.name) ?? 0,
        volume: point.value,
    }));
};

export const production = (analytics: AgentAnalytics): ProductionSummary => {
    const months = analytics.monthly;
    const latest = months[months.length - 1]?.value ?? 0;
    const previous = months[months.length - 2]?.value ?? 0;
    const change = previous > 0 ? ((latest - previous) / previous) * 100 : 0;

    return {
        label: "Production",
        volume: analytics.production.volume,
        closings: analytics.production.deals,
        change:
            previous > 0
                ? `${change > 0 ? "+" : ""}${Math.round(change)}%`
                : NO_VALUE,
        trend: change < 0 ? "down" : "up",
    };
};

export const quarters = (analytics: AgentAnalytics): QuarterSummary[] => {
    const deals = dealsByMonth(analytics);
    const current = currentMonthKey();
    const buckets = new Map<string, QuarterSummary>();

    for (const point of analytics.monthly) {
        const id = `${yearOf(point.name)}-Q${quarterOf(point.name)}`;
        const bucket = buckets.get(id) ?? {
            id,
            label: `Q${quarterOf(point.name)} ${yearOf(point.name)}`,
            status: "complete" as QuarterStatus,
            closings: 0,
            volume: 0,
        };

        bucket.volume += point.value;
        bucket.closings += deals.get(point.name) ?? 0;
        if (
            yearOf(point.name) === yearOf(current) &&
            quarterOf(point.name) === quarterOf(current)
        ) {
            bucket.status = "in-progress";
        }
        buckets.set(id, bucket);
    }

    return [...buckets.values()].sort((a, b) => a.id.localeCompare(b.id));
};

export const benchmarks = (analytics: AgentAnalytics): Benchmark[] => [
    {
        id: "avg-price",
        label: "Average sale price",
        you: analytics.benchmarks.averagePrice,
        market: analytics.benchmarks.platformAveragePrice,
        unit: "usd",
        higherIsBetter: true,
    },
    {
        id: "days-to-close",
        label: "Days to close",
        you: analytics.benchmarks.daysToClose,
        market: analytics.benchmarks.platformDaysToClose,
        unit: "days",
        higherIsBetter: false,
    },
    {
        id: "sale-to-list",
        label: "Sale-to-list ratio",
        you: analytics.benchmarks.saleToList,
        market: analytics.benchmarks.platformSaleToList,
        unit: "percent",
        higherIsBetter: true,
    },
    {
        id: "rating",
        label: "Client rating",
        you: analytics.benchmarks.rating,
        market: analytics.benchmarks.platformRating,
        unit: "score",
        higherIsBetter: true,
    },
];

export const analyticsStats = (analytics: AgentAnalytics): StatDatum[] => [
    {
        id: "avg-price",
        label: "Avg sale price",
        value: analytics.production.averagePrice
            ? formatMillions(analytics.production.averagePrice, 2)
            : NO_VALUE,
        icon: TrendingUp,
        tone: "highlight",
    },
    {
        id: "days-to-close",
        label: "Days to close",
        value: analytics.benchmarks.daysToClose
            ? `${analytics.benchmarks.daysToClose}d`
            : NO_VALUE,
        icon: Clock,
        tone: "info",
    },
    {
        id: "volume",
        label: "Volume closed",
        value: analytics.production.volume
            ? formatUsd(analytics.production.volume)
            : NO_VALUE,
        icon: Gauge,
        tone: "accent",
    },
    {
        id: "rating",
        label: "Client rating",
        value: analytics.benchmarks.rating
            ? `${analytics.benchmarks.rating}/5`
            : NO_VALUE,
        icon: Award,
        tone: "success",
    },
];
