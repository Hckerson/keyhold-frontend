import { evidenceMeta, type DisputeCase } from "@/lib/data/admin-disputes";
import type { Dispute } from "@/lib/validations/dispute";
import { daysSince } from "@/lib/utils/elapsed";
import { sum } from "@/lib/utils";

const UNKNOWN_INITIATOR = "Unknown member";
const NO_EMAIL = "—";

export const toDisputeCase = (dispute: Dispute): DisputeCase => ({
    id: dispute.id,
    title: dispute.title,
    description: dispute.description,
    status: dispute.status,
    initiator: dispute.initiator?.fullName ?? UNKNOWN_INITIATOR,
    initiatorEmail: dispute.initiator?.email ?? NO_EMAIL,
    openedAt: dispute.createdAt,
    waitingDays: daysSince(dispute.createdAt),
    resolvedAt: dispute.resolvedAt,
    resolutionNotes: dispute.resolutionNotes,
    amountAtStake: sum(
        dispute.transactions.map((transaction) => transaction.finalPrice),
    ),
    evidence: dispute.evidence.map((item) => ({
        id: item.id,
        type: item.type,
        label: item.label ?? evidenceMeta[item.type].label,
        content: item.content,
    })),
    deals: dispute.transactions.map((transaction) => ({
        id: transaction.id,
        property: transaction.property.title,
        address: transaction.property.address,
        amount: transaction.finalPrice,
        escrowHoldId: transaction.escrowHoldId,
    })),
});

export const toDisputeQueue = (disputes: Dispute[]): DisputeCase[] =>
    disputes.map(toDisputeCase);
