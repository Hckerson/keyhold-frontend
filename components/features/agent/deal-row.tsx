"use client";

import type { DragEvent } from "react";
import { m } from "motion/react";
import { GripVertical } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { DealNotes } from "@/components/features/agent/deal-notes";
import { DealProgress } from "@/components/features/agent/deal-progress";
import { DEAL_STAGES } from "@/lib/config/deal-stages";
import { FAST } from "@/lib/config/motion";
import { DEAL_DRAG_TYPE } from "@/lib/data/agent-pipeline";
import { cn, formatMillions } from "@/lib/utils";
import type { Deal } from "@/lib/types/deal";

const OPEN_LABEL = "Open deal";
const DRAG_LABEL = "Drag to move stage";

export interface DealRowProps {
    deal: Deal;
    onSelect: (id: string) => void;
    onDragStateChange: (id: string | null) => void;
    dragging?: boolean;
    className?: string;
}

export function DealRow({
    deal,
    onSelect,
    onDragStateChange,
    dragging,
    className,
}: DealRowProps) {
    const stage = DEAL_STAGES.find((item) => item.id === deal.stage);
    if (!stage) return null;

    const handleDragStart = (event: DragEvent<HTMLElement>) => {
        event.dataTransfer.setData(DEAL_DRAG_TYPE, deal.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStateChange(deal.id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={() => onDragStateChange(null)}
        >
            <m.article
                layoutId={`deal-${deal.id}`}
                layout="position"
                transition={FAST}
                className={cn(
                    "bg-background-muted border-border-light hover:border-border ease-smooth space-y-3 rounded-xl border p-3 shadow-sm transition-colors duration-300 hover:shadow-md",
                    dragging && "border-accent opacity-50",
                    className,
                )}
            >
                <div className="flex items-start justify-between gap-2">
                    <span
                        className="text-text-muted cursor-grab active:cursor-grabbing"
                        aria-hidden="true"
                        title={DRAG_LABEL}
                    >
                        <GripVertical className="size-3" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-text truncate text-xs font-medium">
                            {deal.property}
                        </h3>
                        <p className="text-text-secondary mt-0.5 truncate text-xs">
                            {deal.buyer}
                        </p>
                    </div>
                    <StatusBadge tone={stage.tone}>{stage.label}</StatusBadge>
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-h6 font-display text-accent font-light tabular-nums">
                        {formatMillions(deal.price, 2)}
                    </span>
                    <span className="text-text-muted text-xs tabular-nums">
                        {deal.daysInStage}d in stage
                    </span>
                </div>

                <DealProgress
                    stage={deal.stage}
                    daysInStage={deal.daysInStage}
                />

                <p className="text-text-secondary truncate text-xs">
                    {deal.lastActivity}
                </p>

                {deal.notes && <DealNotes notes={deal.notes} />}

                <button
                    type="button"
                    onClick={() => onSelect(deal.id)}
                    className="text-text-muted hover:text-accent focus-visible:ring-accent ease-smooth rounded-sm text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                    {OPEN_LABEL}
                </button>
            </m.article>
        </div>
    );
}

DealRow.displayName = "DealRow";
