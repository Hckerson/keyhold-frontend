"use client";

import { IconChip } from "@/components/ui/icon-chip";
import { ProgressBar } from "@/components/ui/progress-bar";
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
            <span className="flex items-center gap-2">
                <IconChip
                    icon={tile.icon}
                    tone={tile.count === 0 ? "neutral" : tile.tone}
                />
                <span
                    className={cn(
                        "truncate text-xs font-medium",
                        active ? "text-accent-dark" : "text-text-secondary",
                    )}
                >
                    {tile.label}
                </span>
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
