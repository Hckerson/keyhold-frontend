import type { ColumnSeries } from "@/components/ui/charts/column-chart";
import type { MetricItem, Trend } from "@/lib/types/ui";

export type ReportMetricKey = "gmv" | "deals" | "users";

export type ReportSignalId =
    | "listings"
    | "transaction"
    | "audience"
    | "revenue"
    | "velocity";

export interface RegionMetric {
    region: string;
    listings: number;
    volume: number;
    avgPrice: number;
}

export interface RegionPerformance extends RegionMetric {
    rank: number;
    share: number;
}

export interface ReportSignal {
    id: ReportSignalId;
    value: string;
    caption: string;
    change: string;
    trend: Trend;
}

export interface ReportTrendMetric {
    id: ReportMetricKey;
    label: string;
    eyebrow: string;
    headline: string;
    change: string;
    trend: Trend;
    series: ColumnSeries[];
    divideBy: number;
    valuePrefix: string;
    valueSuffix: string;
    summary: MetricItem[];
}
