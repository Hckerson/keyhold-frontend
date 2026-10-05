import type { ChartTone } from "@/lib/config/chart-tones";

export interface BarDatum {
    label: string;
    value: number;
    display?: string;
    tone?: ChartTone;
}

export interface ColumnSeries {
    key: string;
    name: string;
    tone: ChartTone;
}

export interface DonutSegment {
    name: string;
    value: number;
    tone: ChartTone;
}
