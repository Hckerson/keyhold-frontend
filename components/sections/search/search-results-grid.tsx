"use client";

import { m } from "motion/react";
import { SearchResultCard } from "@/components/sections/search/search-result-card";
import { SEARCH_RESULT_MOTION } from "@/lib/config/public-motion";
import type { Listing } from "@/lib/types";

interface SearchResultsGridProps {
    listings: Listing[];
}

export function SearchResultsGrid({ listings }: SearchResultsGridProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
                <m.div key={listing.id} variants={SEARCH_RESULT_MOTION}>
                    <SearchResultCard
                        listing={listing}
                        href={`/listing/${listing.id}`}
                        className="h-full"
                    />
                </m.div>
            ))}
        </div>
    );
}

SearchResultsGrid.displayName = "SearchResultsGrid";
