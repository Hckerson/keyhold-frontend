import type { Trend } from "@/lib/types/ui";

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
