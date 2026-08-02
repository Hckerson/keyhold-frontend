"use client";

import { DealRow, type Deal } from "@/components/features/agent/deal-row";
import { nextStageOf } from "@/lib/data/agent-pipeline";

export interface PipelineStageColumnProps {
    label: string;
    items: Deal[];
    value: number;
    onAdvance: (id: string) => void;
}

export function PipelineStageColumn({
    label,
    items,
    value,
    onAdvance,
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

            {items.length > 0 ? (
                items.map((deal) => (
                    <DealRow
                        key={deal.id}
                        deal={deal}
                        actionLabel={`Move to ${nextStageOf(deal.stage).label}`}
                        onAdvance={onAdvance}
                    />
                ))
            ) : (
                <p className="border-border text-text-muted rounded-lg border border-dashed px-3 py-6 text-center text-xs">
                    No deals in {label.toLowerCase()}
                </p>
            )}
        </section>
    );
}

PipelineStageColumn.displayName = "PipelineStageColumn";
