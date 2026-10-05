"use client";

import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { SkeletonRows } from "@/components/patterns/skeleton-rows";
import { DealLedgerList } from "@/components/features/admin/deal-ledger-list";
import type { LedgerTotals, LedgerTransaction } from "@/lib/types";

const LEDGER_TITLE = "Deals";
const CLEAR_ACTION = "Show every stage";
const EMPTY_TITLE = "No deals in this stage";
const EMPTY_LEDE = "Pick another stage above, or show every stage.";

export interface AdminTransactionsMainProps {
    transactions: LedgerTransaction[];
    total: number;
    totals: LedgerTotals;
    reading: string;
    filtered: boolean;
    pending?: boolean;
    onClearFilter: () => void;
    onOpen: (id: string) => void;
}

export function AdminTransactionsMain({
    transactions,
    total,
    totals,
    reading,
    filtered,
    pending,
    onClearFilter,
    onOpen,
}: AdminTransactionsMainProps) {
    return (
        <Panel
            title={LEDGER_TITLE}
            description={reading}
            count={filtered ? `${transactions.length} / ${total}` : total}
            action={
                filtered && (
                    <Button
                        type="button"
                        emphasis="quiet"
                        onClick={onClearFilter}
                    >
                        {CLEAR_ACTION}
                    </Button>
                )
            }
        >
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
                    <DealLedgerList
                        transactions={transactions}
                        totals={totals}
                        onOpen={onOpen}
                    />
                ) : pending ? (
                    <SkeletonRows tall />
                ) : (
                    <EmptyState
                        icon={ArrowLeftRight}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </PresenceSwap>
        </Panel>
    );
}

AdminTransactionsMain.displayName = "AdminTransactionsMain";
