"use client";

import {
    ArrowRight,
    CircleCheck,
    CircleX,
    Clock,
    Landmark,
    type LucideIcon,
} from "lucide-react";
import type { StatusBadgeProps } from "@/components/ui/status-badge";
import type { Transaction, TransactionStatus } from "@/lib/types";

type Tone = NonNullable<StatusBadgeProps["tone"]>;

interface TransactionStatusMeta {
    tone: Tone;
    label: string;
    icon: LucideIcon;
    rank: number;
    openNote?: string;
    rowTone?: string;
}

export const transactionStatusMeta: Record<
    TransactionStatus,
    TransactionStatusMeta
> = {
    pending: {
        tone: "info",
        label: "Pending",
        icon: Clock,
        rank: 1,
        openNote: "Awaiting a signed agreement before escrow can open.",
    },
    escrow: {
        tone: "warning",
        label: "Escrow",
        icon: Landmark,
        rank: 2,
        openNote: "Funds are held until the closing conditions clear.",
    },
    completed: {
        tone: "success",
        label: "Completed",
        icon: CircleCheck,
        rank: 3,
    },
    failed: {
        tone: "error",
        label: "Failed",
        icon: CircleX,
        rank: 4,
        rowTone: "bg-error/5",
    },
};

export function PropertyCell({ transaction }: { transaction: Transaction }) {
    return (
        <div className="min-w-0">
            <p className="text-text truncate text-xs font-medium">
                {transaction.property}
            </p>
            <p className="text-text-muted mt-0.5 flex min-w-0 items-center gap-1 text-[10px]">
                <span className="sr-only">Buyer</span>
                <span className="truncate">{transaction.buyer}</span>
                <ArrowRight
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-border-dark shrink-0"
                />
                <span className="sr-only">Agent</span>
                <span className="truncate">{transaction.agent}</span>
            </p>
        </div>
    );
}
