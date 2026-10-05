"use client";

import { FilterTileBand } from "@/components/patterns/filter-tile-band";
import type { UserStatusFilter, UserStatusTile } from "@/lib/types";

const BAND_LABEL = "Filter the directory by account status";

export interface AdminUsersStatusBandProps {
    tiles: UserStatusTile[];
    active: UserStatusFilter;
    pending?: boolean;
    onChange: (next: UserStatusFilter) => void;
}

export function AdminUsersStatusBand(props: AdminUsersStatusBandProps) {
    return (
        <FilterTileBand
            label={BAND_LABEL}
            className="console-split--fifths"
            {...props}
        />
    );
}

AdminUsersStatusBand.displayName = "AdminUsersStatusBand";
