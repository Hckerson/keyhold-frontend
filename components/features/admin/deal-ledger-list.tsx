"use client";

import { AnimatePresence } from "motion/react";
import { DealLedgerRow } from "@/components/features/admin/deal-ledger-row";
import { COMMISSION_RATE_LABEL } from "@/lib/data/admin-transactions";
import { cn, formatCompactUsd } from "@/lib/utils";
import type { LedgerTotals, LedgerTransaction } from "@/lib/types";

const LIST_LABEL =
    "Marketplace deals by property, buyer and agent, escrow milestones, stage, sale price and age";
const DEALS_NOUN = "deals";
const COMMISSION_PREFIX = "commission at";

const COLUMNS = [
    { id: "deal", label: "Deal" },
    { id: "milestones", label: "Milestones", wide: true },
    { id: "stage", label: "Stage", wide: true },
    { id: "price", label: "Price", end: true },
    { id: "age", label: "Age", wide: true, end: true },
];

export interface DealLedgerListProps {
    transactions: LedgerTransaction[];
    totals: LedgerTotals;
    onOpen: (id: string) => void;
}

export function DealLedgerList({
    transactions,
    totals,
    onOpen,
}: DealLedgerListProps) {
    return (
        <div className="queue-frame -mx-2">
            <div
                aria-hidden="true"
                className="queue-grid queue-grid--deals border-border-light h-9 border-b px-2"
            >
                {COLUMNS.map(({ id, label, wide, end }) => (
                    <span
                        key={id}
                        className={cn(
                            "micro-label",
                            wide && "queue-grid__wide",
                            end && "justify-end text-right",
                        )}
                    >
                        {label}
                    </span>
                ))}
            </div>
            <ul aria-label={LIST_LABEL} className="flex flex-col py-1">
                <AnimatePresence initial={false}>
                    {transactions.map((transaction) => (
                        <DealLedgerRow
                            key={transaction.id}
                            transaction={transaction}
                            onOpen={onOpen}
                        />
                    ))}
                </AnimatePresence>
            </ul>
            <p className="border-border-light text-text-muted flex h-9 items-center justify-between gap-3 border-t px-2 text-xs tabular-nums">
                <span>
                    {totals.count} {DEALS_NOUN}
                </span>
                <span>
                    <span className="text-text font-semibold">
                        {formatCompactUsd(totals.volume)}
                    </span>
                    {" · "}
                    {formatCompactUsd(totals.commission)} {COMMISSION_PREFIX}{" "}
                    {COMMISSION_RATE_LABEL}
                </span>
            </p>
        </div>
    );
}

DealLedgerList.displayName = "DealLedgerList";
