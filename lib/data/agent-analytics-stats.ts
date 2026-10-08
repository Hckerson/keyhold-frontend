import { Award, Clock, Gauge, TrendingUp } from "lucide-react";
import type { Benchmark, StatDatum } from "@/lib/types";
import type { AgentAnalytics } from "@/lib/validations/stats";
import { formatMillions, formatUsd } from "@/lib/utils";

const NO_VALUE = "—";

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
        tone: "neutral",
    },
    {
        id: "days-to-close",
        label: "Days to close",
        value: analytics.benchmarks.daysToClose
            ? `${analytics.benchmarks.daysToClose}d`
            : NO_VALUE,
        icon: Clock,
        tone: "neutral",
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
        tone: "accent",
    },
];
