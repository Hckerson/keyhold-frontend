"use client";

import { ProgressBar } from "@/components/ui/progress-bar";
import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ModerationStatusTile as ModerationStatusTileData } from "@/lib/types";

const UNKNOWN = "—";

export interface ModerationStatusTileProps {
    tile: ModerationStatusTileData;
    active: boolean;
    pending?: boolean;
    onSelect: () => void;
}

export function ModerationStatusTile({
    tile,
    active,
    pending,
    onSelect,
}: ModerationStatusTileProps) {
    const Icon = tile.icon;

    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onSelect}
            className={cn(
                "focus-visible:ring-accent ease-smooth flex h-20 min-w-0 flex-col justify-between rounded-lg border p-3 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                active
                    ? "border-accent bg-accent-light"
                    : "border-border-light bg-background-muted hover:bg-background-alt",
            )}
        >
            <span className="flex items-center justify-between gap-2">
                <span
                    className={cn(
                        "truncate text-xs font-medium",
                        active ? "text-accent-dark" : "text-text-secondary",
                    )}
                >
                    {tile.label}
                </span>
                <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className={cn("size-3 shrink-0", chartToneText[tile.tone])}
                />
            </span>
            <span className="flex items-end justify-between gap-2">
                <span
                    className={cn(
                        "font-display text-h5 leading-none font-light tabular-nums",
                        tile.count === 0 ? "text-text-muted" : "text-text",
                    )}
                >
                    {pending ? UNKNOWN : tile.count}
                </span>
                <ProgressBar
                    value={tile.percent}
                    tone={tile.tone}
                    className="mb-1 w-12"
                />
            </span>
        </button>
    );
}

ModerationStatusTile.displayName = "ModerationStatusTile";
