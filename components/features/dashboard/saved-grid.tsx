"use client";

import Link from "next/link";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/features/listings/property-card";
import { relativeDays, type SavedListing } from "@/lib/data/saved-listings";

export interface SavedGridProps {
    listings: SavedListing[];
    onRemove: (id: string) => void;
}

export function SavedGrid({ listings, onRemove }: SavedGridProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
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
                        onSaveChange={() => onRemove(listing.id)}
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
                                    <Button variant="secondary" size="sm">
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
                                onClick={() => onRemove(listing.id)}
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
    );
}

SavedGrid.displayName = "SavedGrid";
