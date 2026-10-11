import { TRANSACTION_STATUSES } from "@/lib/config/transaction-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { LedgerStatus } from "@/lib/types";

export interface TransactionStatusMarkProps {
    status: LedgerStatus;
    className?: string;
}

export function TransactionStatusMark({
    status,
    className,
}: TransactionStatusMarkProps) {
    const meta = TRANSACTION_STATUSES[status];
    const Icon = meta.icon;

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn(
                    "size-3 shrink-0",
                    meta.open
                        ? chartToneText[meta.chartTone]
                        : "text-text-muted",
                )}
            />
            <span
                className={cn(
                    "min-w-0 truncate text-xs",
                    meta.open ? "text-text" : "text-text-secondary",
                )}
            >
                {meta.label}
            </span>
        </span>
    );
}

TransactionStatusMark.displayName = "TransactionStatusMark";
