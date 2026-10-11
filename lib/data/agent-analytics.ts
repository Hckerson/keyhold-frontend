import type {
    MonthlyProduction,
    ProductionSummary,
    QuarterStatus,
    QuarterSummary,
} from "@/lib/types";
import type { AgentAnalytics, GrowthPoint } from "@/lib/validations/stats";

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
