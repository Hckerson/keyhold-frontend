"use client";

import { ArrowLeftRight } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { TransactionFocusTile } from "@/components/features/admin/transaction-focus-tile";
import { TransactionLedgerTable } from "@/components/features/admin/transaction-ledger-table";
import { AdminTransactionsToolbar } from "@/components/sections/admin/admin-transactions-toolbar";
import {
    FOCUS_TRANSACTION,
    type TransactionFinancingFilter,
    type TransactionStatusFilter,
} from "@/lib/data/admin-transactions";
import type { Transaction } from "@/lib/types";

const LEDGER_TITLE = "Deal Ledger";
const LEDGER_LEDE =
    "Ranked by settlement risk, then by value — the focus deal sits above";
const EMPTY_TITLE = "No deals in this view";
const EMPTY_LEDE =
    "Widen the stage filter or clear the financing filter to see the full ledger.";

export interface AdminTransactionsMainProps {
    transactions: Transaction[];
    statusFilter: TransactionStatusFilter;
    financingFilter: TransactionFinancingFilter;
    onStatusFilterChange: (filter: TransactionStatusFilter) => void;
    onFinancingFilterChange: (filter: TransactionFinancingFilter) => void;
    onOpen: (id: string) => void;
}

export function AdminTransactionsMain({
    transactions,
    statusFilter,
    financingFilter,
    onStatusFilterChange,
    onFinancingFilterChange,
    onOpen,
}: AdminTransactionsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <TransactionFocusTile
                transaction={FOCUS_TRANSACTION}
                onOpen={onOpen}
            />

            <Panel
                title={LEDGER_TITLE}
                description={LEDGER_LEDE}
                count={transactions.length}
            >
                <AdminTransactionsToolbar
                    statusFilter={statusFilter}
                    financingFilter={financingFilter}
                    onStatusFilterChange={onStatusFilterChange}
                    onFinancingFilterChange={onFinancingFilterChange}
                />

                <PresenceSwap
                    swapKey={transactions.length > 0 ? "rows" : "empty"}
                >
                    {transactions.length > 0 ? (
                        <PanelInset scroll className="mt-0">
                            <TransactionLedgerTable
                                transactions={transactions}
                                onOpen={onOpen}
                            />
                        </PanelInset>
                    ) : (
                        <EmptyState
                            icon={ArrowLeftRight}
                            title={EMPTY_TITLE}
                            description={EMPTY_LEDE}
                        />
                    )}
                </PresenceSwap>
            </Panel>
        </div>
    );
}

AdminTransactionsMain.displayName = "AdminTransactionsMain";
