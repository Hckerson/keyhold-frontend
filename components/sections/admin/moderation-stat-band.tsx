"use client";

import { FilterTileBand } from "@/components/patterns/filter-tile-band";
import type { ModerationStatusFilter } from "@/lib/data/admin-listings";
import type { ModerationStatusTile } from "@/lib/types";

const BAND_LABEL = "Filter the queue by review status";

export interface ModerationStatBandProps {
    tiles: ModerationStatusTile[];
    active: ModerationStatusFilter;
    pending?: boolean;
    onChange: (filter: ModerationStatusFilter) => void;
}

export function ModerationStatBand(props: ModerationStatBandProps) {
    return (
        <FilterTileBand
            label={BAND_LABEL}
            className="console-split--sixths"
            {...props}
        />
    );
}

ModerationStatBand.displayName = "ModerationStatBand";
