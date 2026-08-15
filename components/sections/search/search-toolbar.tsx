"use client";

import {
    SearchViewToggle,
    type ViewMode,
} from "@/components/sections/search/search-view-toggle";
import { SearchSortSelect } from "@/components/sections/search/search-sort-select";
import type { SortValue } from "@/lib/utils/search";

export type { ViewMode };

export const SEARCH_TOOLBAR_HEADING_ID = "search-results-heading";

interface SearchToolbarProps {
    resultCount: number;
    totalCount: number;
    view: ViewMode;
    onViewChange: (next: ViewMode) => void;
    sort: SortValue;
    onSortChange: (next: SortValue) => void;
}

export function SearchToolbar({
    resultCount,
    totalCount,
    view,
    onViewChange,
    sort,
    onSortChange,
}: SearchToolbarProps) {
    const narrowed = resultCount < totalCount;

    return (
        <div className="border-border-dark bg-background-alt flex min-h-11 flex-wrap items-center justify-between gap-2 border-b px-3 py-1.5">
            <h2
                id={SEARCH_TOOLBAR_HEADING_ID}
                className="flex items-baseline gap-1.5"
            >
                <span className="text-h6 font-display text-text leading-none font-light tabular-nums">
                    {resultCount}
                </span>
                <span className="text-text-secondary text-xs font-normal">
                    {resultCount === 1 ? "residence" : "residences"}
                </span>
                {narrowed && (
                    <span className="micro-label">of {totalCount}</span>
                )}
            </h2>

            <div className="flex flex-wrap items-center gap-2">
                <SearchViewToggle view={view} onChange={onViewChange} />
                <span
                    aria-hidden
                    className="bg-border h-5 w-px shrink-0 max-sm:hidden"
                />
                <SearchSortSelect value={sort} onChange={onSortChange} />
            </div>
        </div>
    );
}

SearchToolbar.displayName = "SearchToolbar";
