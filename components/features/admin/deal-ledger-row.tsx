"use client";

import { format } from "date-fns";
import { m } from "motion/react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { DealProgressMark } from "@/components/features/admin/deal-progress-mark";
import { LIST_ROW_MOTION } from "@/lib/config/motion";
import {
    dealAgeTone,
    TRANSACTION_STATUSES,
} from "@/lib/config/transaction-tones";
import { NO_READING } from "@/lib/constants";
import { counterpartyOf } from "@/lib/data/admin-transactions";
import { cn, formatCompactUsd, parseLocalDate } from "@/lib/utils";
import type { LedgerTransaction } from "@/lib/types";

const REVIEW_PREFIX = "Review";
const TO = "→";
const CLOSED_FORMAT = "MMM d";

export interface DealLedgerRowProps {
    transaction: LedgerTransaction;
    onOpen: (id: string) => void;
    subject?: string;
}

export function DealLedgerRow({
    transaction,
    onOpen,
    subject,
}: DealLedgerRowProps) {
    const counterparty = counterpartyOf(transaction, subject);
    const { open } = TRANSACTION_STATUSES[transaction.status];

    return (
        <m.li {...LIST_ROW_MOTION} className="overflow-hidden">
            <button
                type="button"
                aria-label={`${REVIEW_PREFIX} ${transaction.property}`}
                onClick={() => onOpen(transaction.id)}
                className="queue-grid queue-grid--deals group hover:bg-background-muted focus-visible:ring-accent ease-smooth h-10 w-full rounded-md px-2 text-left text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <span className="text-text group-hover:text-accent ease-smooth truncate font-medium transition-colors">
                    {transaction.property}
                </span>
                <span className="queue-grid__wide text-text-secondary min-w-0 gap-1.5">
                    {counterparty ? (
                        <>
                            <span className="truncate">
                                {counterparty.name}
                            </span>
                            <span className="text-text-muted shrink-0">
                                {counterparty.side}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="truncate">
                                {transaction.buyer}
                            </span>
                            <span className="text-text-muted shrink-0">
                                {TO}
                            </span>
                            <span className="truncate">
                                {transaction.agent}
                            </span>
                        </>
                    )}
                </span>
                <DealProgressMark
                    transaction={transaction}
                    className="queue-grid__wide"
                />
                <span
                    className={cn(
                        "text-right tabular-nums",
                        open ? "text-text" : "text-text-secondary",
                    )}
                >
                    {formatCompactUsd(transaction.price)}
                </span>
                {open ? (
                    <AgeMark
                        minutes={transaction.ageMinutes}
                        tone={dealAgeTone(transaction.ageMinutes)}
                        className="queue-grid__wide justify-end"
                    />
                ) : (
                    <span className="queue-grid__wide text-text-muted justify-end tabular-nums">
                        {transaction.completedDate
                            ? format(
                                  parseLocalDate(transaction.completedDate),
                                  CLOSED_FORMAT,
                              )
                            : NO_READING}
                    </span>
                )}
            </button>
        </m.li>
    );
}

DealLedgerRow.displayName = "DealLedgerRow";
