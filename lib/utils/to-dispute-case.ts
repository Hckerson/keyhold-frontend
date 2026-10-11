import type { DisputeCase, DisputeEvidenceItem } from "@/lib/types";
import type { Dispute, DisputeEvidence } from "@/lib/validations/dispute";
import type { Escrow } from "@/lib/validations/escrow";

const UNKNOWN_INITIATOR = "Unknown member";
const LINK = /^https?:\/\//i;

const EVIDENCE_LABELS: Record<DisputeEvidence["type"], string> = {
    MESSAGE: "Message",
    PHOTO: "Photo",
    DOCUMENT: "Document",
};

const fileOf = (url: string) => {
    try {
        const { hostname, pathname } = new URL(url);
        const file = pathname.split("/").filter(Boolean).pop();
        return file ? decodeURIComponent(file) : hostname;
    } catch {
        return url;
    }
};

const toEvidence = (item: DisputeEvidence): DisputeEvidenceItem => {
    const link = LINK.test(item.content);
    return {
        id: item.id,
        type: item.type,
        label: item.label ?? EVIDENCE_LABELS[item.type],
        text: link ? fileOf(item.content) : item.content,
        href: link ? item.content : null,
        addedAt: item.createdAt,
    };
};

export const toDisputeCase = (
    dispute: Dispute,
    holds: ReadonlyMap<string, Escrow> = new Map(),
): DisputeCase => ({
    id: dispute.id,
    title: dispute.title,
    claim: dispute.description,
    status: dispute.status,
    initiator: dispute.initiator?.fullName ?? UNKNOWN_INITIATOR,
    initiatorId: dispute.initiatorId,
    initiatorEmail: dispute.initiator?.email ?? null,
    openedAt: dispute.createdAt,
    decidedAt: dispute.resolvedAt,
    resolution: dispute.resolutionNotes,
    deals: dispute.transactions.map((transaction) => {
        const hold = transaction.escrowHoldId
            ? holds.get(transaction.escrowHoldId)
            : undefined;
        return {
            id: transaction.id,
            property: transaction.property.title,
            address: transaction.property.address,
            price: transaction.finalPrice,
            holdId: transaction.escrowHoldId,
            escrow: hold ? { amount: hold.amount, status: hold.status } : null,
            parties: hold?.transaction
                ? {
                      buyer: {
                          id: hold.transaction.buyer.id,
                          name: hold.transaction.buyer.fullName,
                      },
                      seller: {
                          id: hold.transaction.seller.id,
                          name: hold.transaction.seller.fullName,
                      },
                  }
                : null,
        };
    }),
    evidence: dispute.evidence.map(toEvidence),
});

export const toDisputeQueue = (
    disputes: Dispute[],
    holds: Escrow[] = [],
): DisputeCase[] => {
    const byId = new Map(holds.map((hold) => [hold.id, hold]));
    return disputes.map((dispute) => toDisputeCase(dispute, byId));
};
