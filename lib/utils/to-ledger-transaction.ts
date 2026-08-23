import type {
    LedgerTransaction,
    TransactionMilestoneId,
} from "@/lib/types/transaction";
import type { SettlementTransaction } from "@/lib/validations/transaction";
import { minutesSince } from "@/lib/utils/elapsed";

const REFERENCE_LENGTH = 8;

const clearedOf = (
    transaction: SettlementTransaction,
): TransactionMilestoneId[] => {
    const cleared: TransactionMilestoneId[] = [];

    if (transaction.agreementDocUrl) cleared.push("agreement");
    if (transaction.escrowHold) cleared.push("deposit");
    if (
        transaction.escrowHold &&
        new Date(transaction.escrowHold.inspectionEndDate) <= new Date()
    ) {
        cleared.push("inspection");
    }
    if (transaction.escrowHold?.status === "RELEASED")
        cleared.push("settlement");

    return cleared;
};

export const toLedgerTransaction = (
    transaction: SettlementTransaction,
): LedgerTransaction => ({
    id: transaction.id,
    reference: transaction.id.slice(0, REFERENCE_LENGTH).toUpperCase(),
    property: transaction.property.address,
    buyer: transaction.buyer.fullName,
    agent: transaction.seller.fullName,
    price: transaction.finalPrice,
    status: transaction.status,
    cleared: clearedOf(transaction),
    initiatedDate: transaction.createdAt,
    completedDate: transaction.completedAt,
    ageMinutes: minutesSince(transaction.createdAt),
});

export const toLedger = (
    transactions: SettlementTransaction[],
): LedgerTransaction[] => transactions.map(toLedgerTransaction);
