import type { ChartTone } from "@/lib/config/chart-tones";

export interface ColumnSeries {
    key: string;
    name: string;
    tone: ChartTone;
}

export interface DonutSegment {
    name: string;
    value: number;
    tone: ChartTone;
    detail?: string;
}

export interface ChartMark {
    id: string;
    label: string;
    value: number;
    display: string;
    caption?: string;
    tone: ChartTone;
}

export interface ChartLegendItem {
    name: string;
    tone: ChartTone;
    value: string;
    detail: string;
    quiet?: boolean;
}
