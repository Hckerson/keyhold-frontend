import type { StatusTone } from "./ui";
import type { Trend } from "@/lib/types/ui";

export type ModerationQueueId =
    | "verifications"
    | "listings"
    | "flags"
    | "disputes";

export type ServiceState = "operational" | "degraded" | "down";

export interface ModerationQueueLoad {
    id: ModerationQueueId;
    backlog: number;
    oldestMinutes: number;
}

export type QueueReadiness = "pending" | "error" | "ready";

export interface DecisionLane {
    id: ModerationQueueId;
    backlog: number;
    oldestMinutes: number | null;
    share: number;
}

export interface SystemsReading {
    figure: string;
    belowSlo: boolean;
    reading: string;
}

export interface MonthDelta {
    label: string;
    direction: Trend;
}

export interface BusinessFigure {
    id: "members" | "listings" | "deals";
    label: string;
    href: string;
    latest: string;
    delta: MonthDelta | null;
    points: number[];
    total: string;
    ratio: { percent: number; label: string };
}

export interface LifetimeVolume {
    settled: string;
    averageDeal: string | null;
}

export interface AuditEvent {
    id: string;
    action: string;
    tone: StatusTone;
    security: boolean;
    actor: string;
    initials: string;
    subject: string;
    ageMinutes: number;
}

export interface ServiceHealth {
    id: string;
    label: string;
    state: ServiceState;
    uptime: number;
    errorRate: number;
    latencyMs: number;
    latencyP95: number;
    latencyP99: number;
}

export type PayoutState = "HELD" | "RELEASED" | "REFUNDED" | "DISPUTED";

export type PayoutPhase =
    | "disputed"
    | "ready"
    | "inspecting"
    | "paid"
    | "refunded";

export interface Payout {
    id: string;
    recipient: string;
    deal: string;
    locality: string;
    buyer: string;
    state: PayoutState;
    gross: number;
    ageMinutes: number;
    inspectionEndsAt: string | null;
    settledAt: string | null;
    href: string;
}

export interface PayoutConfigOptions {
    onSettle: (payout: Payout) => void;
    now?: Date;
}

export interface PayoutStage {
    id: PayoutState;
    count: number;
    amount: number;
    oldestMinutes: number;
}

export type PolicyEnforcement = "blocking" | "advisory";

export type PolicyGroup = "moderation" | "operations";

export type PolicySwitchId =
    | "photo-scanning"
    | "agent-license-verification"
    | "manual-review-threshold"
    | "auto-suspend-repeat-rejections"
    | "maintenance-mode"
    | "open-signups"
    | "daily-health-digest"
    | "payout-automation";

export type PolicyState = Record<PolicySwitchId, boolean>;

export interface PolicySwitch {
    id: PolicySwitchId;
    group: PolicyGroup;
    title: string;
    caption: string;
    enforcement: PolicyEnforcement;
    warnOn?: string;
    warnOff?: string;
}

export interface EscrowPosition {
    held: number;
    holds: number;
    fee: number;
    net: number;
}

export type PayoutStepState = "done" | "current" | "waiting" | "blocked";

export interface PayoutStep {
    id: "escrow" | "inspection" | "release";
    label: string;
    detail: string;
    state: PayoutStepState;
}
