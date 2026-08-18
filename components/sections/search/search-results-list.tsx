"use client";

import { m } from "motion/react";
import { ListingRow } from "@/components/features/listings/listing-row";
import { SEARCH_RESULT_MOTION } from "@/lib/config/public-motion";
import type { Listing } from "@/lib/types";

interface SearchResultsListProps {
    listings: Listing[];
}

export function SearchResultsList({ listings }: SearchResultsListProps) {
    return (
        <div className="flex flex-col gap-2">
            {listings.map((listing) => (
                <m.div key={listing.id} variants={SEARCH_RESULT_MOTION}>
                    <ListingRow
                        listing={{
                            imageUrl: listing.images[0],
                            address: `${listing.address}, ${listing.locality}`,
                            price: listing.price,
                            beds: listing.beds,
                            baths: listing.baths,
                            sqft: listing.sqft,
                        }}
                        href={`/listing/${listing.id}`}
                        meta={`${listing.agent.name} · listed ${listing.listedDaysAgo} days ago`}
                    />
                </m.div>
            ))}
        </div>
    );
}

SearchResultsList.displayName = "SearchResultsList";
