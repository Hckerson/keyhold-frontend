import { Award, Clock, Gauge, TrendingUp, type LucideIcon } from "lucide-react";
import type { ChartTone } from "@/lib/config/chart-tones";
import type { Trend } from "@/lib/types";

export const ANALYTICS_PERIOD = "Jan – Jul 2024";
export const TARGET_MET_PCT = 100;
export const TARGET_NEAR_PCT = 85;

export interface ProductionSummary {
    label: string;
    volume: number;
    closings: number;
    change: string;
    trend: Trend;
}

export interface AnalyticsStat {
    id: string;
    label: string;
    value: string;
    icon: LucideIcon;
    tone: ChartTone;
}

export interface MonthlyProduction {
    id: string;
    month: string;
    closings: number;
    volume: number;
    target: number;
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

export const production: ProductionSummary = {
    label: "YTD production",
    volume: 42_300_000,
    closings: 15,
    change: "+12%",
    trend: "up",
};

export const analyticsStats: AnalyticsStat[] = [
    {
        id: "avg-price",
        label: "Avg sale price",
        value: "$2.82M",
        icon: TrendingUp,
        tone: "highlight",
    },
    {
        id: "days-to-close",
        label: "Days to close",
        value: "48d",
        icon: Clock,
        tone: "info",
    },
    {
        id: "attainment",
        label: "Target attainment",
        value: "97%",
        icon: Gauge,
        tone: "accent",
    },
    {
        id: "rating",
        label: "Client rating",
        value: "4.8/5",
        icon: Award,
        tone: "success",
    },
];

export const monthlyProduction: MonthlyProduction[] = [
    {
        id: "jan",
        month: "Jan",
        closings: 2,
        volume: 5_400_000,
        target: 5_000_000,
    },
    {
        id: "feb",
        month: "Feb",
        closings: 2,
        volume: 6_100_000,
        target: 5_500_000,
    },
    {
        id: "mar",
        month: "Mar",
        closings: 2,
        volume: 5_200_000,
        target: 6_000_000,
    },
    {
        id: "apr",
        month: "Apr",
        closings: 3,
        volume: 8_400_000,
        target: 6_500_000,
    },
    {
        id: "may",
        month: "May",
        closings: 2,
        volume: 5_900_000,
        target: 6_500_000,
    },
    {
        id: "jun",
        month: "Jun",
        closings: 3,
        volume: 8_600_000,
        target: 7_000_000,
    },
    {
        id: "jul",
        month: "Jul",
        closings: 1,
        volume: 2_700_000,
        target: 7_000_000,
    },
];

export const quarters: QuarterSummary[] = [
    {
        id: "q1",
        label: "Q1 2024",
        status: "complete",
        closings: 6,
        volume: 16_700_000,
    },
    {
        id: "q2",
        label: "Q2 2024",
        status: "complete",
        closings: 8,
        volume: 22_900_000,
    },
    {
        id: "q3",
        label: "Q3 2024",
        status: "in-progress",
        closings: 1,
        volume: 2_700_000,
    },
];

export const benchmarks: Benchmark[] = [
    {
        id: "avg-price",
        label: "Average sale price",
        you: 2_820_000,
        market: 2_150_000,
        unit: "usd",
        higherIsBetter: true,
    },
    {
        id: "days-on-market",
        label: "Days on market",
        you: 48,
        market: 56,
        unit: "days",
        higherIsBetter: false,
    },
    {
        id: "sale-to-list",
        label: "Sale-to-list ratio",
        you: 101.4,
        market: 98.2,
        unit: "percent",
        higherIsBetter: true,
    },
    {
        id: "rating",
        label: "Client rating",
        you: 4.8,
        market: 4.1,
        unit: "score",
        higherIsBetter: true,
    },
];
