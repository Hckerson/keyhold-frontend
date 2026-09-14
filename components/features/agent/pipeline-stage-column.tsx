"use client";

import { useState, type DragEvent } from "react";
import { AnimatePresence } from "motion/react";
import { PresenceSwap } from "@/components/patterns/presence-swap";
import { DealRow } from "@/components/features/agent/deal-row";
import { DEAL_DRAG_TYPE } from "@/lib/data/agent-pipeline";
import { cn } from "@/lib/utils";
import type { Deal, DealStage } from "@/lib/types/deal";

export interface PipelineStageColumnProps {
    stage: DealStage;
    label: string;
    items: Deal[];
    value: number;
    draggingId: string | null;
    onSelect: (id: string) => void;
    onDragStateChange: (id: string | null) => void;
    onDrop: (dealId: string, target: DealStage) => void;
}

export function PipelineStageColumn({
    stage,
    label,
    items,
    value,
    draggingId,
    onSelect,
    onDragStateChange,
    onDrop,
}: PipelineStageColumnProps) {
    const [over, setOver] = useState(false);

    const handleDragOver = (event: DragEvent<HTMLElement>) => {
        if (!event.dataTransfer.types.includes(DEAL_DRAG_TYPE)) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setOver(true);
    };

    const handleDrop = (event: DragEvent<HTMLElement>) => {
        event.preventDefault();
        setOver(false);
        const dealId = event.dataTransfer.getData(DEAL_DRAG_TYPE);
        if (dealId) onDrop(dealId, stage);
    };

    return (
        <section
            aria-label={`${label} column`}
            onDragOver={handleDragOver}
            onDragLeave={() => setOver(false)}
            onDrop={handleDrop}
            className={cn(
                "bg-background-alt border-border-light ease-smooth flex flex-col gap-3 rounded-xl border p-3 transition-colors duration-200",
                over && "border-accent bg-accent-light",
            )}
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
                        dragging={draggingId === deal.id}
                        onSelect={onSelect}
                        onDragStateChange={onDragStateChange}
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
