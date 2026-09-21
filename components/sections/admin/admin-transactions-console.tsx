"use client";

import { useCallback, useMemo, useState } from "react";
import { TransactionReviewModal } from "@/components/features/admin/transaction-review-modal";
import { AdminTransactionsHeader } from "@/components/sections/admin/admin-transactions-header";
import { AdminTransactionsMain } from "@/components/sections/admin/admin-transactions-main";
import { AdminTransactionsRail } from "@/components/sections/admin/admin-transactions-rail";
import { AdminTransactionsStatBand } from "@/components/sections/admin/admin-transactions-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    commissionMetrics,
    focusTransaction,
    matchesTransactionFilters,
    openTransactions,
    rankTransactions,
    toTransactionExportRows,
    toTransactionStages,
    transactionCounts,
    transactionStats,
    transactionsSummary,
    TRANSACTION_EXPORT_COLUMNS,
    TRANSACTION_EXPORT_FILENAME,
    type TransactionStatusFilter,
} from "@/lib/data/admin-transactions";
import {
    useTransactionLedger,
    useTransactionStages,
} from "@/lib/hooks/use-transactions";
import { toLedger } from "@/lib/utils/to-ledger-transaction";
import { downloadCsv } from "@/lib/utils/download";

const EVERY_STATUS: TransactionStatusFilter = "all";
const LEDGER_PAGE_SIZE = 100;

export function AdminTransactionsConsole() {
    const ledger = useTransactionLedger({ limit: LEDGER_PAGE_SIZE });
    const stages = useTransactionStages();

    const [statusFilter, setStatusFilter] =
        useState<TransactionStatusFilter>(EVERY_STATUS);
    const [reviewId, setReviewId] = useState<string | null>(null);

    const transactions = useMemo(
        () => rankTransactions(toLedger(ledger.data?.items ?? [])),
        [ledger.data?.items],
    );

    const focus = useMemo(() => focusTransaction(transactions), [transactions]);

    const counts = useMemo(
        () => transactionCounts(transactions),
        [transactions],
    );

    const visible = useMemo(
        () =>
            transactions
                .filter((transaction) => transaction.id !== focus?.id)
                .filter((transaction) =>
                    matchesTransactionFilters(transaction, statusFilter),
                ),
        [transactions, focus?.id, statusFilter],
    );

    const pipeline = useMemo(
        () => toTransactionStages(stages.data ?? []),
        [stages.data],
    );

    const onOpen = useCallback((id: string) => setReviewId(id), []);

    const onCloseReview = useCallback(() => setReviewId(null), []);

    const onExport = useCallback(
        () =>
            downloadCsv(
                [
                    {
                        columns: TRANSACTION_EXPORT_COLUMNS,
                        rows: toTransactionExportRows(transactions),
                    },
                ],
                TRANSACTION_EXPORT_FILENAME,
            ),
        [transactions],
    );

    if (ledger.isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.adminTransactions}
                onRetry={() => void ledger.refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <AdminTransactionsHeader
                summary={transactionsSummary(transactions)}
                onExport={onExport}
            />

            <AdminTransactionsStatBand
                stats={transactionStats(transactions)}
                pending={ledger.isPending}
            />

            <div className="console-split gap-3">
                <AdminTransactionsMain
                    transactions={visible}
                    focus={focus}
                    statusFilter={statusFilter}
                    counts={counts}
                    pending={ledger.isPending}
                    onStatusFilterChange={setStatusFilter}
                    onOpen={onOpen}
                />
                <AdminTransactionsRail
                    stages={pipeline}
                    openCount={openTransactions(transactions).length}
                    metrics={commissionMetrics(transactions)}
                />
            </div>

            <TransactionReviewModal
                transaction={transactions.find(
                    (transaction) => transaction.id === reviewId,
                )}
                onClose={onCloseReview}
            />
        </div>
    );
}

AdminTransactionsConsole.displayName = "AdminTransactionsConsole";
