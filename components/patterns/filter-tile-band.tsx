"use client";

import { FilterTile } from "@/components/patterns/filter-tile";
import { cn } from "@/lib/utils";
import type { FilterTileDatum } from "@/lib/types";

const EVERY = "all";

export interface FilterTileBandProps<T extends string> {
    label: string;
    tiles: FilterTileDatum<T>[];
    active: T;
    pending?: boolean;
    className: string;
    onChange: (next: T) => void;
}

export function FilterTileBand<T extends string>({
    label,
    tiles,
    active,
    pending,
    className,
    onChange,
}: FilterTileBandProps<T>) {
    return (
        <section
            aria-label={label}
            aria-busy={pending || undefined}
            className={cn("console-split gap-2", className)}
        >
            {tiles.map((tile) => (
                <FilterTile
                    key={tile.id}
                    tile={tile}
                    active={tile.id === active}
                    pending={pending}
                    showShare={tile.id !== EVERY}
                    onSelect={() => onChange(tile.id)}
                />
            ))}
        </section>
    );
}

FilterTileBand.displayName = "FilterTileBand";
