"use client";

import { useMemo, useState } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterPills } from "@/components/patterns/filter-pills";
import { BulkToolbar } from "@/components/patterns/bulk-toolbar";
import {
    ListingManageRow,
    LISTING_STATUSES,
} from "@/components/features/agent/listing-manage-row";
import {
    BULK_ACTIONS,
    BULK_LABELS,
    FILTERS,
    applyBulkAction,
    countByStatus,
    initialListings,
    type BulkAction,
    type StatusFilter,
} from "@/lib/data/agent-listings";

export default function AgentListingsPage() {
    const [listings, setListings] = useState(initialListings);
    const [filter, setFilter] = useState<StatusFilter>("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const counts = useMemo(() => countByStatus(listings), [listings]);

    const visible = useMemo(
        () =>
            filter === "all"
                ? listings
                : listings.filter((listing) => listing.status === filter),
        [listings, filter],
    );

    const selectedVisible = visible.filter((listing) =>
        selectedIds.includes(listing.id),
    );
    const allVisibleSelected =
        visible.length > 0 && selectedVisible.length === visible.length;

    const toggleOne = (id: string, isSelected: boolean) =>
        setSelectedIds((prev) =>
            isSelected ? [...prev, id] : prev.filter((item) => item !== id),
        );

    const toggleAll = () =>
        setSelectedIds(
            allVisibleSelected ? [] : visible.map((listing) => listing.id),
        );

    const applyBulk = (action: BulkAction) => {
        setListings((prev) => applyBulkAction(prev, selectedIds, action));
        setSelectedIds([]);
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="My Listings"
                description={`${counts.active} active · ${listings.length} total`}
                action={
                    <Button variant="primary" size="sm">
                        List New Property
                    </Button>
                }
            />

            <FilterPills<StatusFilter>
                filters={FILTERS}
                active={filter}
                onChange={setFilter}
                counts={counts}
            />

            {visible.length > 0 && (
                <BulkToolbar
                    selectedCount={selectedVisible.length}
                    allSelected={allVisibleSelected}
                    onToggleAll={toggleAll}
                >
                    {BULK_ACTIONS.map((action) => (
                        <Button
                            key={action}
                            type="button"
                            size="sm"
                            variant={
                                action === "delete"
                                    ? "outline-danger"
                                    : "secondary"
                            }
                            disabled={selectedIds.length === 0}
                            onClick={() => applyBulk(action)}
                        >
                            {BULK_LABELS[action]}
                        </Button>
                    ))}
                </BulkToolbar>
            )}

            {visible.length > 0 ? (
                <div className="space-y-3">
                    {visible.map((listing) => (
                        <ListingManageRow
                            key={listing.id}
                            listing={listing}
                            selected={selectedIds.includes(listing.id)}
                            onSelectedChange={toggleOne}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={Home}
                    title={
                        filter === "all"
                            ? "No listings yet"
                            : `No ${LISTING_STATUSES[filter].label.toLowerCase()} listings`
                    }
                    description="Properties you list will appear here."
                    action={
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setFilter("all")}
                        >
                            {filter === "all"
                                ? "List New Property"
                                : "Show all listings"}
                        </Button>
                    }
                />
            )}
        </div>
    );
}
