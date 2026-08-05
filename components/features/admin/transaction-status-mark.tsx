import { StatusDot } from "@/components/patterns/status-dot";
import { TRANSACTION_STATUSES } from "@/lib/config/transaction-tones";
import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/lib/types";

export interface TransactionStatusMarkProps {
    status: TransactionStatus;
    className?: string;
}

export function TransactionStatusMark({
    status,
    className,
}: TransactionStatusMarkProps) {
    const meta = TRANSACTION_STATUSES[status];

    return (
        <span className={cn("flex min-w-0 items-center gap-1.5", className)}>
            <StatusDot tone={meta.tone} />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {meta.label}
            </span>
        </span>
    );
}

TransactionStatusMark.displayName = "TransactionStatusMark";
