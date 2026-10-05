import type { StatusTone } from "@/lib/types";
import type {
    DisputeEvidenceType,
    DisputeStatus as ApiDisputeStatus,
} from "@/lib/enums/enums";

export type DisputeStatus = ApiDisputeStatus;
export type DisputeFilterKey = "all" | DisputeStatus;
export type DisputeDecisionMode = "resolve" | "dismiss";

export interface DisputeEvidenceItem {
    id: string;
    type: DisputeEvidenceType;
    label: string;
    content: string;
}

export interface DisputedDeal {
    id: string;
    property: string;
    address: string;
    amount: number;
    escrowHoldId: string | null;
}

export interface DisputeCase {
    id: string;
    title: string;
    description: string;
    status: DisputeStatus;
    initiator: string;
    initiatorEmail: string;
    openedAt: string;
    waitingDays: number;
    resolvedAt: string | null;
    resolutionNotes: string | null;
    amountAtStake: number;
    evidence: DisputeEvidenceItem[];
    deals: DisputedDeal[];
}

export interface DisputeAction {
    label: string;
    destructive?: boolean;
    mode: DisputeDecisionMode;
}

export interface DisputeDecision {
    mode: DisputeDecisionMode;
    id: string;
}

export const disputeStatusMeta: Record<
    DisputeStatus,
    { tone: StatusTone; label: string; open: boolean }
> = {
    OPEN: { tone: "error", label: "Open", open: true },
    PENDING_REVIEW: { tone: "warning", label: "In review", open: true },
    RESOLVED: { tone: "success", label: "Resolved", open: false },
    DISMISSED: { tone: "neutral", label: "Dismissed", open: false },
};

export const evidenceMeta: Record<DisputeEvidenceType, { label: string }> = {
    MESSAGE: { label: "Message" },
    PHOTO: { label: "Photo" },
    DOCUMENT: { label: "Document" },
};

export const DISPUTE_FILTERS: { id: DisputeFilterKey; label: string }[] = [
    { id: "all", label: "All" },
    { id: "OPEN", label: "Open" },
    { id: "PENDING_REVIEW", label: "In review" },
    { id: "RESOLVED", label: "Resolved" },
    { id: "DISMISSED", label: "Dismissed" },
];

export const disputeActionsByStatus: Record<DisputeStatus, DisputeAction[]> = {
    OPEN: [
        { label: "Resolve in full", mode: "resolve" },
        { label: "Dismiss", destructive: true, mode: "dismiss" },
    ],
    PENDING_REVIEW: [
        { label: "Resolve in full", mode: "resolve" },
        { label: "Dismiss", destructive: true, mode: "dismiss" },
    ],
    RESOLVED: [],
    DISMISSED: [],
};

export const DISPUTE_DECISION_COPY: Record<
    DisputeDecisionMode,
    { title: string; label: string; placeholder: string; submit: string }
> = {
    resolve: {
        title: "Resolve this dispute",
        label: "How it was resolved",
        placeholder:
            "State the outcome and what happens to the money. Both parties keep this on the transaction record.",
        submit: "Resolve dispute",
    },
    dismiss: {
        title: "Dismiss this dispute",
        label: "Why it is being dismissed",
        placeholder:
            "Explain why no action is warranted. The person who raised it sees this.",
        submit: "Dismiss dispute",
    },
};

export const isOpenDispute = (dispute: DisputeCase) =>
    disputeStatusMeta[dispute.status].open;

export const rankDisputes = (disputes: DisputeCase[]) =>
    [...disputes].sort(
        (a, b) =>
            Number(isOpenDispute(b)) - Number(isOpenDispute(a)) ||
            b.amountAtStake - a.amountAtStake ||
            b.waitingDays - a.waitingDays,
    );

export const countDisputes = (disputes: DisputeCase[]) => {
    const counts: Record<DisputeFilterKey, number> = {
        all: disputes.length,
        OPEN: 0,
        PENDING_REVIEW: 0,
        RESOLVED: 0,
        DISMISSED: 0,
    };
    for (const dispute of disputes) counts[dispute.status] += 1;
    return counts;
};

export const filterDisputes = (
    disputes: DisputeCase[],
    filter: DisputeFilterKey,
) =>
    filter === "all"
        ? disputes
        : disputes.filter((dispute) => dispute.status === filter);
