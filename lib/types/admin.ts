import type { DotTone } from "@/components/patterns/status-dot";
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

export type DecisionLaneId = ModerationQueueId | "accounts";

export interface DecisionLane {
    id: DecisionLaneId;
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
    tone: DotTone;
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

export interface Payout {
    id: string;
    recipient: string;
    deal: string;
    state: PayoutState;
    gross: number;
    ageMinutes: number;
    inspectionEndsAt: string | null;
    href: string;
}

export interface PayoutStage {
    id: PayoutState;
    count: number;
    amount: number;
    oldestMinutes: number;
}

export type PolicyDomain =
    | "moderation"
    | "access"
    | "payout"
    | "availability"
    | "platform";

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
    domain: PolicyDomain;
    title: string;
    caption: string;
    enforcement: PolicyEnforcement;
    reach: number;
}

export interface ConfigChange {
    id: string;
    actor: string;
    role: string;
    field: string;
    from: string;
    to: string;
    ageMinutes: number;
}
