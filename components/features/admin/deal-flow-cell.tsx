"use client";

import { chartToneText } from "@/lib/config/chart-tones";
import { dealsLabel } from "@/lib/data/admin-users";
import { cn, formatCompactUsd } from "@/lib/utils";
import type { DealFlowStage } from "@/lib/types";

const UNKNOWN = "—";

export interface DealFlowCellProps {
    stage: DealFlowStage;
    active: boolean;
    pending?: boolean;
    onSelect: () => void;
}

export function DealFlowCell({
    stage,
    active,
    pending,
    onSelect,
}: DealFlowCellProps) {
    const Icon = stage.icon;
    const empty = stage.count === 0;

    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onSelect}
            className={cn(
                "focus-visible:ring-accent ease-smooth flex min-w-0 flex-col gap-2 p-4 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
                active
                    ? "bg-accent-light"
                    : "bg-background hover:bg-background-muted",
            )}
        >
            <span className="flex min-w-0 items-center gap-1.5 text-xs">
                <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className={cn(
                        "size-3 shrink-0",
                        empty ? "text-text-muted" : chartToneText[stage.tone],
                    )}
                />
                <span
                    className={cn(
                        "truncate font-medium",
                        active ? "text-accent-dark" : "text-text",
                    )}
                >
                    {stage.label}
                </span>
            </span>
            <span
                className={cn(
                    "font-display text-h5 leading-none font-light tabular-nums",
                    empty
                        ? "text-text-muted"
                        : stage.open || stage.commission > 0
                          ? "text-text"
                          : "text-text-secondary",
                )}
            >
                {pending ? UNKNOWN : formatCompactUsd(stage.volume)}
            </span>
            <span className="text-text-muted truncate text-xs tabular-nums">
                {pending ? UNKNOWN : dealsLabel(stage.count)}
                {stage.count > 0 && (
                    <>
                        {" · "}
                        {stage.commission > 0 && (
                            <span className="text-text-secondary font-medium">
                                {formatCompactUsd(stage.commission)}{" "}
                            </span>
                        )}
                        {stage.note}
                    </>
                )}
            </span>
        </button>
    );
}

DealFlowCell.displayName = "DealFlowCell";
