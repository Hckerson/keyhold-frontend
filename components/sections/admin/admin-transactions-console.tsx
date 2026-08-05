"use client";

import { useCallback, useMemo, useState } from "react";
import { TransactionReviewModal } from "@/components/features/admin/transaction-review-modal";
import { AdminTransactionsHeader } from "@/components/sections/admin/admin-transactions-header";
import { AdminTransactionsMain } from "@/components/sections/admin/admin-transactions-main";
import { AdminTransactionsRail } from "@/components/sections/admin/admin-transactions-rail";
import { AdminTransactionsStatBand } from "@/components/sections/admin/admin-transactions-stat-band";
import {
    LEDGER_TRANSACTIONS,
    matchesTransactionFilters,
    TRANSACTIONS,
    TRANSACTIONS_SUMMARY,
    TRANSACTION_STATS,
    type TransactionFinancingFilter,
    type TransactionStatusFilter,
} from "@/lib/data/admin-transactions";

const EVERY_STATUS: TransactionStatusFilter = "all";
const EVERY_FINANCING: TransactionFinancingFilter = "all";

export function AdminTransactionsConsole() {
    const [statusFilter, setStatusFilter] =
        useState<TransactionStatusFilter>(EVERY_STATUS);
    const [financingFilter, setFinancingFilter] =
        useState<TransactionFinancingFilter>(EVERY_FINANCING);
    const [reviewId, setReviewId] = useState<string | null>(null);

    const visible = useMemo(
        () =>
            LEDGER_TRANSACTIONS.filter((transaction) =>
                matchesTransactionFilters(
                    transaction,
                    statusFilter,
                    financingFilter,
                ),
            ),
        [statusFilter, financingFilter],
    );

    const onOpen = useCallback((id: string) => setReviewId(id), []);

    const onCloseReview = useCallback(() => setReviewId(null), []);

    return (
        <div className="flex flex-col gap-4">
            <AdminTransactionsHeader summary={TRANSACTIONS_SUMMARY} />

            <AdminTransactionsStatBand stats={TRANSACTION_STATS} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <AdminTransactionsMain
                    transactions={visible}
                    statusFilter={statusFilter}
                    financingFilter={financingFilter}
                    onStatusFilterChange={setStatusFilter}
                    onFinancingFilterChange={setFinancingFilter}
                    onOpen={onOpen}
                />
                <AdminTransactionsRail />
            </div>

            <TransactionReviewModal
                transaction={TRANSACTIONS.find(
                    (transaction) => transaction.id === reviewId,
                )}
                onClose={onCloseReview}
            />
        </div>
    );
}

AdminTransactionsConsole.displayName = "AdminTransactionsConsole";
