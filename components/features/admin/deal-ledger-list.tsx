"use client";

import { DealLedgerGroup } from "@/components/features/admin/deal-ledger-group";
import {
    COMMISSION_RATE_LABEL,
    dealGroups,
} from "@/lib/data/admin-transactions";
import { formatCompactUsd } from "@/lib/utils";
import type { LedgerTotals, LedgerTransaction } from "@/lib/types";

const LIST_LABEL =
    "Marketplace deals in flight and closed, by property, buyer and agent, progress, sale price and timing";
const DEALS_NOUN = "deals";
const COMMISSION_PREFIX = "commission at";

export interface DealLedgerListProps {
    transactions: LedgerTransaction[];
    totals: LedgerTotals;
    onOpen: (id: string) => void;
    subject?: string;
}

export function DealLedgerList({
    transactions,
    totals,
    onOpen,
    subject,
}: DealLedgerListProps) {
    return (
        <div
            role="group"
            aria-label={LIST_LABEL}
            className="queue-frame -mx-2 flex flex-col gap-2"
        >
            {dealGroups(transactions).map((group) => (
                <DealLedgerGroup
                    key={group.id}
                    group={group}
                    onOpen={onOpen}
                    subject={subject}
                />
            ))}
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
