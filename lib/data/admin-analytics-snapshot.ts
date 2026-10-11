import { ageTone, MODERATION_QUEUES } from "@/lib/config/admin-tones";
import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import { USER_STATUSES } from "@/lib/config/user-tones";
import type { ChartTone } from "@/lib/config/chart-tones";
import { escrowCountLabel, escrowPosition } from "@/lib/data/admin-payments";
import {
    formatAge,
    formatCompactUsd,
    formatCount,
    formatCountOf,
    percentOf,
    sum,
} from "@/lib/utils";
import type {
    ChartMark,
    DealFlowStage,
    DecisionLane,
    DonutSegment,
    PayoutStage,
    ReportMarket,
} from "@/lib/types";
import type { PlatformStats, UserStats } from "@/lib/validations/stats";

const ACCOUNT_STATES = ["active", "pending", "suspended"] as const;
const OFF_RAMP = "CANCELLED";
const NO_DEALS_IN_FLIGHT = "No deals in flight";
const NOTHING_HELD = "Nothing held in escrow";
const QUEUE_CLEAR = "Clear";
const UNKNOWN_AGE = "—";
const DEAL_NOUN = "deal";
const HOLD_NOUN = "hold";
const TIER_NOUN = "tier";
const LISTING_NOUN = "listing";

const queueTone = (lane: DecisionLane): ChartTone => {
    if (lane.backlog === 0) return "neutral";
    if (lane.oldestMinutes !== null && ageTone(lane.oldestMinutes) === "error")
        return "error";
    return "accent";
};

const toStageMark = (stage: DealFlowStage): ChartMark => ({
    id: stage.id,
    label: stage.label,
    value: stage.count,
    display: formatCount(stage.count),
    caption: stage.volume > 0 ? formatCompactUsd(stage.volume) : undefined,
    tone: stage.tone,
});

export const pipelineFlow = (flow: DealFlowStage[]) => {
    const offRamp = flow.find((stage) => stage.id === OFF_RAMP);

    return {
        stages: flow.filter((stage) => stage.id !== OFF_RAMP).map(toStageMark),
        aside: offRamp && {
            ...toStageMark(offRamp),
            display: formatCountOf(offRamp.count, DEAL_NOUN),
        },
    };
};

export const pipelineReading = (
    flow: DealFlowStage[],
    platform: PlatformStats | undefined,
) => {
    const open = flow.filter((stage) => stage.open);
    const count = sum(open.map((stage) => stage.count));
    const inFlight =
        count === 0
            ? NO_DEALS_IN_FLIGHT
            : `${formatCountOf(count, DEAL_NOUN)} in flight worth ${formatCompactUsd(sum(open.map((stage) => stage.volume)))}`;

    if (!platform?.connections) return inFlight;
    return `${percentOf(platform.transactions, platform.connections)}% of enquiries became deals · ${inFlight}`;
};

export const escrowTiles = (stages: PayoutStage[]): ChartMark[] =>
    stages.map((stage) => ({
        id: stage.id,
        label: PAYOUT_STATES[stage.id].label,
        value: stage.amount,
        display: formatCompactUsd(stage.amount),
        caption: escrowCountLabel(stage),
        tone: PAYOUT_STATES[stage.id].chartTone,
    }));

export const escrowReading = (stages: PayoutStage[]) => {
    const { held, holds } = escrowPosition(stages);
    if (holds === 0) return NOTHING_HELD;

    return `${formatCompactUsd(held)} still held across ${formatCountOf(holds, HOLD_NOUN)}`;
};

export const queueSegments = (lanes: DecisionLane[]): DonutSegment[] =>
    lanes.map((lane) => ({
        name: MODERATION_QUEUES[lane.id].label,
        value: lane.backlog,
        tone: queueTone(lane),
        detail:
            lane.backlog === 0
                ? QUEUE_CLEAR
                : lane.oldestMinutes === null
                  ? UNKNOWN_AGE
                  : formatAge(lane.oldestMinutes),
    }));

export const statusSegments = (users: UserStats | undefined): DonutSegment[] =>
    ACCOUNT_STATES.map((status) => ({
        name: USER_STATUSES[status].label,
        value: users?.[status] ?? 0,
        tone: USER_STATUSES[status].chartTone,
    }));

export const tierReading = (segments: DonutSegment[]) =>
    `${formatCount(sum(segments.map((segment) => segment.value)))} members across ${formatCountOf(segments.length, TIER_NOUN)}`;

export const marketTiles = (markets: ReportMarket[]): ChartMark[] =>
    markets.map((market) => ({
        id: market.region,
        label: market.region,
        value: market.volume,
        display: formatCompactUsd(market.volume),
        caption: `${market.share}% · ${formatCountOf(market.listings, LISTING_NOUN)}`,
        tone: "accent",
    }));
