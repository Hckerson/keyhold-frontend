import type { MonthDelta } from "@/lib/types/admin";

export type ReportMeasureId =
    | "gmv"
    | "deals"
    | "average"
    | "commission"
    | "listings"
    | "members";

export interface RegionMetric {
    region: string;
    listings: number;
    volume: number;
    avgPrice: number;
}

export interface ReportMarket extends RegionMetric {
    share: number;
}

export type ReportGrain = "day" | "month";

export interface ReportMonth {
    key: string;
    grain: ReportGrain;
    short: string;
    year: string;
    name: string;
    label: string;
    tick: string;
    gmv: number;
    deals: number;
    listings: number;
    members: number;
    partial: boolean;
}

export interface ReportMeasure {
    id: ReportMeasureId;
    label: string;
    total: string;
    latest: string | null;
    delta: MonthDelta | null;
    against: string | null;
}
