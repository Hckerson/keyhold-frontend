"use client";

import { IconChip } from "@/components/ui/icon-chip";
import { cn } from "@/lib/utils";
import type { FilterTileDatum } from "@/lib/types";

const UNKNOWN = "—";

export interface FilterTileProps<T extends string> {
    tile: FilterTileDatum<T>;
    active: boolean;
    pending?: boolean;
    showShare?: boolean;
    onSelect: () => void;
}

export function FilterTile<T extends string>({
    tile,
    active,
    pending,
    showShare,
    onSelect,
}: FilterTileProps<T>) {
    const empty = tile.count === 0;

    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onSelect}
            className={cn(
                "focus-visible:ring-accent ease-smooth flex h-20 min-w-0 flex-col justify-between rounded-lg border p-3 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                active
                    ? "border-accent bg-accent-light"
                    : "border-border bg-background hover:bg-background-muted",
            )}
        >
            <span className="flex items-center gap-2">
                <IconChip
                    icon={tile.icon}
                    tone={empty ? "neutral" : tile.tone}
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
            <span className="flex items-baseline justify-between gap-2">
                <span
                    className={cn(
                        "font-display text-h5 leading-none font-light tabular-nums",
                        empty ? "text-text-muted" : "text-text",
                    )}
                >
                    {pending ? UNKNOWN : tile.count}
                </span>
                {showShare && !pending && (
                    <span className="text-text-muted text-xs tabular-nums">
                        {tile.percent}%
                    </span>
                )}
            </span>
        </button>
    );
}

FilterTile.displayName = "FilterTile";
