"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { SearchHeader } from "@/components/sections/search/search-header";
import { SearchFilterAside } from "@/components/sections/search/search-filter-aside";
import { SearchToolbar } from "@/components/sections/search/search-toolbar";
import { SearchResultsPanel } from "@/components/sections/search/search-results-panel";
import { SearchResultsGrid } from "@/components/sections/search/search-results-grid";
import { SearchResultsMap } from "@/components/sections/search/search-results-map";
import { SearchResultsList } from "@/components/sections/search/search-results-list";
import { SearchResultsGridSkeleton } from "@/components/sections/search/search-skeleton";
import { SearchResultsError } from "@/components/sections/search/search-results-error";
import { SearchEmpty } from "@/components/sections/search/search-empty";
import { SearchActiveFilters } from "@/components/sections/search/search-active-filters";
import { Pager } from "@/components/patterns/pager";
import { SEARCH_RESULTS_MOTION } from "@/lib/config/public-motion";
import {
    EMPTY_FILTERS,
    FILTER_GROUPS,
    type FilterGroupKey,
    type SearchFilters,
} from "@/lib/config/search-filters";
import { useUrlState } from "@/lib/hooks/use-url-state";
import { SEARCH_URL_CODEC, type SearchViewMode } from "@/lib/utils/search-url";
import { useProperties, usePropertyFacets } from "@/lib/hooks/use-properties";
import { toListing } from "@/lib/utils/to-listing";
import {
    buildActiveFilters,
    removeActiveFilter,
    toPropertyQuery,
    SEARCH_PAGE_SIZE,
    type ActiveFilter,
    type SortValue,
} from "@/lib/utils/search";
import type { FacetOptions } from "@/lib/api/properties";
import type { PropertyType } from "@/lib/enums/enums";

const optionIds = (key: FilterGroupKey) =>
    FILTER_GROUPS.find((group) => group.key === key)?.options.map(
        (option) => option.id,
    ) ?? [];

const FACET_OPTIONS: FacetOptions = {
    price: optionIds("price"),
    beds: optionIds("beds"),
    baths: optionIds("baths"),
    type: optionIds("type") as PropertyType[],
};

const EMPTY_COUNTS: Record<FilterGroupKey, Record<string, number>> = {
    price: {},
    beds: {},
    baths: {},
    type: {},
};

const CATALOGUE_QUERY = { status: "AVAILABLE", limit: 1 } as const;

export function SearchExperience() {
    const [urlState, setUrlState] = useUrlState(SEARCH_URL_CODEC);
    const { filters: applied, sort, view, page } = urlState;

    const [panelOpen, setPanelOpen] = useState(false);

    const appliedKey = JSON.stringify(applied);
    const [draft, setDraft] = useState<SearchFilters>(applied);

    useEffect(() => {
        setDraft(JSON.parse(appliedKey) as SearchFilters);
    }, [appliedKey]);

    const query = useMemo(
        () => toPropertyQuery(applied, sort, page),
        [applied, sort, page],
    );

    const facetQuery = useMemo(
        () => toPropertyQuery(applied, sort, 1),
        [applied, sort],
    );

    const { data, isPending, isError, refetch } = useProperties(query);
    const { data: facets } = usePropertyFacets(facetQuery, FACET_OPTIONS);
    const { data: catalogue } = useProperties(CATALOGUE_QUERY);

    const listings = useMemo(
        () => (data?.items ?? []).map(toListing),
        [data?.items],
    );

    const resultCount = data?.total ?? 0;
    const pageCount = data?.pageCount ?? 1;
    const currentPage = data?.page ?? page;
    const counts = facets ?? EMPTY_COUNTS;

    const dirty = JSON.stringify(draft) !== appliedKey;
    const activeFilters = useMemo(() => buildActiveFilters(applied), [applied]);
    const resultsKey = `${view}|${sort}|${currentPage}|${appliedKey}`;

    const applyFilters = (next: SearchFilters) =>
        setUrlState({ ...urlState, filters: next, page: 1 });

    const apply = () => {
        applyFilters(draft);
        setPanelOpen(false);
    };

    const removeFilter = (filter: ActiveFilter) =>
        applyFilters(removeActiveFilter(applied, filter));

    const reset = () => applyFilters(EMPTY_FILTERS);

    const changeSort = (next: SortValue) =>
        setUrlState({ ...urlState, sort: next, page: 1 });

    const changeView = (next: SearchViewMode) =>
        setUrlState({ ...urlState, view: next });

    const goToPage = (next: number) =>
        setUrlState({
            ...urlState,
            page: Math.min(Math.max(next, 1), pageCount),
        });

    return (
        <div className="flex w-full flex-col gap-4">
            <SearchHeader location={applied.location} />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
                <SearchFilterAside
                    draft={draft}
                    counts={counts}
                    dirty={dirty}
                    open={panelOpen}
                    onToggle={() => setPanelOpen((open) => !open)}
                    onChange={setDraft}
                    onApply={apply}
                    onReset={reset}
                />

                <SearchResultsPanel
                    toolbar={
                        <SearchToolbar
                            resultCount={resultCount}
                            totalCount={catalogue?.total ?? resultCount}
                            view={view}
                            onViewChange={changeView}
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
                        resultCount > 0 && (
                            <Pager
                                currentPage={currentPage}
                                pageCount={pageCount}
                                pageSize={SEARCH_PAGE_SIZE}
                                visibleCount={listings.length}
                                totalCount={resultCount}
                                onPageChange={goToPage}
                                className="border-border-dark border-t px-3 py-2"
                            />
                        )
                    }
                >
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
                                <SearchResultsError
                                    onRetry={() => void refetch()}
                                />
                            ) : listings.length === 0 ? (
                                <SearchEmpty
                                    activeFilters={activeFilters}
                                    onRemove={removeFilter}
                                    onReset={reset}
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
                </SearchResultsPanel>
            </div>
        </div>
    );
}

SearchExperience.displayName = "SearchExperience";
