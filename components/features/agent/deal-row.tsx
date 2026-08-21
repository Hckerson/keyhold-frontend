"use client";

import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { DealNotes } from "@/components/features/agent/deal-notes";
import { DealProgress } from "@/components/features/agent/deal-progress";
import { DEAL_STAGES } from "@/lib/config/deal-stages";
import { FAST } from "@/lib/config/motion";
import { cn, formatMillions } from "@/lib/utils";
import type { Deal } from "@/lib/types/deal";

export interface DealRowProps {
    deal: Deal;
    actionLabel: string;
    onAdvance: (id: string) => void;
    className?: string;
}

export function DealRow({
    deal,
    actionLabel,
    onAdvance,
    className,
}: DealRowProps) {
    const stage = DEAL_STAGES.find((item) => item.id === deal.stage);
    if (!stage) return null;

    return (
        <m.article
            layoutId={`deal-${deal.id}`}
            layout="position"
            transition={FAST}
            className={cn(
                "bg-background-muted border-border-light hover:border-border ease-smooth space-y-3 rounded-xl border p-3 shadow-sm transition-colors duration-300 hover:shadow-md",
                className,
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
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

            <DealProgress stage={deal.stage} daysToClose={deal.daysToClose} />

            <p className="text-text-secondary truncate text-xs">
                {deal.lastActivity}
            </p>

            <DealNotes notes={deal.notes} nextStep={deal.nextStep} />

            <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => onAdvance(deal.id)}
            >
                {actionLabel}
            </Button>
        </m.article>
    );
}

DealRow.displayName = "DealRow";
