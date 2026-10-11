import type { DisputeStatus } from "@/lib/enums/enums";
import type {
    DisputeAction,
    DisputeDecisionCopy,
    DisputeDecisionMode,
    DisputeFilterKey,
    FilterPill,
    StatusTone,
} from "@/lib/types";

export const DISPUTE_STATES: Record<
    DisputeStatus,
    { tone: StatusTone; label: string; open: boolean }
> = {
    OPEN: { tone: "warning", label: "New", open: true },
    PENDING_REVIEW: { tone: "warning", label: "In review", open: true },
    RESOLVED: { tone: "success", label: "Resolved", open: false },
    DISMISSED: { tone: "neutral", label: "Dismissed", open: false },
};

export const DEFAULT_DISPUTE_FILTER: DisputeFilterKey = "open";

export const DISPUTE_FILTERS: readonly FilterPill<DisputeFilterKey>[] = [
    { id: "open", label: "Open" },
    { id: "RESOLVED", label: "Resolved" },
    { id: "DISMISSED", label: "Dismissed" },
    { id: "all", label: "All" },
];

const DISMISS: DisputeAction = {
    label: "Dismiss",
    mode: "dismiss",
    emphasis: "quiet",
};

export const DISPUTE_ACTIONS = {
    escrow: [
        DISMISS,
        { label: "Release to seller", mode: "release", emphasis: "outline" },
        { label: "Refund buyer", mode: "refund", emphasis: "outline" },
    ],
    plain: [
        DISMISS,
        { label: "Resolve", mode: "resolve", emphasis: "outline" },
    ],
} satisfies Record<string, DisputeAction[]>;

export const DISPUTE_DECISION_COPY: Record<
    DisputeDecisionMode,
    DisputeDecisionCopy
> = {
    release: {
        title: "Release the escrow to the seller",
        label: "Why the seller keeps the funds",
        placeholder:
            "State what you found and why the deal stands. Both parties keep this on the dispute record.",
        submit: "Release funds",
        warning: {
            title: "The frozen escrow is paid out to the seller",
            body: "The dispute closes as resolved and the money leaves escrow. This cannot be undone.",
        },
        outcome: "RELEASE",
        payout: { verb: "Release", to: "seller" },
    },
    refund: {
        title: "Refund the buyer",
        label: "Why the buyer is refunded",
        placeholder:
            "State what you found and why the buyer gets their money back. Both parties keep this on the dispute record.",
        submit: "Refund buyer",
        warning: {
            title: "The frozen escrow is returned to the buyer",
            body: "The dispute closes as resolved and the money leaves escrow. This cannot be undone.",
        },
        outcome: "REFUND",
        payout: { verb: "Refund", to: "buyer" },
    },
    resolve: {
        title: "Resolve this dispute",
        label: "How it was resolved",
        placeholder:
            "State the outcome. Both parties keep this on the dispute record.",
        submit: "Resolve dispute",
        warning: {
            title: "This decision is final",
            body: "No escrow is attached, so no money moves. The dispute closes as resolved and cannot be reopened.",
        },
        outcome: "RELEASE",
    },
    dismiss: {
        title: "Dismiss this dispute",
        label: "Why no action is warranted",
        placeholder:
            "Explain why the claim does not hold. The person who raised it sees this.",
        submit: "Dismiss dispute",
        warning: {
            title: "Any frozen escrow goes back on hold",
            body: "The dispute closes with no action and the deal carries on as before. This cannot be reopened.",
        },
    },
};
