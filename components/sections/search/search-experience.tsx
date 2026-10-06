"use client";

import { useMemo, useState } from "react";
import { SearchHeader } from "@/components/sections/search/search-header";
import { SearchFilterAside } from "@/components/sections/search/search-filter-aside";
import { SearchToolbar } from "@/components/sections/search/search-toolbar";
import { SearchResultsPanel } from "@/components/sections/search/search-results-panel";
import { SearchResultsBody } from "@/components/sections/search/search-results-body";
import { SearchActiveFilters } from "@/components/sections/search/search-active-filters";
import { Pager } from "@/components/patterns/pager";
import { EMPTY_FILTERS, type SearchFilters } from "@/lib/config/search-filters";
import { useUrlState } from "@/lib/hooks/use-url-state";
import { useSearchResults } from "@/lib/hooks/use-search-results";
import { SEARCH_URL_CODEC, type SearchViewMode } from "@/lib/utils/search-url";
import {
    buildActiveFilters,
    removeActiveFilter,
    SEARCH_PAGE_SIZE,
    type ActiveFilter,
    type SortValue,
} from "@/lib/utils/search";

export function SearchExperience() {
    const [urlState, setUrlState] = useUrlState(SEARCH_URL_CODEC);
    const { filters: applied, sort, view, page } = urlState;

    const [panelOpen, setPanelOpen] = useState(false);

    const appliedKey = JSON.stringify(applied);
    const [draft, setDraft] = useState<SearchFilters>(applied);
    const [draftSource, setDraftSource] = useState(appliedKey);

    if (draftSource !== appliedKey) {
        setDraftSource(appliedKey);
        setDraft(applied);
    }

    const results = useSearchResults(applied, sort, page);
    const { listings, resultCount, pageCount, currentPage } = results;

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

            <div className="filter-split gap-4">
                <SearchFilterAside
                    draft={draft}
                    counts={results.counts}
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
                            totalCount={results.totalCount}
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
                    <SearchResultsBody
                        resultsKey={resultsKey}
                        view={view}
                        listings={listings}
                        isPending={results.isPending}
                        isError={results.isError}
                        activeFilters={activeFilters}
                        onRetry={() => void results.refetch()}
                        onRemove={removeFilter}
                        onReset={reset}
                    />
                </SearchResultsPanel>
            </div>
        </div>
    );
}

SearchExperience.displayName = "SearchExperience";
