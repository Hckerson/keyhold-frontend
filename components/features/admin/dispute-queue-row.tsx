"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { disputeStatusMeta, type DisputeCase } from "@/lib/data/admin-disputes";
import { cn, formatCompactUsd } from "@/lib/utils";

const NO_AMOUNT = "No deal attached";

export interface DisputeQueueRowProps {
    dispute: DisputeCase;
    selected: boolean;
    onSelect: (id: string) => void;
}

export function DisputeQueueRow({
    dispute,
    selected,
    onSelect,
}: DisputeQueueRowProps) {
    const meta = disputeStatusMeta[dispute.status];

    return (
        <button
            type="button"
            aria-current={selected}
            onClick={() => onSelect(dispute.id)}
            className={cn(
                "ease-smooth focus-visible:ring-accent flex w-full items-start gap-2.5 border-l-2 px-3 py-2.5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                selected
                    ? "border-l-accent bg-accent-light"
                    : "hover:bg-background-alt border-l-transparent",
            )}
        >
            <div className="min-w-0 flex-1">
                <p className="text-text truncate text-xs font-semibold">
                    {dispute.title}
                </p>
                <p className="text-text-muted mt-1 truncate text-xs">
                    {dispute.initiator} ·{" "}
                    {dispute.amountAtStake > 0
                        ? formatCompactUsd(dispute.amountAtStake)
                        : NO_AMOUNT}
                </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1">
                <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
                <p
                    className={cn(
                        "font-mono text-[10px] tracking-wide tabular-nums",
                        meta.open && dispute.waitingDays > 0
                            ? "text-warning"
                            : "text-text-muted",
                    )}
                >
                    {dispute.waitingDays}d
                </p>
            </div>
        </button>
    );
}

DisputeQueueRow.displayName = "DisputeQueueRow";
