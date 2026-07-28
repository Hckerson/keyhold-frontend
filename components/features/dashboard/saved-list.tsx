"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListingRow } from "@/components/features/listings/listing-row";
import { relativeDays, type SavedListing } from "@/lib/data/saved-listings";

export interface SavedListProps {
    listings: SavedListing[];
    onRemove: (id: string) => void;
}

export function SavedList({ listings, onRemove }: SavedListProps) {
    return (
        <div className="space-y-3">
            {listings.map((listing) => (
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
                                onClick={() => onRemove(listing.id)}
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
    );
}

SavedList.displayName = "SavedList";
