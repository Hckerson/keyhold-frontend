"use client";

import { PAYOUT_STATES } from "@/lib/config/payout-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { NO_READING } from "@/lib/constants";
import { cn, formatCompactUsd, formatCount } from "@/lib/utils";
import type { PayoutStage } from "@/lib/types";

export interface EscrowStateCellProps {
    stage: PayoutStage;
    active: boolean;
    pending?: boolean;
    onSelect: () => void;
}

export function EscrowStateCell({
    stage,
    active,
    pending,
    onSelect,
}: EscrowStateCellProps) {
    const meta = PAYOUT_STATES[stage.id];
    const Icon = meta.icon;
    const empty = stage.count === 0;

    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onSelect}
            className={cn(
                "focus-visible:ring-accent ease-smooth flex min-w-0 items-center gap-3 px-4 py-3 text-left text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
                active
                    ? "bg-accent-light"
                    : "bg-background hover:bg-background-muted",
            )}
        >
            <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn(
                    "size-3.5 shrink-0",
                    empty ? "text-text-muted" : chartToneText[meta.chartTone],
                )}
            />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span
                    className={cn(
                        "truncate font-medium",
                        active
                            ? "text-accent-dark"
                            : empty
                              ? "text-text-muted"
                              : "text-text",
                    )}
                >
                    {meta.label}
                </span>
                <span className="text-text-muted tabular-nums">
                    {pending ? NO_READING : formatCount(stage.count)}
                </span>
            </span>
            <span
                className={cn(
                    "font-display text-h6 shrink-0 leading-none font-light tabular-nums",
                    empty ? "text-text-muted" : "text-text",
                )}
            >
                {pending ? NO_READING : formatCompactUsd(stage.amount)}
            </span>
        </button>
    );
}

EscrowStateCell.displayName = "EscrowStateCell";
