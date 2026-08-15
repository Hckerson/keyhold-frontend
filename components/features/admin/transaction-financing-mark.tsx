import { FINANCING_TYPES } from "@/lib/config/transaction-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { TransactionFinancing } from "@/lib/types";

export interface TransactionFinancingMarkProps {
    financing: TransactionFinancing;
    className?: string;
}

export function TransactionFinancingMark({
    financing,
    className,
}: TransactionFinancingMarkProps) {
    const { icon: Icon, label, tone } = FINANCING_TYPES[financing];

    return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {label}
            </span>
        </span>
    );
}

TransactionFinancingMark.displayName = "TransactionFinancingMark";
