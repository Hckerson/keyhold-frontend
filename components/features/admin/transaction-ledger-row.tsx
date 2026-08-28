"use client";

import { ChevronRight } from "lucide-react";
import { m } from "motion/react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { EscrowMeter } from "@/components/features/admin/escrow-meter";
import { TransactionStatusMark } from "@/components/features/admin/transaction-status-mark";
import {
    dealAgeTone,
    TRANSACTION_STATUSES,
} from "@/lib/config/transaction-tones";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import { cn, formatMillions } from "@/lib/utils";
import type { LedgerTransaction } from "@/lib/types";

const OPEN_LABEL = "Open the deal";

export interface TransactionLedgerRowProps {
    transaction: LedgerTransaction;
    onOpen: (id: string) => void;
}

export function TransactionLedgerRow({
    transaction,
    onOpen,
}: TransactionLedgerRowProps) {
    const meta = TRANSACTION_STATUSES[transaction.status];

    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "ease-smooth hover:bg-background-muted h-11 transition-colors",
                meta.rowTone,
            )}
        >
            <td className="text-text truncate py-0 text-xs font-medium">
                {transaction.property}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {transaction.buyer}
            </td>
            <td className="text-text-secondary truncate py-0 pl-3 text-xs">
                {transaction.agent}
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(transaction.price, 2)}
            </td>
            <td className="py-0 pl-3">
                <EscrowMeter
                    cleared={transaction.cleared.length}
                    label={transaction.property}
                />
            </td>
            <td className="py-0 pl-3">
                <TransactionStatusMark status={transaction.status} />
            </td>
            <td className="py-0 pl-3 text-right">
                <AgeMark
                    minutes={transaction.ageMinutes}
                    tone={
                        meta.open
                            ? dealAgeTone(transaction.ageMinutes)
                            : "neutral"
                    }
                />
            </td>
            <td className="py-0 pl-3">
                <button
                    type="button"
                    onClick={() => onOpen(transaction.id)}
                    aria-label={`${OPEN_LABEL} ${transaction.reference}`}
                    className="ease-smooth focus-visible:ring-accent text-text-muted hover:bg-accent-light hover:text-accent ml-auto grid size-5 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <ChevronRight
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </button>
            </td>
        </m.tr>
    );
}

TransactionLedgerRow.displayName = "TransactionLedgerRow";
