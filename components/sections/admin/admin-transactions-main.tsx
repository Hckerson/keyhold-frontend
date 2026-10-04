"use client";

import { ArrowLeftRight } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { TransactionFocusTile } from "@/components/features/admin/transaction-focus-tile";
import { TransactionLedgerTable } from "@/components/features/admin/transaction-ledger-table";
import { AdminTransactionsToolbar } from "@/components/sections/admin/admin-transactions-toolbar";
import type { TransactionStatusFilter } from "@/lib/data/admin-transactions";
import type { LedgerTransaction } from "@/lib/types";

const LEDGER_TITLE = "Deal Ledger";
const LEDGER_LEDE =
    "Ranked by settlement risk, then by value — the focus deal sits above";
const EMPTY_TITLE = "No deals in this view";
const EMPTY_LEDE = "Widen the stage filter to see the full ledger.";

export interface AdminTransactionsMainProps {
    transactions: LedgerTransaction[];
    focus?: LedgerTransaction;
    statusFilter: TransactionStatusFilter;
    counts: Record<TransactionStatusFilter, number>;
    pending?: boolean;
    onStatusFilterChange: (filter: TransactionStatusFilter) => void;
    onOpen: (id: string) => void;
}

export function AdminTransactionsMain({
    transactions,
    focus,
    statusFilter,
    counts,
    pending,
    onStatusFilterChange,
    onOpen,
}: AdminTransactionsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {focus && (
                <TransactionFocusTile transaction={focus} onOpen={onOpen} />
            )}

            <Panel
                title={LEDGER_TITLE}
                description={LEDGER_LEDE}
                count={transactions.length}
            >
                <AdminTransactionsToolbar
                    statusFilter={statusFilter}
                    counts={counts}
                    onStatusFilterChange={onStatusFilterChange}
                />

                <PresenceSwap
                    swapKey={
                        transactions.length > 0
                            ? "rows"
                            : pending
                              ? "pending"
                              : "empty"
                    }
                >
                    {transactions.length > 0 ? (
                        <PanelInset scroll>
                            <TransactionLedgerTable
                                transactions={transactions}
                                onOpen={onOpen}
                            />
                        </PanelInset>
                    ) : pending ? (
                        <SkeletonRows />
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
