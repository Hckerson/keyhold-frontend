"use client";

import { m } from "motion/react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { DealMilestoneTrack } from "@/components/features/admin/deal-milestone-track";
import { TransactionStatusMark } from "@/components/features/admin/transaction-status-mark";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import {
    dealAgeTone,
    TRANSACTION_STATUSES,
} from "@/lib/config/transaction-tones";
import { cn, formatCompactUsd } from "@/lib/utils";
import type { LedgerTransaction } from "@/lib/types";

const REVIEW_PREFIX = "Review";
const TO = "→";

export interface DealLedgerRowProps {
    transaction: LedgerTransaction;
    onOpen: (id: string) => void;
}

export function DealLedgerRow({ transaction, onOpen }: DealLedgerRowProps) {
    const { open } = TRANSACTION_STATUSES[transaction.status];

    return (
        <m.li {...LIST_ROW_MOTION} className="overflow-hidden">
            <div className="queue-grid queue-grid--deals hover:bg-background-muted ease-smooth h-11 rounded-md px-2 transition-colors duration-200">
                <button
                    type="button"
                    aria-label={`${REVIEW_PREFIX} ${transaction.property}`}
                    onClick={() => onOpen(transaction.id)}
                    className="group focus-visible:ring-accent flex min-w-0 flex-col gap-0.5 rounded-sm text-left text-xs focus-visible:ring-2 focus-visible:outline-none"
                >
                    <span className="text-text group-hover:text-accent ease-smooth truncate font-medium transition-colors">
                        {transaction.property}
                    </span>
                    <span className="text-text-muted truncate">
                        {transaction.buyer} {TO} {transaction.agent}
                    </span>
                </button>
                <DealMilestoneTrack
                    cleared={transaction.cleared}
                    open={open}
                    className="queue-grid__wide"
                />
                <TransactionStatusMark
                    status={transaction.status}
                    className="queue-grid__wide"
                />
                <span
                    className={cn(
                        "text-right text-xs font-semibold tabular-nums",
                        open ? "text-text" : "text-text-secondary",
                    )}
                >
                    {formatCompactUsd(transaction.price)}
                </span>
                <AgeMark
                    minutes={transaction.ageMinutes}
                    tone={
                        open ? dealAgeTone(transaction.ageMinutes) : "neutral"
                    }
                    className="queue-grid__wide justify-end"
                />
            </div>
        </m.li>
    );
}

DealLedgerRow.displayName = "DealLedgerRow";
