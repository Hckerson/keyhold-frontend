export type SignalSeverity = "critical" | "elevated" | "routine";

export type SignalDomain =
    | "verification"
    | "moderation"
    | "transaction"
    | "payout"
    | "infrastructure";

export type ModerationQueueId =
    | "verifications"
    | "listings"
    | "flags"
    | "disputes";

export type ServiceState = "operational" | "degraded" | "down";

export interface PlatformSignal {
    id: string;
    severity: SignalSeverity;
    domain: SignalDomain;
    title: string;
    subject: string;
    exposure?: number;
    ageMinutes: number;
    href: string;
}

export interface ModerationQueueLoad {
    id: ModerationQueueId;
    backlog: number;
    capacity: number;
    oldestMinutes: number;
}

export interface ServiceHealth {
    id: string;
    label: string;
    state: ServiceState;
    uptime: number;
    errorRate: number;
    latencyMs: number;
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

export type PolicySwitchId = "maintenance-mode" | "open-signups";

export type PolicyState = Record<PolicySwitchId, boolean>;

export interface PolicySwitch {
    id: PolicySwitchId;
    domain: PolicyDomain;
    title: string;
    caption: string;
    enforcement: PolicyEnforcement;
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
