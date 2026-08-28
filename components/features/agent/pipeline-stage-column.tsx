"use client";

import { AnimatePresence } from "motion/react";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { DealRow } from "@/components/features/agent/deal-row";
import type { Deal } from "@/lib/types/deal";

const OPEN_LEAD_ACTION = "Open in lead desk";

export interface PipelineStageColumnProps {
    label: string;
    items: Deal[];
    value: number;
}

export function PipelineStageColumn({
    label,
    items,
    value,
}: PipelineStageColumnProps) {
    return (
        <section
            aria-label={`${label} column`}
            className="bg-background-alt border-border-light flex flex-col gap-3 rounded-xl border p-3"
        >
            <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                        {label}
                    </span>
                    <span className="bg-background text-text-secondary rounded-full px-2 py-0.5 text-xs font-medium tabular-nums">
                        {items.length}
                    </span>
                </div>
                <span className="text-text-secondary text-xs tabular-nums">
                    ${value.toFixed(1)}M
                </span>
            </div>

            <AnimatePresence initial={false}>
                {items.map((deal) => (
                    <DealRow
                        key={deal.id}
                        deal={deal}
                        actionLabel={OPEN_LEAD_ACTION}
                    />
                ))}
            </AnimatePresence>

            {items.length === 0 && (
                <PresenceSwap swapKey="empty">
                    <p className="border-border text-text-muted rounded-lg border border-dashed px-3 py-6 text-center text-xs">
                        No deals in {label.toLowerCase()}
                    </p>
                </PresenceSwap>
            )}
        </section>
    );
}

PipelineStageColumn.displayName = "PipelineStageColumn";
