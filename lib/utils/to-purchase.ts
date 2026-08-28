import type { Purchase } from "@/lib/types/purchase";
import type { Transaction } from "@/lib/validations/transaction";

export const toPurchase = (transaction: Transaction): Purchase => ({
    id: transaction.id,
    listingId: transaction.propertyId,
    address: transaction.property?.address ?? "",
    locality: transaction.property?.locality ?? "",
    photo: transaction.property?.images?.[0]?.url ?? null,
    price: transaction.finalPrice,
    status: transaction.status,
    seller: transaction.seller?.fullName ?? "",
    sellerPortrait: transaction.seller?.avatar ?? null,
    escrowId: transaction.escrowHold?.id ?? transaction.escrowHoldId ?? null,
    escrowStatus: transaction.escrowHold?.status ?? null,
    escrowAmount: transaction.escrowHold?.amount ?? null,
    inspectionEndsAt: transaction.escrowHold?.inspectionEndDate ?? null,
    agreementUrl: transaction.agreementDocUrl,
    disputeId: transaction.disputeId ?? null,
    startedAt: transaction.createdAt,
    completedAt: transaction.completedAt,
});

export const toPurchases = (transactions: Transaction[]): Purchase[] =>
    transactions.map(toPurchase);
