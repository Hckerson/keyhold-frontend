"use client";

import { useMemo } from "react";
import {
    FILTER_GROUPS,
    type FilterGroupKey,
    type SearchFilters,
} from "@/lib/config/search-filters";
import { useProperties, usePropertyFacets } from "@/lib/hooks/use-properties";
import { toListing } from "@/lib/utils/to-listing";
import { toPropertyQuery, type SortValue } from "@/lib/utils/search";
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

export function useSearchResults(
    applied: SearchFilters,
    sort: SortValue,
    page: number,
) {
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

    return {
        listings,
        isPending,
        isError,
        refetch,
        resultCount,
        totalCount: catalogue?.total ?? resultCount,
        pageCount: data?.pageCount ?? 1,
        currentPage: data?.page ?? page,
        counts: facets ?? EMPTY_COUNTS,
    };
}
