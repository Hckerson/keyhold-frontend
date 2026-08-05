"use client";

import { useCallback, useMemo, useState } from "react";
import { SavedHeader } from "@/components/sections/dashboard/saved-header";
import { SavedMain } from "@/components/sections/dashboard/saved-main";
import { SavedRail } from "@/components/sections/dashboard/saved-rail";
import { SavedStatBand } from "@/components/sections/dashboard/saved-stat-band";
import {
    countByStatus,
    initialListings,
    rankSaved,
    removeSaved,
    savedStats,
    savedSummary,
    sortSaved,
    type SavedSortKey,
    type SavedStatusFilter,
} from "@/lib/data/saved-listings";

export function SavedConsole() {
    const [listings, setListings] = useState(initialListings);
    const [filter, setFilter] = useState<SavedStatusFilter>("all");
    const [sort, setSort] = useState<SavedSortKey>("rank");

    const ranked = useMemo(() => rankSaved(listings), [listings]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByStatus(peers), [peers]);

    const visible = useMemo(
        () =>
            sortSaved(
                filter === "all"
                    ? peers
                    : peers.filter((listing) => listing.status === filter),
                sort,
            ),
        [peers, filter, sort],
    );

    const onRemove = useCallback(
        (id: string) => setListings((current) => removeSaved(current, id)),
        [],
    );

    return (
        <div className="flex flex-col gap-4">
            <SavedHeader summary={savedSummary(listings)} />

            <SavedStatBand stats={savedStats(listings)} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <SavedMain
                    top={ranked[0]}
                    listings={visible}
                    filter={filter}
                    sort={sort}
                    counts={counts}
                    onFilterChange={setFilter}
                    onSortChange={setSort}
                    onRemove={onRemove}
                />
                <SavedRail listings={listings} />
            </div>
        </div>
    );
}

SavedConsole.displayName = "SavedConsole";
