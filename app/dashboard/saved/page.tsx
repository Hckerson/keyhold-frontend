"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { SavedToolbar } from "@/components/features/dashboard/saved-toolbar";
import { SavedGrid } from "@/components/features/dashboard/saved-grid";
import { SavedList } from "@/components/features/dashboard/saved-list";
import {
    initialListings,
    type SavedListing,
    type SavedViewMode,
    type SortKey,
} from "@/lib/data/saved-listings";

export default function SavedListingsPage() {
    const [listings, setListings] = useState<SavedListing[]>(initialListings);
    const [sort, setSort] = useState<SortKey>("newest");
    const [view, setView] = useState<SavedViewMode>("list");

    const sorted = useMemo(() => {
        const copy = [...listings];
        if (sort === "price-asc") return copy.sort((a, b) => a.price - b.price);
        if (sort === "recently-viewed")
            return copy.sort((a, b) => a.viewedDaysAgo - b.viewedDaysAgo);
        return copy.sort((a, b) => a.savedDaysAgo - b.savedDaysAgo);
    }, [listings, sort]);

    const remove = (id: string) => {
        setListings((prev) => prev.filter((listing) => listing.id !== id));
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="Saved Listings"
                description={`${listings.length} propert${
                    listings.length === 1 ? "y" : "ies"
                } saved`}
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Continue Browsing
                        </Button>
                    </Link>
                }
            />

            {listings.length > 0 && (
                <SavedToolbar
                    sort={sort}
                    onSortChange={setSort}
                    view={view}
                    onViewChange={setView}
                />
            )}

            {listings.length === 0 && (
                <EmptyState
                    icon={Heart}
                    title="No saved listings yet"
                    description="Properties you save will appear here. Start exploring!"
                    action={
                        <Link href="/search">
                            <Button variant="primary" size="sm">
                                Start Browsing
                            </Button>
                        </Link>
                    }
                />
            )}

            {listings.length > 0 && view === "grid" && (
                <SavedGrid listings={sorted} onRemove={remove} />
            )}

            {listings.length > 0 && view === "list" && (
                <SavedList listings={sorted} onRemove={remove} />
            )}
        </div>
    );
}
