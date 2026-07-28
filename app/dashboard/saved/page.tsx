"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Trash2, Heart, LayoutGrid, Rows3, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ListingRow } from "@/components/ui/listing-row";
import { PropertyCard } from "@/components/ui/property-card";
import { EmptyState } from "@/components/ui/empty-state";
import { propertyImages } from "@/lib/config/sample-images";

type SortKey = "newest" | "price-asc" | "recently-viewed";
type ViewMode = "grid" | "list";

interface SavedListing {
    id: string;
    image: string;
    address: string;
    locality: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    savedDaysAgo: number;
    viewedDaysAgo: number;
    offerId?: string;
}

const sortOptions: { value: SortKey; label: string }[] = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price Low-High" },
    { value: "recently-viewed", label: "Recently Viewed" },
];

const viewOptions: { value: ViewMode; label: string; icon: typeof Rows3 }[] = [
    { value: "grid", label: "Grid", icon: LayoutGrid },
    { value: "list", label: "List", icon: Rows3 },
];

const microLabel =
    "text-text-muted font-mono text-[10px] font-medium tracking-wide uppercase";

const initialListings: SavedListing[] = [
    {
        id: "1",
        image: propertyImages[0],
        address: "456 Oak Avenue",
        locality: "Beverly Hills, CA",
        price: 3200000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        savedDaysAgo: 2,
        viewedDaysAgo: 1,
        offerId: "1",
    },
    {
        id: "2",
        image: propertyImages[1],
        address: "789 Sunset Blvd",
        locality: "West Hollywood, CA",
        price: 2950000,
        beds: 3,
        baths: 2.5,
        sqft: 4800,
        savedDaysAgo: 5,
        viewedDaysAgo: 4,
        offerId: "2",
    },
    {
        id: "3",
        image: propertyImages[2],
        address: "234 Oak Street",
        locality: "Bel Air, CA",
        price: 4500000,
        beds: 5,
        baths: 4,
        sqft: 6500,
        savedDaysAgo: 7,
        viewedDaysAgo: 0,
        offerId: "3",
    },
    {
        id: "4",
        image: propertyImages[3],
        address: "567 Palm Drive",
        locality: "Malibu, CA",
        price: 2750000,
        beds: 3,
        baths: 3,
        sqft: 3900,
        savedDaysAgo: 12,
        viewedDaysAgo: 6,
    },
];

const relativeDays = (days: number) => {
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
};

export default function SavedListingsPage() {
    const [listings, setListings] = useState<SavedListing[]>(initialListings);
    const [sort, setSort] = useState<SortKey>("newest");
    const [view, setView] = useState<ViewMode>("list");

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
                <div className="bg-background-muted border-border-light flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3">
                    <div
                        role="group"
                        aria-label="Sort saved listings"
                        className="flex flex-wrap items-center gap-2"
                    >
                        <span className={microLabel}>Sort</span>
                        {sortOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant={
                                    sort === option.value ? "primary" : "ghost"
                                }
                                size="sm"
                                aria-pressed={sort === option.value}
                                onClick={() => setSort(option.value)}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </div>

                    <div
                        role="group"
                        aria-label="Change layout"
                        className="flex items-center gap-2"
                    >
                        <span className={microLabel}>View</span>
                        {viewOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <Button
                                    key={option.value}
                                    variant={
                                        view === option.value
                                            ? "primary"
                                            : "ghost"
                                    }
                                    size="sm"
                                    aria-pressed={view === option.value}
                                    onClick={() => setView(option.value)}
                                >
                                    <Icon
                                        size={12}
                                        strokeWidth={1.5}
                                        className="mr-1.5"
                                    />
                                    {option.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
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
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {sorted.map((listing) => (
                        <div key={listing.id} className="flex flex-col gap-2">
                            <PropertyCard
                                property={{
                                    id: listing.id,
                                    price: listing.price,
                                    address: listing.address,
                                    locality: listing.locality,
                                    beds: listing.beds,
                                    baths: listing.baths,
                                    sqft: listing.sqft,
                                    imageUrl: listing.image,
                                }}
                                href={`/listing/${listing.id}`}
                                saved
                                onSaveChange={() => remove(listing.id)}
                            />
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-text-muted text-xs">
                                    Saved {relativeDays(listing.savedDaysAgo)}
                                </span>
                                <div className="flex items-center gap-2">
                                    {listing.offerId && (
                                        <Link
                                            href={`/dashboard/offers/${listing.offerId}`}
                                        >
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                            >
                                                <FileText
                                                    size={12}
                                                    strokeWidth={1.5}
                                                    className="mr-1.5"
                                                />
                                                View offer
                                            </Button>
                                        </Link>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-error hover:text-error"
                                        onClick={() => remove(listing.id)}
                                    >
                                        <Trash2
                                            size={12}
                                            strokeWidth={1.5}
                                            className="mr-1.5"
                                        />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {listings.length > 0 && view === "list" && (
                <div className="space-y-3">
                    {sorted.map((listing) => (
                        <ListingRow
                            key={listing.id}
                            href={`/listing/${listing.id}`}
                            listing={{
                                imageUrl: listing.image,
                                address: `${listing.address}, ${listing.locality}`,
                                price: listing.price,
                                beds: listing.beds,
                                baths: listing.baths,
                                sqft: listing.sqft,
                            }}
                            meta={`Saved ${relativeDays(
                                listing.savedDaysAgo,
                            )} · Viewed ${relativeDays(listing.viewedDaysAgo)}`}
                            actions={
                                <>
                                    <Link
                                        href={`/listing/${listing.id}`}
                                        className="block"
                                    >
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="w-full sm:w-28"
                                        >
                                            View Details
                                        </Button>
                                    </Link>
                                    {listing.offerId && (
                                        <Link
                                            href={`/dashboard/offers/${listing.offerId}`}
                                            className="block"
                                        >
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="w-full sm:w-28"
                                            >
                                                View offer
                                            </Button>
                                        </Link>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-error hover:text-error w-full sm:w-28"
                                        onClick={() => remove(listing.id)}
                                    >
                                        <Trash2
                                            size={12}
                                            strokeWidth={1.5}
                                            className="mr-1.5"
                                        />
                                        Remove
                                    </Button>
                                </>
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
