"use client";

import { useCallback, useMemo, useState } from "react";
import { SavedHeader } from "@/components/sections/dashboard/saved-header";
import { SavedMain } from "@/components/sections/dashboard/saved-main";
import { SavedRail } from "@/components/sections/dashboard/saved-rail";
import { SavedStatBand } from "@/components/sections/dashboard/saved-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import {
    countByStatus,
    rankSaved,
    savedStats,
    savedSummary,
    sortSaved,
    type SavedSortKey,
    type SavedStatusFilter,
} from "@/lib/data/saved-listings";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    useSavedProperties,
    useToggleSavedProperty,
} from "@/lib/hooks/use-saved-properties";
import { toSavedListing } from "@/lib/utils/to-saved-listing";

export function SavedConsole() {
    const { data, isPending, isError, refetch } = useSavedProperties();
    const toggleSaved = useToggleSavedProperty();

    const [filter, setFilter] = useState<SavedStatusFilter>("all");
    const [sort, setSort] = useState<SavedSortKey>("rank");

    const listings = useMemo(() => (data ?? []).map(toSavedListing), [data]);

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
        (id: string) =>
            void toggleSaved.mutateAsync({ propertyId: id, saved: true }),
        [toggleSaved],
    );

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.buyerSaved}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <SavedHeader summary={savedSummary(listings)} />

            <SavedStatBand stats={savedStats(listings)} />

            <div className="console-split gap-3">
                <SavedMain
                    top={ranked[0]}
                    listings={visible}
                    filter={filter}
                    sort={sort}
                    counts={counts}
                    pending={isPending}
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
