"use client";

import { AnimatePresence } from "motion/react";
import { DealLedgerRow } from "@/components/features/admin/deal-ledger-row";
import { formatCompactUsd } from "@/lib/utils";
import type { DealGroup } from "@/lib/types";

export interface DealLedgerGroupProps {
    group: DealGroup;
    onOpen: (id: string) => void;
}

export function DealLedgerGroup({ group, onOpen }: DealLedgerGroupProps) {
    return (
        <section aria-label={group.label}>
            <h3 className="queue-grid queue-grid--deals h-8 items-end px-2 pb-1.5">
                <span className="micro-label">
                    {group.label} · {group.transactions.length}
                </span>
                <span className="queue-grid__wide" />
                <span className="queue-grid__wide" />
                <span className="text-text-muted text-right text-xs tabular-nums">
                    {formatCompactUsd(group.volume)}
                </span>
                <span className="queue-grid__wide" />
            </h3>
            <ul className="divide-border-light border-border-light divide-y border-t">
                <AnimatePresence initial={false}>
                    {group.transactions.map((transaction) => (
                        <DealLedgerRow
                            key={transaction.id}
                            transaction={transaction}
                            onOpen={onOpen}
                        />
                    ))}
                </AnimatePresence>
            </ul>
        </section>
    );
}

DealLedgerGroup.displayName = "DealLedgerGroup";
