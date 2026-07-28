"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn, formatMillions } from "@/lib/utils";

export type DealStage = "leads" | "offers" | "pending" | "closed";

export const DEAL_STAGES: {
    id: DealStage;
    label: string;
    tone: "info" | "warning" | "success" | "neutral";
}[] = [
    { id: "leads", label: "Leads", tone: "neutral" },
    { id: "offers", label: "Offers", tone: "info" },
    { id: "pending", label: "Pending", tone: "warning" },
    { id: "closed", label: "Closed", tone: "success" },
];

export interface Deal {
    id: string;
    property: string;
    buyer: string;
    price: number;
    stage: DealStage;
    daysInStage: number;
    daysToClose: number;
    lastActivity: string;
    nextStep: string;
    notes: string;
}

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
    const [expanded, setExpanded] = useState(false);
    const {
        id,
        property,
        buyer,
        price,
        stage,
        daysInStage,
        daysToClose,
        lastActivity,
        nextStep,
        notes,
    } = deal;

    const index = DEAL_STAGES.findIndex((item) => item.id === stage);
    const progress = Math.round(((index + 1) / DEAL_STAGES.length) * 100);
    const { label, tone } = DEAL_STAGES[index];

    return (
        <article
            className={cn(
                "bg-background-muted border-border-light hover:border-border ease-smooth space-y-3 rounded-xl border p-3 shadow-sm transition-all duration-300 hover:shadow-md",
                className,
            )}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <h3 className="text-text truncate text-xs font-medium">
                        {property}
                    </h3>
                    <p className="text-text-secondary mt-0.5 truncate text-xs">
                        {buyer}
                    </p>
                </div>
                <StatusBadge tone={tone}>{label}</StatusBadge>
            </div>

            <div className="flex items-baseline gap-2">
                <span className="text-h6 font-display text-accent font-light tabular-nums">
                    {formatMillions(price, 2)}
                </span>
                <span className="text-text-muted text-xs tabular-nums">
                    {daysInStage}d in stage
                </span>
            </div>

            <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                        {stage === "closed"
                            ? "Complete"
                            : `${daysToClose}d to close`}
                    </span>
                    <span className="text-accent text-xs font-medium tabular-nums">
                        {progress}%
                    </span>
                </div>
                <ProgressBar
                    value={progress}
                    tone={stage === "closed" ? "success" : "accent"}
                />
            </div>

            <p className="text-text-secondary truncate text-xs">
                {lastActivity}
            </p>

            <div className="border-border border-t pt-3">
                <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setExpanded((prev) => !prev)}
                    className="group ease-smooth focus-visible:ring-accent flex w-full items-start gap-1.5 rounded-md text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <ChevronDown
                        size={12}
                        strokeWidth={1.5}
                        className={cn(
                            "text-text-muted ease-smooth mt-0.5 shrink-0 transition-transform duration-200",
                            expanded && "rotate-180",
                        )}
                    />
                    <span
                        className={cn(
                            "text-text-secondary group-hover:text-text text-xs",
                            !expanded && "truncate",
                        )}
                    >
                        {notes}
                    </span>
                </button>

                {expanded && (
                    <p className="text-text mt-2 text-xs">
                        <span className="text-text-secondary">Next: </span>
                        <span className="font-medium">{nextStep}</span>
                    </p>
                )}
            </div>

            <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => onAdvance(id)}
            >
                {actionLabel}
            </Button>
        </article>
    );
}

DealRow.displayName = "DealRow";
