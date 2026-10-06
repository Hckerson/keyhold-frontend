"use client";

import { useCallback, useMemo, useState } from "react";
import { matchesStatus } from "@/lib/data/agent-listings";
import type { ListingStatusFilter, ManagedListing } from "@/lib/types";

export function useListingSelection(listings: ManagedListing[]) {
    const [filter, setFilter] = useState<ListingStatusFilter>("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const visible = useMemo(
        () => listings.filter((listing) => matchesStatus(listing, filter)),
        [listings, filter],
    );

    const selected = useMemo(
        () => visible.filter((listing) => selectedIds.includes(listing.id)),
        [visible, selectedIds],
    );

    const allSelected =
        visible.length > 0 && selected.length === visible.length;

    const changeFilter = useCallback(
        (next: ListingStatusFilter) => {
            setFilter(next);
            setSelectedIds((current) =>
                current.filter((id) =>
                    listings.some(
                        (listing) =>
                            listing.id === id && matchesStatus(listing, next),
                    ),
                ),
            );
        },
        [listings],
    );

    const toggleOne = useCallback(
        (id: string, checked: boolean) =>
            setSelectedIds((current) =>
                checked
                    ? [...current, id]
                    : current.filter((item) => item !== id),
            ),
        [],
    );

    const toggleAll = () =>
        setSelectedIds(allSelected ? [] : visible.map((listing) => listing.id));

    const clear = useCallback(() => setSelectedIds([]), []);

    return {
        filter,
        visible,
        selected,
        selectedIds: selected.map((listing) => listing.id),
        allSelected,
        changeFilter,
        toggleOne,
        toggleAll,
        clear,
    };
}
