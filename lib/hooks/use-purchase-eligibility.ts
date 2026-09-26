"use client";

import { usePurchases } from "@/lib/hooks/use-transactions";
import type { TransactionStatus } from "@/lib/enums/enums";

const PAID_TRANSACTION_STATUSES: TransactionStatus[] = [
    "IN_PROGRESS",
    "COMPLETED",
];

interface PurchaseEligibilityInput {
    accepted: boolean;
    isBuyer: boolean;
    propertyId: string | undefined;
}

export function usePurchaseEligibility({
    accepted,
    isBuyer,
    propertyId,
}: PurchaseEligibilityInput) {
    const purchases = usePurchases(accepted && isBuyer);
    const alreadyPaid = (purchases.data ?? []).some(
        (purchase) =>
            purchase.propertyId === propertyId &&
            PAID_TRANSACTION_STATUSES.includes(purchase.status),
    );

    return accepted && isBuyer && !purchases.isPending && !alreadyPaid;
}
