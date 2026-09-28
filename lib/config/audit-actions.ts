import type { DotTone } from "@/components/patterns/status-dot";
import type { AuditActionType } from "@/lib/enums/enums";

export interface AuditActionMeta {
    label: string;
    tone: DotTone;
}

export const AUDIT_ACTIONS: Record<AuditActionType, AuditActionMeta> = {
    USER_CREATED: { label: "Account created", tone: "success" },
    USER_UPDATED: { label: "Account updated", tone: "neutral" },
    USER_DELETED: { label: "Account deleted", tone: "error" },
    USER_SUSPENDED: { label: "Account suspended", tone: "warning" },
    PROPERTY_CREATED: { label: "Listing created", tone: "success" },
    PROPERTY_UPDATED: { label: "Listing updated", tone: "neutral" },
    PROPERTY_DELETED: { label: "Listing deleted", tone: "error" },
    PROPERTY_FLAGGED: { label: "Listing flagged", tone: "warning" },
    TRANSACTION_CREATED: { label: "Deal opened", tone: "info" },
    TRANSACTION_UPDATED: { label: "Deal updated", tone: "neutral" },
    TRANSACTION_COMPLETED: { label: "Deal settled", tone: "success" },
    OFFER_CREATED: { label: "Offer made", tone: "info" },
    OFFER_ACCEPTED: { label: "Offer accepted", tone: "success" },
    DISPUTE_CREATED: { label: "Dispute raised", tone: "warning" },
    DISPUTE_RESOLVED: { label: "Dispute resolved", tone: "success" },
    LOGIN: { label: "Signed in", tone: "neutral" },
    LOGOUT: { label: "Signed out", tone: "neutral" },
    LOGIN_SUCCEEDED: { label: "Signed in", tone: "neutral" },
    LOGIN_FAILED: { label: "Sign-in failed", tone: "error" },
    PERMISSION_DENIED: { label: "Access denied", tone: "error" },
    SETTINGS_UPDATED: { label: "Settings changed", tone: "info" },
};

export const SECURITY_ACTIONS: AuditActionType[] = [
    "LOGIN_FAILED",
    "PERMISSION_DENIED",
];

export const AUDIT_SUBJECTS: Partial<Record<string, string>> = {
    AUTH: "Sign-in",
    CONNECTION: "Inquiry",
    DISPUTE: "Dispute",
    ESCROW: "Escrow",
    FLAG: "Flag",
    KYC: "Verification",
    MESSAGE: "Message",
    OFFER: "Offer",
    PROPERTY: "Listing",
    REVIEW: "Review",
    SETTING: "Settings",
    SUSPENSION: "Suspension",
    TRANSACTION: "Deal",
    USER: "Account",
    VIEWING: "Viewing",
    UNKNOWN: "System",
};
