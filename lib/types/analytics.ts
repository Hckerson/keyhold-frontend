import type { ChartMark, DonutSegment } from "./chart";

export type AnalyticsPanelId =
    | "pipeline"
    | "escrow"
    | "queues"
    | "status"
    | "tiers"
    | "markets";

export interface AnalyticsFigure {
    value: string;
    caption: string;
}

export type AnalyticsVisual =
    | { kind: "flow"; stages: ChartMark[]; aside?: ChartMark }
    | { kind: "treemap"; tiles: ChartMark[] }
    | { kind: "waffle"; segments: DonutSegment[] }
    | {
          kind: "donut";
          segments: DonutSegment[];
          total: string;
          unit: string;
      }
    | { kind: "figure"; figure: AnalyticsFigure };

export interface AnalyticsPanelData {
    reading?: string;
    visual: AnalyticsVisual;
}

export type AnalyticsSnapshot = Record<AnalyticsPanelId, AnalyticsPanelData>;

export interface AnalyticsPanelMeta {
    id: AnalyticsPanelId;
    title: string;
    action: string;
    href: string;
}
