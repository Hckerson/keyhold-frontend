import type { ChartTone } from "@/lib/config/chart-tones";
import type { LeadStage } from "@/lib/types/lead";

export interface PipelineSummary {
    label: string;
    value: number;
    dealCount: number;
    href: string;
}

export interface PipelineStage {
    id: string;
    name: string;
    count: number;
    value: number;
    tone: ChartTone;
}

export interface ClosedSale {
    id: string;
    address: string;
    price: number;
    closedOn: string;
    overAskPct: number;
    days: number;
}

export type ShowingTiming = "today" | "tomorrow" | "later";

export interface UpcomingShowing {
    id: string;
    address: string;
    client: string;
    when: string;
    timing: ShowingTiming;
}

export interface RecentLead {
    id: string;
    name: string;
    listingPrice: number;
    stage: LeadStage;
    received: string;
}
