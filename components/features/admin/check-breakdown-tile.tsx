"use client";

import { IconChip } from "@/components/ui/icon-chip";
import {
    CHECK_STATES,
    CHECK_STATE_KEYS,
    COMPLIANCE_CHECKS,
} from "@/lib/config/moderation-tones";
import { chartToneFill, chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { CheckBreakdown } from "@/lib/types";

const OPEN_SUFFIX = "open";

const worstState = (row: CheckBreakdown) =>
    row.fail > 0 ? "fail" : row.warn > 0 ? "warn" : "pass";

export interface CheckBreakdownTileProps {
    row: CheckBreakdown;
    active: boolean;
    onSelect: () => void;
}

export function CheckBreakdownTile({
    row,
    active,
    onSelect,
}: CheckBreakdownTileProps) {
    const check = COMPLIANCE_CHECKS[row.id];
    const tone = CHECK_STATES[worstState(row)].tone;
    const open = row.warn + row.fail;
    const reading = CHECK_STATE_KEYS.map(
        (state) => `${row[state]} ${CHECK_STATES[state].label.toLowerCase()}`,
    ).join(", ");

    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onSelect}
            className={cn(
                "focus-visible:ring-accent ease-smooth flex h-16 min-w-0 flex-col justify-between rounded-lg border p-2.5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                active
                    ? "border-accent bg-accent-light"
                    : "border-border-light bg-background-muted hover:bg-background-alt",
            )}
        >
            <span className="flex min-w-0 items-center gap-2">
                <IconChip icon={check.icon} tone={tone} />
                <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                    {check.label}
                </span>
                <span
                    className={cn(
                        "shrink-0 text-xs font-semibold tabular-nums",
                        open > 0 ? chartToneText[tone] : "text-text-muted",
                    )}
                >
                    {open} {OPEN_SUFFIX}
                </span>
            </span>
            <span
                role="img"
                aria-label={reading}
                className="bg-background flex h-1.5 gap-px overflow-hidden rounded-full"
            >
                {CHECK_STATE_KEYS.map(
                    (state) =>
                        row[state] > 0 && (
                            <span
                                key={state}
                                className={cn(
                                    "h-full basis-0",
                                    chartToneFill[CHECK_STATES[state].tone],
                                )}
                                style={{ flexGrow: row[state] }}
                            />
                        ),
                )}
            </span>
        </button>
    );
}

CheckBreakdownTile.displayName = "CheckBreakdownTile";
