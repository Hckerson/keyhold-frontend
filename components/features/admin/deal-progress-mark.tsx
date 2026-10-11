import {
    MILESTONE_ORDER,
    TRANSACTION_MILESTONES,
    TRANSACTION_STATUSES,
} from "@/lib/config/transaction-tones";
import { commissionOf, nextMilestone } from "@/lib/data/admin-transactions";
import { cn, formatCompactUsd } from "@/lib/utils";
import type { LedgerTransaction } from "@/lib/types";

const OF = "of";

export interface DealProgressMarkProps {
    transaction: LedgerTransaction;
    className?: string;
}

export function DealProgressMark({
    transaction,
    className,
}: DealProgressMarkProps) {
    const status = TRANSACTION_STATUSES[transaction.status];
    const next = nextMilestone(transaction);

    if (!status.open || !next)
        return (
            <span className={cn("text-text-muted truncate text-xs", className)}>
                {transaction.status === "COMPLETED"
                    ? `${formatCompactUsd(commissionOf(transaction))} ${status.flowNote}`
                    : status.label}
            </span>
        );

    const { icon: Icon, next: label } = TRANSACTION_MILESTONES[next];

    return (
        <span
            className={cn(
                "flex min-w-0 items-center gap-1.5 text-xs",
                className,
            )}
        >
            <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className="text-text-secondary size-3 shrink-0"
            />
            <span className="text-text truncate">{label}</span>
            <span className="text-text-muted shrink-0 tabular-nums">
                {transaction.cleared.length} {OF} {MILESTONE_ORDER.length}
            </span>
        </span>
    );
}

DealProgressMark.displayName = "DealProgressMark";
