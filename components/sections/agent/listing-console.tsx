"use client";

import { useCallback, useMemo, useState } from "react";
import { ListingsHeader } from "@/components/sections/agent/listings-header";
import { ListingsMain } from "@/components/sections/agent/listings-main";
import { ListingsRail } from "@/components/sections/agent/listings-rail";
import { ListingsStatBand } from "@/components/sections/agent/listings-stat-band";
import {
    applyBulkAction,
    countByStatus,
    initialListings,
    listingStats,
    listingsSummary,
    peakViews,
    rankListings,
    type BulkAction,
    type StatusFilter,
} from "@/lib/data/agent-listings";

export function ListingConsole() {
    const [listings, setListings] = useState(initialListings);
    const [filter, setFilter] = useState<StatusFilter>("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const ranked = useMemo(() => rankListings(listings), [listings]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByStatus(peers), [peers]);
    const peak = useMemo(() => peakViews(listings), [listings]);

    const visible = useMemo(
        () =>
            filter === "all"
                ? peers
                : peers.filter((listing) => listing.status === filter),
        [peers, filter],
    );

    const visibleSelected = visible.filter((listing) =>
        selectedIds.includes(listing.id),
    );
    const allSelected =
        visible.length > 0 && visibleSelected.length === visible.length;

    const toggleOne = useCallback(
        (id: string, selected: boolean) =>
            setSelectedIds((current) =>
                selected
                    ? [...current, id]
                    : current.filter((item) => item !== id),
            ),
        [],
    );

    const toggleAll = () =>
        setSelectedIds(allSelected ? [] : visible.map((listing) => listing.id));

    const clearSelection = useCallback(() => setSelectedIds([]), []);

    const runBulkAction = (action: BulkAction) => {
        setListings((current) => applyBulkAction(current, selectedIds, action));
        setSelectedIds([]);
    };

    return (
        <div className="flex flex-col gap-4">
            <ListingsHeader summary={listingsSummary(listings)} />

            <ListingsStatBand stats={listingStats(listings)} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <ListingsMain
                    top={ranked[0]}
                    listings={visible}
                    peak={peak}
                    filter={filter}
                    counts={counts}
                    selectedIds={visibleSelected.map((listing) => listing.id)}
                    allSelected={allSelected}
                    onFilterChange={setFilter}
                    onToggleAll={toggleAll}
                    onSelectedChange={toggleOne}
                    onClearSelection={clearSelection}
                    onBulkAction={runBulkAction}
                />
                <ListingsRail listings={listings} />
            </div>
        </div>
    );
}

ListingConsole.displayName = "ListingConsole";
