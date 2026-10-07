"use client";

import { m } from "motion/react";
import { DeltaChip } from "@/components/ui/delta-chip";
import { Skeleton } from "@/components/ui/skeleton";
import { FAST } from "@/lib/config/motion";
import { cn } from "@/lib/utils";
import type { ReportMeasure } from "@/lib/types";

const AGAINST = "vs";

export interface ReportMeasureTabProps {
    measure: ReportMeasure;
    active: boolean;
    tabId: string;
    panelId: string;
    indicatorId: string;
    pending?: boolean;
    onSelect: () => void;
}

export function ReportMeasureTab({
    measure,
    active,
    tabId,
    panelId,
    indicatorId,
    pending,
    onSelect,
}: ReportMeasureTabProps) {
    const against = measure.against && `${AGAINST} ${measure.against}`;

    return (
        <button
            type="button"
            role="tab"
            id={tabId}
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            onClick={onSelect}
            className={cn(
                "group focus-visible:ring-accent ease-smooth relative flex min-w-0 flex-col gap-2 px-4 pt-3.5 pb-3 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
                active
                    ? "bg-background"
                    : "bg-background-alt hover:bg-background-muted",
            )}
        >
            {active && (
                <m.span
                    layoutId={indicatorId}
                    transition={FAST}
                    aria-hidden="true"
                    className="bg-accent absolute inset-x-0 top-0 h-0.5"
                />
            )}
            <span
                className={cn(
                    "micro-label ease-smooth truncate transition-colors",
                    active ? "text-accent-dark" : "group-hover:text-text",
                )}
            >
                {measure.label}
            </span>
            {pending ? (
                <Skeleton className="h-6 w-20" />
            ) : (
                <span className="font-display text-h5 text-text leading-none font-light tabular-nums">
                    {measure.total}
                </span>
            )}
            <span className="text-text-secondary flex h-4 min-w-0 items-center gap-1.5 text-xs tabular-nums">
                {pending ? (
                    <Skeleton className="h-3 w-16" />
                ) : (
                    <>
                        <span className="truncate">{measure.latest}</span>
                        {measure.delta && (
                            <span title={against ?? undefined}>
                                <DeltaChip
                                    size="sm"
                                    value={measure.delta.label}
                                    direction={measure.delta.direction}
                                />
                                <span className="sr-only"> {against}</span>
                            </span>
                        )}
                    </>
                )}
            </span>
        </button>
    );
}

ReportMeasureTab.displayName = "ReportMeasureTab";
