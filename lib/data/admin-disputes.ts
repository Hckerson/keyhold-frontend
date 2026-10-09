import { DISPUTE_ACTIONS, DISPUTE_STATES } from "@/lib/config/dispute-tones";
import {
    byReviewOrder,
    reviewMoment,
    reviewReading,
} from "@/lib/data/review-queue";
import { resolveDisputeSchema } from "@/lib/validations/dispute";
import type {
    DisputeAction,
    DisputeCase,
    DisputeFilterKey,
    ReviewClock,
    ReviewQueueItem,
} from "@/lib/types";

const ALL: DisputeFilterKey = "all";
const OPEN: DisputeFilterKey = "open";
const READING = { open: "open", none: "No dispute is open" };

export const DISPUTE_COPY = {
    title: "Disputes",
    lede: "Claims raised on a deal. Each one freezes the deal's escrow until you decide where it goes",
    claimHeading: "Claim",
    stakeHeading: "At stake",
    partyHeading: "Parties",
    raisedIt: "raised it",
    evidenceHeading: "Evidence",
    noEvidence: "Nothing was attached to this dispute.",
    resolutionHeading: "Resolution",
    profile: "Open profile",
    emptyTitle: "Queue clear",
    emptyLede: "No disputes match this view.",
    noteHint:
        "Required, at least four characters. Both parties see it on the dispute record.",
} as const;

export const disputeClock = (dispute: DisputeCase): ReviewClock => ({
    open: DISPUTE_STATES[dispute.status].open,
    openedAt: dispute.openedAt,
    decidedAt: dispute.decidedAt,
});

const inView = (dispute: DisputeCase, filter: DisputeFilterKey) => {
    if (filter === ALL) return true;
    if (filter === OPEN) return disputeClock(dispute).open;
    return dispute.status === filter;
};

export const disputeCounts = (items: DisputeCase[]) => {
    const counts: Record<DisputeFilterKey, number> = {
        open: 0,
        RESOLVED: 0,
        DISMISSED: 0,
        all: items.length,
    };
    for (const item of items) {
        if (item.status === "RESOLVED" || item.status === "DISMISSED")
            counts[item.status] += 1;
        else counts.open += 1;
    }
    return counts;
};

export const disputesIn = (items: DisputeCase[], filter: DisputeFilterKey) =>
    items
        .filter((item) => inView(item, filter))
        .sort((a, b) => byReviewOrder(disputeClock(a), disputeClock(b)));

export const disputeReading = (items: DisputeCase[], now = new Date()) =>
    reviewReading(items.map(disputeClock), READING, now);

export const disputeQueueItems = (
    disputes: DisputeCase[],
    mixed: boolean,
    now = new Date(),
): ReviewQueueItem[] =>
    disputes.map((dispute) => ({
        id: dispute.id,
        title: dispute.title,
        caption: [dispute.initiator, dispute.deals[0]?.property]
            .filter(Boolean)
            .join(" · "),
        moment: reviewMoment(disputeClock(dispute), now),
        status:
            mixed && !disputeClock(dispute).open
                ? DISPUTE_STATES[dispute.status]
                : undefined,
    }));

export const disputeActions = (dispute: DisputeCase): DisputeAction[] => {
    if (!disputeClock(dispute).open) return [];
    return dispute.deals.some((deal) => deal.holdId)
        ? DISPUTE_ACTIONS.escrow
        : DISPUTE_ACTIONS.plain;
};

export const noteReady = (note: string) =>
    resolveDisputeSchema.shape.resolutionNotes.safeParse(note.trim()).success;
