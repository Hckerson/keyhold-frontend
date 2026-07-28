"use client";

import { useMemo, useState } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import {
    ListingManageRow,
    LISTING_STATUSES,
    type ListingStatus,
    type ManagedListing,
} from "@/components/dashboard/listing-manage-row";
import { cn } from "@/lib/utils";

type StatusFilter = ListingStatus | "all";

const FILTERS: { id: StatusFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "under-offer", label: "Under Offer" },
    { id: "sold", label: "Sold" },
    { id: "draft", label: "Draft" },
    { id: "expired", label: "Expired" },
];

const BULK_ACTIONS = ["publish", "draft", "renew", "delete"] as const;

type BulkAction = (typeof BULK_ACTIONS)[number];

const BULK_LABELS: Record<BulkAction, string> = {
    publish: "Publish",
    draft: "Move to Draft",
    renew: "Renew",
    delete: "Delete",
};

const initialListings: ManagedListing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        price: 3200000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        status: "active",
        listDate: "2024-06-15",
        views: 2840,
        saves: 164,
        showings: 12,
        offers: 2,
    },
    {
        id: "2",
        address: "789 Sunset Blvd, West Hollywood, CA",
        price: 2950000,
        beds: 3,
        baths: 2.5,
        sqft: 4800,
        status: "under-offer",
        listDate: "2024-05-20",
        views: 3610,
        saves: 221,
        showings: 8,
        offers: 1,
    },
    {
        id: "3",
        address: "234 Oak Street, Bel Air, CA",
        price: 4500000,
        beds: 5,
        baths: 4,
        sqft: 6500,
        status: "active",
        listDate: "2024-07-01",
        views: 1290,
        saves: 88,
        showings: 5,
        offers: 0,
    },
    {
        id: "4",
        address: "12 Canyon Ridge, Malibu, CA",
        price: 6750000,
        beds: 5,
        baths: 5.5,
        sqft: 7100,
        status: "draft",
        listDate: "2024-07-08",
        views: 0,
        saves: 0,
        showings: 0,
        offers: 0,
    },
    {
        id: "5",
        address: "890 Beverly Grove, Los Angeles, CA",
        price: 2400000,
        beds: 3,
        baths: 2,
        sqft: 3200,
        status: "sold",
        listDate: "2024-03-02",
        views: 5120,
        saves: 342,
        showings: 19,
        offers: 4,
    },
    {
        id: "6",
        address: "77 Hillcrest Terrace, Pasadena, CA",
        price: 1850000,
        beds: 4,
        baths: 3,
        sqft: 3900,
        status: "expired",
        listDate: "2023-11-14",
        views: 940,
        saves: 41,
        showings: 3,
        offers: 0,
    },
];

const today = () => new Date().toISOString().slice(0, 10);

export default function AgentListingsPage() {
    const [listings, setListings] = useState(initialListings);
    const [filter, setFilter] = useState<StatusFilter>("all");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const counts = useMemo(() => {
        const map = Object.fromEntries(
            FILTERS.map((item) => [item.id, 0]),
        ) as Record<StatusFilter, number>;
        map.all = listings.length;
        for (const listing of listings) map[listing.status] += 1;
        return map;
    }, [listings]);

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
        setListings((prev) => {
            if (action === "delete") {
                return prev.filter(
                    (listing) => !selectedIds.includes(listing.id),
                );
            }
            return prev.map((listing) => {
                if (!selectedIds.includes(listing.id)) return listing;
                if (action === "publish")
                    return { ...listing, status: "active" as ListingStatus };
                if (action === "draft")
                    return { ...listing, status: "draft" as ListingStatus };
                return {
                    ...listing,
                    status: "active" as ListingStatus,
                    listDate: today(),
                };
            });
        });
        setSelectedIds([]);
    };

    const activeCount = counts.active;

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Listings"
                description={`${activeCount} active · ${listings.length} total`}
                action={
                    <Button variant="primary" size="sm">
                        List New Property
                    </Button>
                }
            />

            <div className="flex flex-wrap items-center gap-2">
                {FILTERS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        aria-pressed={filter === item.id}
                        onClick={() => setFilter(item.id)}
                        className={cn(
                            "ease-smooth focus-visible:ring-accent inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                            filter === item.id
                                ? "border-accent bg-accent-light text-accent"
                                : "border-border bg-background text-text-secondary hover:text-text hover:border-border-dark",
                        )}
                    >
                        {item.label}
                        <span className="tabular-nums opacity-70">
                            {counts[item.id]}
                        </span>
                    </button>
                ))}
            </div>

            {visible.length > 0 && (
                <div className="border-border bg-background-muted flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleAll}
                            className="text-text-secondary hover:text-accent ease-smooth text-xs font-medium transition-colors duration-200"
                        >
                            {allVisibleSelected ? "Clear all" : "Select all"}
                        </button>
                        <span className="text-text-muted text-xs tabular-nums">
                            {selectedVisible.length} selected
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
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
                    </div>
                </div>
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
