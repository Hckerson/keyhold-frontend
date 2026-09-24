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
