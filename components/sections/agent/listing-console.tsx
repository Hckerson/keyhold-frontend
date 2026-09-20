"use client";

import { useCallback, useMemo, useState } from "react";
import { ListingsHeader } from "@/components/sections/agent/listings-header";
import { ListingsMain } from "@/components/sections/agent/listings-main";
import { ListingsRail } from "@/components/sections/agent/listings-rail";
import { ListingsStatBand } from "@/components/sections/agent/listings-stat-band";
import { ListingPromoteModal } from "@/components/features/agent/listing-promote-modal";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import {
    countByStatus,
    featuredUntilLabel,
    listingStats,
    listingsSummary,
    peakViews,
    rankListings,
    type BulkAction,
    type StatusFilter,
} from "@/lib/data/agent-listings";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useSession } from "@/lib/hooks/use-session";
import {
    useDeleteProperty,
    usePromoteProperty,
    useSellerProperties,
    useUpdatePropertyStatus,
} from "@/lib/hooks/use-properties";
import { toManagedListing } from "@/lib/utils/to-managed-listing";
import type { PropertyStatus } from "@/lib/enums/enums";

const BULK_STATUS: Record<Exclude<BulkAction, "delete">, PropertyStatus> = {
    publish: "AVAILABLE",
    draft: "DRAFT",
    renew: "AVAILABLE",
};

const SELLER_QUERY = { limit: 100 } as const;

export function ListingConsole() {
    const { user } = useSession();
    const { data, isPending, isError, refetch } = useSellerProperties(
        user?.id,
        SELLER_QUERY,
    );
    const updateStatus = useUpdatePropertyStatus();
    const removeProperty = useDeleteProperty();
    const promoteProperty = usePromoteProperty();

    const [filter, setFilter] = useState<StatusFilter>("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [promoteId, setPromoteId] = useState<string | null>(null);

    const listings = useMemo(
        () => (data?.items ?? []).map(toManagedListing),
        [data?.items],
    );

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
        const targets = [...selectedIds];
        setSelectedIds([]);

        targets.forEach((id) =>
            action === "delete"
                ? removeProperty.mutate(id)
                : updateStatus.mutate({ id, status: BULK_STATUS[action] }),
        );
    };

    const promoteTarget = listings.find((listing) => listing.id === promoteId);

    const confirmPromotion = (days: number) => {
        if (!promoteId) return;
        promoteProperty.mutate(
            { id: promoteId, days },
            { onSuccess: () => setPromoteId(null) },
        );
    };

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentListings}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <ListingsHeader summary={listingsSummary(listings)} />

            <ListingsStatBand
                stats={listingStats(listings)}
                pending={isPending}
            />

            <div className="console-split gap-3">
                <ListingsMain
                    top={ranked[0]}
                    listings={visible}
                    peak={peak}
                    filter={filter}
                    counts={counts}
                    selectedIds={visibleSelected.map((listing) => listing.id)}
                    allSelected={allSelected}
                    pending={isPending}
                    onFilterChange={setFilter}
                    onToggleAll={toggleAll}
                    onSelectedChange={toggleOne}
                    onClearSelection={clearSelection}
                    onBulkAction={(action) => void runBulkAction(action)}
                    onPromote={setPromoteId}
                />
                <ListingsRail listings={listings} />
            </div>

            <ListingPromoteModal
                address={promoteTarget?.address}
                featuredUntil={
                    promoteTarget && featuredUntilLabel(promoteTarget)
                }
                pending={promoteProperty.isPending}
                failed={promoteProperty.isError}
                onClose={() => setPromoteId(null)}
                onConfirm={confirmPromotion}
            />
        </div>
    );
}

ListingConsole.displayName = "ListingConsole";
