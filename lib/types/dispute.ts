import type {
    DisputeEvidenceType,
    DisputeOutcome,
    DisputeStatus,
    EscrowStatus,
} from "@/lib/enums/enums";

export type DisputeFilterKey = "open" | "RESOLVED" | "DISMISSED" | "all";
export type DisputeDecisionMode = "release" | "refund" | "resolve" | "dismiss";

export interface DisputeEvidenceItem {
    id: string;
    type: DisputeEvidenceType;
    label: string;
    text: string;
    href: string | null;
    addedAt: string;
}

export interface DisputedDeal {
    id: string;
    property: string;
    address: string;
    price: number;
    holdId: string | null;
    escrow: { amount: number; status: EscrowStatus } | null;
}

export interface DisputeCase {
    id: string;
    title: string;
    claim: string;
    status: DisputeStatus;
    initiator: string;
    initiatorId: string;
    initiatorEmail: string | null;
    openedAt: string;
    decidedAt: string | null;
    resolution: string | null;
    deals: DisputedDeal[];
    evidence: DisputeEvidenceItem[];
}

export interface DisputeAction {
    label: string;
    mode: DisputeDecisionMode;
    emphasis: "quiet" | "outline";
}

export interface DisputeDecision {
    mode: DisputeDecisionMode;
    id: string;
}

export interface DisputeDecisionCopy {
    title: string;
    label: string;
    placeholder: string;
    submit: string;
    warning: { title: string; body: string };
    outcome?: DisputeOutcome;
}
