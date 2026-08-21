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

export type PayoutState =
    | "failed"
    | "review"
    | "approved"
    | "scheduled"
    | "released";

export type PayoutMethod = "wire" | "ach" | "instant";

export type RevenueStreamId =
    | "commission"
    | "fees"
    | "subscription"
    | "featured";

export interface Payout {
    id: string;
    recipient: string;
    deal: string;
    state: PayoutState;
    method: PayoutMethod;
    gross: number;
    ageMinutes: number;
    href: string;
}

export interface PayoutStage {
    id: PayoutState;
    count: number;
    amount: number;
    oldestMinutes: number;
}

export interface RevenueStream {
    id: RevenueStreamId;
    ytd: number;
    momChange: number;
}

export type PolicyDomain =
    | "moderation"
    | "access"
    | "payout"
    | "availability"
    | "platform";

export type PolicyEnforcement = "blocking" | "advisory";

export type PolicySwitchId =
    | "photo-scan"
    | "license-verification"
    | "high-value-review"
    | "repeat-rejection-suspend"
    | "maintenance-mode"
    | "open-signups"
    | "health-digest"
    | "payout-automation";

export type PolicyState = Record<PolicySwitchId, boolean>;

export interface PolicySwitch {
    id: PolicySwitchId;
    domain: PolicyDomain;
    title: string;
    caption: string;
    enforcement: PolicyEnforcement;
    reach: number;
}

export type MaintenanceRisk = "routine" | "elevated" | "destructive";

export interface MaintenanceOperation {
    id: string;
    label: string;
    caption: string;
    action: string;
    risk: MaintenanceRisk;
    lastRunMinutes: number;
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
