"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchHeader } from "@/components/sections/search/search-header";
import { SearchRail } from "@/components/sections/search/search-rail";
import {
    SearchToolbar,
    type ViewMode,
} from "@/components/sections/search/search-toolbar";
import { SearchResultsPanel } from "@/components/sections/search/search-results-panel";
import { SearchResultsGrid } from "@/components/sections/search/search-results-grid";
import { SearchResultsList } from "@/components/sections/search/search-results-list";
import { SearchEmpty } from "@/components/sections/search/search-empty";
import { SearchActiveFilters } from "@/components/sections/search/search-active-filters";
import { SearchPagination } from "@/components/sections/search/search-pagination";
import { EMPTY_FILTERS, type SearchFilters } from "@/lib/config/search-filters";
import { AVAILABLE_LISTINGS } from "@/lib/data/listings";
import {
    SEARCH_PAGE_SIZE,
    buildActiveFilters,
    buildFilterCounts,
    matchesSearchFilters,
    removeActiveFilter,
    sortListings,
    type ActiveFilter,
    type SortValue,
} from "@/lib/utils/search";
import { cn } from "@/lib/utils";

const COUNTS = buildFilterCounts(AVAILABLE_LISTINGS);

interface SearchExperienceProps {
    initialFilters: SearchFilters;
}

export function SearchExperience({ initialFilters }: SearchExperienceProps) {
    const [draft, setDraft] = useState<SearchFilters>(initialFilters);
    const [applied, setApplied] = useState<SearchFilters>(initialFilters);
    const [sort, setSort] = useState<SortValue>("newest");
    const [view, setView] = useState<ViewMode>("grid");
    const [page, setPage] = useState(1);
    const [panelOpen, setPanelOpen] = useState(false);

    const results = useMemo(
        () =>
            sortListings(
                AVAILABLE_LISTINGS.filter((listing) =>
                    matchesSearchFilters(listing, applied),
                ),
                sort,
            ),
        [applied, sort],
    );

    const pageCount = Math.max(1, Math.ceil(results.length / SEARCH_PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const visible = results.slice(
        (currentPage - 1) * SEARCH_PAGE_SIZE,
        currentPage * SEARCH_PAGE_SIZE,
    );

    const dirty = JSON.stringify(draft) !== JSON.stringify(applied);
    const activeFilters = useMemo(() => buildActiveFilters(applied), [applied]);

    const apply = () => {
        setApplied(draft);
        setPage(1);
        setPanelOpen(false);
    };

    const removeFilter = (filter: ActiveFilter) => {
        const next = removeActiveFilter(applied, filter);
        setDraft(next);
        setApplied(next);
        setPage(1);
    };

    const reset = () => {
        setDraft(EMPTY_FILTERS);
        setApplied(EMPTY_FILTERS);
        setPage(1);
    };

    const changeSort = (next: SortValue) => {
        setSort(next);
        setPage(1);
    };

    const goToPage = (next: number) => {
        setPage(Math.min(Math.max(next, 1), pageCount));
    };

    return (
        <div className="flex w-full flex-col gap-4">
            <SearchHeader location={applied.location} />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
                <aside className="lg:col-span-1">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setPanelOpen((open) => !open)}
                        className="w-full lg:hidden"
                        icon={<SlidersHorizontal size={12} strokeWidth={1.5} />}
                    >
                        {panelOpen ? "Hide filters" : "Filters"}
                    </Button>

                    <div
                        className={cn(
                            "mt-2 lg:mt-0",
                            panelOpen ? "block" : "hidden lg:block",
                        )}
                    >
                        <SearchRail
                            draft={draft}
                            counts={COUNTS}
                            dirty={dirty}
                            onChange={setDraft}
                            onApply={apply}
                            onReset={reset}
                        />
                    </div>
                </aside>

                <SearchResultsPanel
                    toolbar={
                        <SearchToolbar
                            resultCount={results.length}
                            totalCount={AVAILABLE_LISTINGS.length}
                            view={view}
                            onViewChange={setView}
                            sort={sort}
                            onSortChange={changeSort}
                        />
                    }
                    filters={
                        <SearchActiveFilters
                            filters={activeFilters}
                            onRemove={removeFilter}
                            onClear={reset}
                        />
                    }
                    footer={
                        results.length > 0 && (
                            <SearchPagination
                                currentPage={currentPage}
                                pageCount={pageCount}
                                visibleCount={visible.length}
                                resultCount={results.length}
                                onPageChange={goToPage}
                            />
                        )
                    }
                >
                    {visible.length === 0 ? (
                        <SearchEmpty
                            activeFilters={activeFilters}
                            onRemove={removeFilter}
                            onReset={reset}
                        />
                    ) : view === "grid" ? (
                        <SearchResultsGrid listings={visible} />
                    ) : (
                        <SearchResultsList listings={visible} />
                    )}
                </SearchResultsPanel>
            </div>
        </div>
    );
}

SearchExperience.displayName = "SearchExperience";
