"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MetricCell } from "@/components/patterns/metric-cell";
import { EscrowMeter } from "@/components/features/admin/escrow-meter";
import { TransactionStatusMark } from "@/components/features/admin/transaction-status-mark";
import { commissionOf } from "@/lib/data/admin-transactions";
import { formatMillions, formatThousands, parseLocalDate } from "@/lib/utils";
import type { LedgerTransaction } from "@/lib/types";

const TILE_EYEBROW = "Largest deal in flight";
const COMMISSION_LABEL = "Commission";
const ESCROW_LABEL = "Escrow cleared";
const STATUS_LABEL = "Stage";
const CLOSE_LABEL = "Target close";
const INITIATED_LABEL = "Initiated";
const REVIEW_ACTION = "Review deal";
const NO_DATE = "—";
const DATE_FORMAT = "MMM d, yyyy";

export interface TransactionFocusTileProps {
    transaction: LedgerTransaction;
    onOpen: (id: string) => void;
}

export function TransactionFocusTile({
    transaction,
    onOpen,
}: TransactionFocusTileProps) {
    return (
        <article className="border-highlight/25 bg-background rounded-lg border p-3 shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label truncate">
                        {TILE_EYEBROW} · {transaction.reference}
                    </p>
                    <p className="text-text mt-0.5 truncate text-xs font-semibold">
                        {transaction.property}
                    </p>
                </div>
                <p className="text-h6 font-display text-highlight-dark shrink-0 font-light tabular-nums">
                    {formatMillions(transaction.price, 2)}
                </p>
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-2.5 gap-3 rounded-md border p-3">
                <MetricCell label={COMMISSION_LABEL}>
                    <span className="tabular-nums">
                        {formatThousands(commissionOf(transaction))}
                    </span>
                </MetricCell>
                <MetricCell label={ESCROW_LABEL}>
                    <EscrowMeter
                        cleared={transaction.cleared.length}
                        label={transaction.property}
                        className="justify-start"
                    />
                </MetricCell>
                <MetricCell label={STATUS_LABEL}>
                    <TransactionStatusMark status={transaction.status} />
                </MetricCell>
                <MetricCell label={CLOSE_LABEL}>
                    <span className="truncate tabular-nums">
                        {transaction.completedDate
                            ? format(
                                  parseLocalDate(transaction.completedDate),
                                  DATE_FORMAT,
                              )
                            : NO_DATE}
                    </span>
                </MetricCell>
            </div>

            <div className="mt-2.5 flex items-center justify-between gap-3">
                <p className="micro-label truncate">
                    {INITIATED_LABEL}{" "}
                    {format(
                        parseLocalDate(transaction.initiatedDate),
                        DATE_FORMAT,
                    )}
                </p>
                <Button
                    type="button"
                    size="sm"
                    onClick={() => onOpen(transaction.id)}
                >
                    {REVIEW_ACTION}
                </Button>
            </div>
        </article>
    );
}

TransactionFocusTile.displayName = "TransactionFocusTile";
