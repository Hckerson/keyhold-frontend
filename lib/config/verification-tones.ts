import type { VerificationStatus } from "@/lib/enums/enums";
import { rejectKycSchema } from "@/lib/validations/kyc";
import type {
    FilterPill,
    StatusTone,
    VerificationAction,
    VerificationDecisionMode,
    VerificationFilterKey,
} from "@/lib/types";

export const VERIFICATION_STATES: Record<
    VerificationStatus,
    { tone: StatusTone; label: string }
> = {
    PENDING: { tone: "warning", label: "Pending" },
    VERIFIED: { tone: "success", label: "Verified" },
    REJECTED: { tone: "neutral", label: "Rejected" },
};

export const DEFAULT_VERIFICATION_FILTER: VerificationFilterKey = "PENDING";

export const VERIFICATION_FILTERS: readonly FilterPill<VerificationFilterKey>[] =
    [
        { id: "PENDING", label: "Pending" },
        { id: "VERIFIED", label: "Verified" },
        { id: "REJECTED", label: "Rejected" },
        { id: "all", label: "All" },
    ];

export const VERIFICATION_ACTIONS: Record<
    VerificationStatus,
    VerificationAction[]
> = {
    PENDING: [
        { label: "Reject", destructive: true, mode: "reject" },
        { label: "Approve identity", mode: "approve" },
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

export const isRejectionReady = (note: string) =>
    rejectKycSchema.safeParse({ rejectionReason: note.trim() }).success;
