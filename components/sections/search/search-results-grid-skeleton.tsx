import { SearchCardSkeleton } from "@/components/sections/search/search-card-skeleton";

const CARD_SLOTS = [0, 1, 2, 3, 4, 5];

export function SearchResultsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {CARD_SLOTS.map((slot) => (
                <SearchCardSkeleton key={slot} />
            ))}
        </div>
    );
}

SearchResultsGridSkeleton.displayName = "SearchResultsGridSkeleton";
