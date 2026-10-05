"use client";

import { useCallback, useMemo, useState } from "react";
import { TransactionReviewModal } from "@/components/features/admin/transaction-review-modal";
import { AdminTransactionsHeader } from "@/components/sections/admin/admin-transactions-header";
import { AdminTransactionsMain } from "@/components/sections/admin/admin-transactions-main";
import { AdminTransactionsStatBand } from "@/components/sections/admin/admin-transactions-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    dealFlow,
    ledgerReading,
    ledgerTotals,
    matchesTransactionFilters,
    rankTransactions,
    toTransactionExportRows,
    toTransactionStages,
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

    const visible = useMemo(
        () =>
            transactions.filter((transaction) =>
                matchesTransactionFilters(transaction, statusFilter),
            ),
        [transactions, statusFilter],
    );

    const flow = useMemo(
        () => dealFlow(toTransactionStages(stages.data ?? [])),
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
            <AdminTransactionsHeader onExport={onExport} />

            <AdminTransactionsStatBand
                stages={flow}
                active={statusFilter}
                pending={stages.isPending}
                onChange={setStatusFilter}
            />

            <AdminTransactionsMain
                transactions={visible}
                total={transactions.length}
                totals={ledgerTotals(visible)}
                reading={ledgerReading(transactions)}
                filtered={statusFilter !== EVERY_STATUS}
                pending={ledger.isPending}
                onClearFilter={() => setStatusFilter(EVERY_STATUS)}
                onOpen={onOpen}
            />

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
