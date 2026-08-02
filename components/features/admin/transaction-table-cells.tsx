"use client";

import { Eye, Activity, type LucideIcon } from "lucide-react";
import type { StatusBadgeProps } from "@/components/ui/status-badge";
import type { Transaction, TransactionStatus } from "@/lib/types";

type Tone = NonNullable<StatusBadgeProps["tone"]>;

export const transactionStatusMeta: Record<
    TransactionStatus,
    {
        tone: Tone;
        label: string;
        dateTone: string;
        settled: boolean;
        rank: number;
        rowTone?: string;
    }
> = {
    pending: {
        tone: "info",
        label: "Pending",
        dateTone: "text-info",
        settled: false,
        rank: 1,
    },
    escrow: {
        tone: "warning",
        label: "Escrow",
        dateTone: "text-warning",
        settled: false,
        rank: 2,
    },
    completed: {
        tone: "success",
        label: "Completed",
        dateTone: "text-text-muted",
        settled: true,
        rank: 3,
    },
    failed: {
        tone: "error",
        label: "Failed",
        dateTone: "text-error",
        settled: true,
        rank: 4,
        rowTone: "bg-error/[0.035]",
    },
};

function IconButton({
    label,
    icon: Icon,
}: {
    label: string;
    icon: LucideIcon;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className="text-text-muted hover:text-accent hover:border-border focus-visible:ring-accent ease-smooth grid size-6 place-items-center rounded-full border border-transparent transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            <Icon size={12} strokeWidth={1.5} />
        </button>
    );
}

export function PropertyCell({ transaction }: { transaction: Transaction }) {
    return (
        <div className="min-w-0">
            <p className="text-text truncate text-sm font-medium">
                {transaction.property}
            </p>
            <p className="text-text-muted mt-0.5 truncate text-xs">
                {transaction.buyer}
                <span className="text-text-muted/60 px-1">→</span>
                {transaction.agent}
            </p>
        </div>
    );
}

export function TransactionRowActions({
    transaction,
}: {
    transaction: Transaction;
}) {
    return (
        <div className="flex items-center justify-end gap-1">
            <IconButton label="View transaction" icon={Eye} />
            {!transactionStatusMeta[transaction.status].settled && (
                <IconButton label="Monitor escrow" icon={Activity} />
            )}
        </div>
    );
}
