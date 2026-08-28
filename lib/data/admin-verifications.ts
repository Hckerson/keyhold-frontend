import { CheckCircle2, Clock3, XCircle, type LucideIcon } from "lucide-react";
import type { BadgeTone } from "@/lib/types";
import type { VerificationStatus as ApiVerificationStatus } from "@/lib/enums/enums";

export type VerificationStatus = ApiVerificationStatus;
export type VerificationFilterKey = "all" | VerificationStatus;
export type DocumentState = "verified" | "review" | "missing";
export type VerificationDecisionMode = "reject";
export type VerificationActionMode = VerificationDecisionMode | "approve";

export interface VerificationDocument {
    label: string;
    detail: string;
    state: DocumentState;
    url: string | null;
}

export interface VerificationRequest {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    agency: string;
    documentType: string;
    documentNumber: string;
    issuerCountry: string;
    status: VerificationStatus;
    submittedDate: string;
    waitingDays: number;
    memberSince: string;
    documents: VerificationDocument[];
    note?: string;
    noteKind?: VerificationDecisionMode;
}

export interface VerificationAction {
    label: string;
    variant: "primary" | "secondary" | "ghost" | "outline-danger";
    mode: VerificationActionMode;
}

export interface VerificationDecision {
    mode: VerificationDecisionMode;
    id: string;
}

export const statusMeta: Record<
    VerificationStatus,
    { tone: BadgeTone; label: string }
> = {
    PENDING: { tone: "warning", label: "Pending" },
    VERIFIED: { tone: "success", label: "Verified" },
    REJECTED: { tone: "error", label: "Rejected" },
};

export const documentMeta: Record<
    DocumentState,
    { icon: LucideIcon; cls: string; label: string }
> = {
    verified: { icon: CheckCircle2, cls: "text-success", label: "Verified" },
    review: { icon: Clock3, cls: "text-warning", label: "In review" },
    missing: { icon: XCircle, cls: "text-error", label: "Missing" },
};

export const noteMeta: Record<
    VerificationDecisionMode,
    { title: string; variant: "warning" | "error" }
> = {
    reject: { title: "Rejection reason", variant: "error" },
};

export const VERIFICATION_FILTERS: {
    id: VerificationFilterKey;
    label: string;
}[] = [
    { id: "all", label: "All" },
    { id: "PENDING", label: "Pending" },
    { id: "VERIFIED", label: "Verified" },
    { id: "REJECTED", label: "Rejected" },
];

export const actionsByStatus: Record<VerificationStatus, VerificationAction[]> =
    {
        PENDING: [
            { label: "Approve identity", variant: "primary", mode: "approve" },
            { label: "Reject", variant: "outline-danger", mode: "reject" },
        ],
        VERIFIED: [],
        REJECTED: [],
    };

export const DECISION_COPY: Record<
    VerificationDecisionMode,
    { title: string; label: string; placeholder: string; submit: string }
> = {
    reject: {
        title: "Reject verification",
        label: "Reason for rejection",
        placeholder:
            "Explain which requirement the document fails. This reason is stored with the submission and shown to the applicant.",
        submit: "Reject document",
    },
};
