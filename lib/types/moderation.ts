import type { FilterTileDatum } from "./ui";

export type ModerationStatus =
    | "flagged"
    | "pending"
    | "changes"
    | "approved"
    | "rejected";

export type CheckState = "pass" | "warn" | "fail";

export type ModerationStatusFilter = ModerationStatus | "all";

export type ComplianceCheckId = "photos" | "accuracy" | "licence";

export type ComplianceReport = Record<ComplianceCheckId, CheckState>;

export type DecisionMode = "changes" | "reject";

export interface ModerationAgent {
    name: string;
    email: string;
    phone: string | null;
}

export interface ModerationListing {
    id: string;
    listingId: string;
    title: string;
    address: string;
    locality: string;
    price: number;
    status: ModerationStatus;
    queuedMinutes: number;
    description: string;
    photos: string[];
    compliance: ComplianceReport;
    reports: number;
    agent: ModerationAgent;
    note?: string;
}

export interface ModerationDecision {
    mode: DecisionMode;
    ids: string[];
}

export interface ModerationTarget {
    flagId: string;
    listingId: string;
    flagActive: boolean;
}

export interface ModerationAgentLoad {
    id: string;
    name: string;
    email: string;
    submissions: number;
    open: number;
    reports: number;
}

export type ModerationStatusTile = FilterTileDatum<ModerationStatusFilter>;

export type CheckBreakdown = { id: ComplianceCheckId } & Record<
    CheckState,
    number
>;
