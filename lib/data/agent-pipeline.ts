import { DEAL_STAGES } from "@/lib/config/deal-stages";
import type { OfferStatus } from "@/lib/enums/enums";
import type { Deal, DealStage } from "@/lib/types/deal";

export const DEAL_DRAG_TYPE = "application/x-deal-id";

export type DealDecision = "accept" | "decline";

export type DealMove =
    | { kind: DealDecision; offerId: string }
    | { kind: "refused"; reason: string };

export const DEAL_DECISION_STATUS = {
    accept: "ACCEPTED",
    decline: "REJECTED",
} as const satisfies Record<DealDecision, OfferStatus>;

export const DEAL_DECISION_COPY = {
    accept: {
        title: "Accept this offer",
        warning: {
            title: "Accepting is binding",
            body: "The sale moves to pending and every other open offer on this listing is closed. The buyer opens the transaction next.",
        },
        failure: {
            title: "The offer was not accepted",
            body: "Nothing changed and the offer is still open. Try again in a moment.",
        },
        cancel: "Not yet",
        confirm: "Accept offer",
    },
    decline: {
        title: "Decline this offer",
        warning: {
            title: "Declining is final",
            body: "The buyer is told the offer was declined and it cannot be reopened. They return to your lead desk.",
        },
        failure: {
            title: "The offer was not declined",
            body: "Nothing changed and the offer is still open. Try again in a moment.",
        },
        cancel: "Keep it open",
        confirm: "Decline offer",
    },
} as const;

const labelOf = (stage: DealStage) =>
    DEAL_STAGES.find((item) => item.id === stage)?.label ?? stage;

const ANSWERED =
    "That offer has already been answered — there is nothing left to decide here.";
const SKIP = "Stages cannot be skipped. Move the deal one column at a time.";
const CLOSED_FINAL = "Closed deals are final and cannot be reopened here.";
const TRANSACTION_OPEN =
    "An open transaction cannot be moved back from this board.";

const fromOffers = (deal: Deal, target: DealStage): DealMove => {
    if (!deal.openOfferId) return { kind: "refused", reason: ANSWERED };

    if (target === "pending")
        return { kind: "accept", offerId: deal.openOfferId };

    if (target === "leads")
        return { kind: "decline", offerId: deal.openOfferId };

    return {
        kind: "refused",
        reason: `A deal reaches ${labelOf("closed")} when its transaction completes.`,
    };
};

export const dealMove = (deal: Deal, target: DealStage): DealMove => {
    if (deal.stage === target)
        return {
            kind: "refused",
            reason: `This deal is already in ${labelOf(target)}.`,
        };

    if (deal.stage === "closed")
        return { kind: "refused", reason: CLOSED_FINAL };

    if (deal.stage === "pending")
        return {
            kind: "refused",
            reason:
                target === "closed"
                    ? `${deal.buyer} completes payment to close this deal.`
                    : TRANSACTION_OPEN,
        };

    if (deal.stage === "offers") return fromOffers(deal, target);

    return {
        kind: "refused",
        reason:
            target === "offers"
                ? `Only ${deal.buyer} can submit an offer on this property.`
                : SKIP,
    };
};
