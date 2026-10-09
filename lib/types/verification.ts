import type { VerificationStatus } from "@/lib/enums/enums";

export type VerificationFilterKey = "all" | VerificationStatus;
export type VerificationDecisionMode = "reject";
export type VerificationActionMode = VerificationDecisionMode | "approve";

export interface VerificationRequest {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string | null;
    role: string | null;
    agency: string | null;
    licence: string | null;
    documentType: string;
    documentNumber: string;
    issuer: string;
    status: VerificationStatus;
    submittedAt: string;
    decidedAt: string | null;
    expiresAt: string | null;
    memberSince: string;
    documentUrl: string;
    faceUrl: string | null;
    reason: string | null;
}

export interface VerificationAction {
    label: string;
    destructive?: boolean;
    mode: VerificationActionMode;
}

export interface VerificationDecision {
    mode: VerificationDecisionMode;
    id: string;
}
