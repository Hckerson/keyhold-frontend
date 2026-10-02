"use client";

import { ModerationStatusTile } from "@/components/features/admin/moderation-status-tile";
import type { ModerationStatusFilter } from "@/lib/data/admin-listings";
import type { ModerationStatusTile as ModerationStatusTileData } from "@/lib/types";

const BAND_LABEL = "Filter the queue by review status";

export interface ModerationStatBandProps {
    tiles: ModerationStatusTileData[];
    active: ModerationStatusFilter;
    pending?: boolean;
    onChange: (filter: ModerationStatusFilter) => void;
}

export function ModerationStatBand({
    tiles,
    active,
    pending,
    onChange,
}: ModerationStatBandProps) {
    return (
        <section
            aria-label={BAND_LABEL}
            aria-busy={pending || undefined}
            className="console-split console-split--sixths gap-2"
        >
            {tiles.map((tile) => (
                <ModerationStatusTile
                    key={tile.id}
                    tile={tile}
                    active={tile.id === active}
                    pending={pending}
                    onSelect={() => onChange(tile.id)}
                />
            ))}
        </section>
    );
}

ModerationStatBand.displayName = "ModerationStatBand";
