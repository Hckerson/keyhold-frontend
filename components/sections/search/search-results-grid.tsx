import { SearchResultCard } from "@/components/sections/search/search-result-card";
import type { Listing } from "@/lib/types";

interface SearchResultsGridProps {
    listings: Listing[];
}

export function SearchResultsGrid({ listings }: SearchResultsGridProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
                <SearchResultCard
                    key={listing.id}
                    listing={listing}
                    href={`/listing/${listing.id}`}
                />
            ))}
        </div>
    );
}

SearchResultsGrid.displayName = "SearchResultsGrid";
