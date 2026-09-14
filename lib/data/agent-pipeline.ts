import { DEAL_STAGES } from "@/lib/config/deal-stages";
import type { Deal, DealStage } from "@/lib/types/deal";

export const DEAL_DRAG_TYPE = "application/x-deal-id";

export type DealMove =
    | { kind: "accept"; offerId: string; note: string }
    | { kind: "decline"; offerId: string; note: string }
    | { kind: "refused"; reason: string };

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
        return {
            kind: "accept",
            offerId: deal.openOfferId,
            note: `Offer accepted. ${deal.buyer} opens the transaction next.`,
        };

    if (target === "leads")
        return {
            kind: "decline",
            offerId: deal.openOfferId,
            note: `Offer declined. ${deal.buyer} returns to your lead desk.`,
        };

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
