"use client";

import { useMemo, useState } from "react";
import { SearchFilterAside } from "@/components/sections/search/search-filter-aside";
import { SearchResultsMap } from "@/components/sections/search/search-results-map";
import { SearchResultsError } from "@/components/sections/search/search-results-error";
import { SearchEmpty } from "@/components/sections/search/search-empty";
import { MapLegend } from "@/components/sections/search/map-legend";
import { PortalHeader } from "@/components/patterns/portal-header";
import { Skeleton } from "@/components/ui/skeleton";
import {
    EMPTY_FILTERS,
    FILTER_GROUPS,
    type FilterGroupKey,
    type SearchFilters,
} from "@/lib/config/search-filters";
import type { MapBounds } from "@/lib/config/map";
import { useUrlState } from "@/lib/hooks/use-url-state";
import { SEARCH_URL_CODEC } from "@/lib/utils/search-url";
import { useProperties, usePropertyFacets } from "@/lib/hooks/use-properties";
import { toListing } from "@/lib/utils/to-listing";
import {
    buildActiveFilters,
    removeActiveFilter,
    toPropertyQuery,
    type ActiveFilter,
} from "@/lib/utils/search";
import type { FacetOptions } from "@/lib/api/properties";
import type { PropertyType } from "@/lib/enums/enums";

const MAP_TITLE = "Map View";
const MAP_LEDE = "Every residence in the collection, placed";
const MAP_PAGE_SIZE = 200;

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

export function MapExperience() {
    const [urlState, setUrlState] = useUrlState(SEARCH_URL_CODEC);
    const { filters: applied, sort } = urlState;

    const [bounds, setBounds] = useState<MapBounds>();
    const [panelOpen, setPanelOpen] = useState(false);
    const appliedKey = JSON.stringify(applied);
    const [draft, setDraft] = useState<SearchFilters>(applied);
    const [draftSource, setDraftSource] = useState(appliedKey);

    if (draftSource !== appliedKey) {
        setDraftSource(appliedKey);
        setDraft(applied);
    }

    const query = useMemo(
        () => ({
            ...toPropertyQuery(applied, sort, 1),
            ...bounds,
            limit: MAP_PAGE_SIZE,
        }),
        [applied, sort, bounds],
    );

    const { data, isPending, isError, refetch } = useProperties(query);
    const { data: facets } = usePropertyFacets(query, FACET_OPTIONS);

    const listings = useMemo(
        () => (data?.items ?? []).map(toListing),
        [data?.items],
    );

    const activeFilters = useMemo(() => buildActiveFilters(applied), [applied]);
    const dirty = JSON.stringify(draft) !== appliedKey;

    const applyFilters = (next: SearchFilters) =>
        setUrlState({ ...urlState, filters: next, page: 1 });

    const apply = () => {
        applyFilters(draft);
        setPanelOpen(false);
    };

    const reset = () => applyFilters(EMPTY_FILTERS);

    const removeFilter = (filter: ActiveFilter) =>
        applyFilters(removeActiveFilter(applied, filter));

    return (
        <div className="flex w-full flex-col gap-4">
            <PortalHeader
                title={MAP_TITLE}
                lede={MAP_LEDE}
                summary={`${data?.total ?? 0} placed`}
            />

            <div className="filter-split gap-4">
                <SearchFilterAside
                    draft={draft}
                    counts={facets ?? EMPTY_COUNTS}
                    dirty={dirty}
                    open={panelOpen}
                    onToggle={() => setPanelOpen((open) => !open)}
                    onChange={setDraft}
                    onApply={apply}
                    onReset={reset}
                />

                <div className="flex flex-col gap-2">
                    <MapLegend />

                    {isPending ? (
                        <Skeleton className="h-[32rem] w-full rounded-md" />
                    ) : isError ? (
                        <SearchResultsError onRetry={() => void refetch()} />
                    ) : listings.length === 0 && !bounds ? (
                        <SearchEmpty
                            activeFilters={activeFilters}
                            onRemove={removeFilter}
                            onReset={reset}
                        />
                    ) : (
                        <SearchResultsMap
                            listings={listings}
                            fit={!bounds}
                            onSearchArea={setBounds}
                            onClearArea={
                                bounds ? () => setBounds(undefined) : undefined
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

MapExperience.displayName = "MapExperience";
