import {
    escrowReading,
    escrowTiles,
    marketTiles,
    pipelineFlow,
    pipelineReading,
    queueSegments,
    statusSegments,
    tierReading,
} from "@/lib/data/admin-analytics-snapshot";
import { openDecisions } from "@/lib/data/admin-overview-triage";
import { marketLine, membersReading } from "@/lib/data/admin-reports-audience";
import { NO_READING } from "@/lib/constants";
import { formatCompactUsd, formatCount } from "@/lib/utils";
import type {
    AnalyticsPanelData,
    AnalyticsSnapshot,
    DealFlowStage,
    DecisionLane,
    DonutSegment,
    PayoutStage,
    ReportMarket,
} from "@/lib/types";
import type { PlatformStats, UserStats } from "@/lib/validations/stats";

const MARKETS_READING = "Settled volume by region, all time";
const SOLE_MARKET = "all settled volume";
const NO_MARKETS = "No region has settled volume yet";
const OPEN_UNIT = "open";

export interface SnapshotSources {
    flow: DealFlowStage[];
    platform: PlatformStats | undefined;
    escrow: PayoutStage[];
    lanes: DecisionLane[];
    queueReading: string;
    users: UserStats | undefined;
    tiers: DonutSegment[];
    markets: ReportMarket[];
}

const marketsPanel = (markets: ReportMarket[]): AnalyticsPanelData => {
    const [sole] = markets;
    if (markets.length > 1) {
        return {
            reading: MARKETS_READING,
            visual: { kind: "treemap", tiles: marketTiles(markets) },
        };
    }

    return {
        reading: MARKETS_READING,
        visual: {
            kind: "figure",
            figure: sole
                ? {
                      value: formatCompactUsd(sole.volume),
                      caption: `${sole.region} holds ${SOLE_MARKET} · ${marketLine(sole)}`,
                  }
                : { value: NO_READING, caption: NO_MARKETS },
        },
    };
};

export const analyticsSnapshot = (
    sources: SnapshotSources,
): AnalyticsSnapshot => ({
    pipeline: {
        reading: pipelineReading(sources.flow, sources.platform),
        visual: { kind: "flow", ...pipelineFlow(sources.flow) },
    },
    escrow: {
        reading: escrowReading(sources.escrow),
        visual: { kind: "treemap", tiles: escrowTiles(sources.escrow) },
    },
    queues: {
        reading: sources.queueReading,
        visual: {
            kind: "donut",
            segments: queueSegments(sources.lanes),
            total: formatCount(openDecisions(sources.lanes)),
            unit: OPEN_UNIT,
        },
    },
    status: {
        reading: membersReading(sources.users),
        visual: { kind: "waffle", segments: statusSegments(sources.users) },
    },
    tiers: {
        reading: tierReading(sources.tiers),
        visual: { kind: "waffle", segments: sources.tiers },
    },
    markets: marketsPanel(sources.markets),
});
