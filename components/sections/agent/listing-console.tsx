"use client";

import { useMemo } from "react";
import { ListingsHeader } from "@/components/sections/agent/listings-header";
import { ListingsMain } from "@/components/sections/agent/listings-main";
import { ListingsRail } from "@/components/sections/agent/listings-rail";
import { ListingsStatBand } from "@/components/sections/agent/listings-stat-band";
import { ListingPromoteModal } from "@/components/features/agent/listing-promote-modal";
import { ListingBulkModals } from "@/components/features/agent/listing-bulk-modals";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import {
    bulkStatusTarget,
    countByStatus,
    featuredUntilLabel,
    listingStats,
    listingsSummary,
    peakViews,
    rankListings,
} from "@/lib/data/agent-listings";
import type { BulkAction } from "@/lib/config/listing-bulk";
import type { BulkStatusChange, BulkStatusTarget } from "@/lib/types";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useSession } from "@/lib/hooks/use-session";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useListingSelection } from "@/lib/hooks/use-listing-selection";
import {
    useBulkDeleteProperties,
    useBulkUpdatePropertyStatus,
} from "@/lib/hooks/use-bulk-properties";
import {
    usePromoteProperty,
    useSellerProperties,
} from "@/lib/hooks/use-properties";
import { toManagedListing } from "@/lib/utils/to-managed-listing";

const SELLER_QUERY = { limit: 100 } as const;

export function ListingConsole() {
    const { user } = useSession();
    const { data, isPending, isError, refetch } = useSellerProperties(
        user?.id,
        SELLER_QUERY,
    );
    const bulkStatus = useBulkUpdatePropertyStatus();
    const bulkDelete = useBulkDeleteProperties();
    const promoteProperty = usePromoteProperty();
    const deletion = useConfirmation<readonly string[]>(bulkDelete);
    const statusChange = useConfirmation<BulkStatusChange, BulkStatusTarget>(
        bulkStatus,
    );
    const promotion = useConfirmation<{ id: string; days: number }, string>(
        promoteProperty,
    );

    const listings = useMemo(
        () => (data?.items ?? []).map(toManagedListing),
        [data?.items],
    );

    const ranked = useMemo(() => rankListings(listings), [listings]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByStatus(peers), [peers]);
    const peak = useMemo(() => peakViews(listings), [listings]);
    const selection = useListingSelection(peers);

    const bulkPending = statusChange.pending || deletion.pending;

    const runBulkAction = (action: BulkAction) => {
        if (bulkPending || selection.selected.length === 0) return;
        if (action === "delete") {
            deletion.request(selection.selectedIds);
            return;
        }
        const target = bulkStatusTarget(selection.selected, action);
        if (target.ids.length > 0) statusChange.request(target);
    };

    const promoteTarget = listings.find(
        (listing) => listing.id === promotion.target,
    );

    const confirmPromotion = (days: number) => {
        if (promoteTarget) promotion.confirm({ id: promoteTarget.id, days });
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
                    listings={selection.visible}
                    peak={peak}
                    filter={selection.filter}
                    counts={counts}
                    selected={selection.selected}
                    selectedIds={selection.selectedIds}
                    allSelected={selection.allSelected}
                    pending={isPending}
                    bulkPending={bulkPending}
                    onFilterChange={selection.changeFilter}
                    onToggleAll={selection.toggleAll}
                    onSelectedChange={selection.toggleOne}
                    onClearSelection={selection.clear}
                    onBulkAction={runBulkAction}
                    onPromote={promotion.request}
                />
                <ListingsRail listings={listings} />
            </div>

            <ListingBulkModals
                listings={listings}
                deletion={deletion}
                statusChange={statusChange}
                onDone={selection.clear}
            />

            <ListingPromoteModal
                address={promoteTarget?.address}
                featuredUntil={
                    promoteTarget && featuredUntilLabel(promoteTarget)
                }
                pending={promotion.pending}
                failed={promotion.failed}
                onClose={promotion.dismiss}
                onConfirm={confirmPromotion}
            />
        </div>
    );
}

ListingConsole.displayName = "ListingConsole";
