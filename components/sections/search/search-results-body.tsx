"use client";

import { AnimatePresence, m } from "motion/react";
import { SearchResultsGrid } from "@/components/sections/search/search-results-grid";
import { SearchResultsMap } from "@/components/sections/search/search-results-map";
import { SearchResultsList } from "@/components/sections/search/search-results-list";
import { SearchResultsGridSkeleton } from "@/components/sections/search/search-results-grid-skeleton";
import { SearchResultsError } from "@/components/sections/search/search-results-error";
import { SearchEmpty } from "@/components/sections/search/search-empty";
import { SEARCH_RESULTS_MOTION } from "@/lib/config/public-motion";
import type { SearchViewMode } from "@/lib/utils/search-url";
import type { ActiveFilter } from "@/lib/utils/search";
import type { Listing } from "@/lib/types";

export interface SearchResultsBodyProps {
    resultsKey: string;
    view: SearchViewMode;
    listings: Listing[];
    isPending: boolean;
    isError: boolean;
    activeFilters: ActiveFilter[];
    onRetry: () => void;
    onRemove: (filter: ActiveFilter) => void;
    onReset: () => void;
}

export function SearchResultsBody({
    resultsKey,
    view,
    listings,
    isPending,
    isError,
    activeFilters,
    onRetry,
    onRemove,
    onReset,
}: SearchResultsBodyProps) {
    return (
        <AnimatePresence mode="wait">
            <m.div
                key={isPending ? "loading" : resultsKey}
                variants={SEARCH_RESULTS_MOTION}
                initial="hidden"
                animate="visible"
                exit="gone"
            >
                {isPending ? (
                    <SearchResultsGridSkeleton />
                ) : isError ? (
                    <SearchResultsError onRetry={onRetry} />
                ) : listings.length === 0 ? (
                    <SearchEmpty
                        activeFilters={activeFilters}
                        onRemove={onRemove}
                        onReset={onReset}
                    />
                ) : view === "grid" ? (
                    <SearchResultsGrid listings={listings} />
                ) : view === "map" ? (
                    <SearchResultsMap listings={listings} />
                ) : (
                    <SearchResultsList listings={listings} />
                )}
            </m.div>
        </AnimatePresence>
    );
}

SearchResultsBody.displayName = "SearchResultsBody";
