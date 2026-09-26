import {
    FILTER_GROUPS,
    type FilterGroupKey,
    type SearchFilters,
} from "@/lib/config/search-filters";
import { PROPERTY_SORT_LABELS } from "@/lib/enums/enums";
import type { PropertySort, PropertyType } from "@/lib/enums/enums";
import type { PropertyQuery } from "@/lib/validations/property";

export const SEARCH_PAGE_SIZE = 20;

export const TOOLBAR_SORTS: PropertySort[] = [
    "featured",
    "newest",
    "price-asc",
    "price-desc",
    "popular",
];

export const SORT_OPTIONS = TOOLBAR_SORTS.map((value) => ({
    value,
    label: PROPERTY_SORT_LABELS[value],
}));

export type SortValue = PropertySort;

export const DEFAULT_SEARCH_SORT: SortValue = "featured";

export interface ActiveFilter {
    key: FilterGroupKey | "location";
    id: string;
    group: string;
    label: string;
}

export function buildActiveFilters(filters: SearchFilters): ActiveFilter[] {
    const active: ActiveFilter[] = [];
    const location = filters.location.trim();

    if (location) {
        active.push({
            key: "location",
            id: location,
            group: "Location",
            label: location,
        });
    }

    for (const group of FILTER_GROUPS) {
        for (const option of group.options) {
            if (filters[group.key].includes(option.id)) {
                active.push({
                    key: group.key,
                    id: option.id,
                    group: group.label,
                    label: option.label,
                });
            }
        }
    }

    return active;
}

export function removeActiveFilter(
    filters: SearchFilters,
    target: ActiveFilter,
): SearchFilters {
    if (target.key === "location") return { ...filters, location: "" };
    return {
        ...filters,
        [target.key]: filters[target.key].filter((id) => id !== target.id),
    };
}

export function toPropertyQuery(
    filters: SearchFilters,
    sort: SortValue,
    page: number,
): PropertyQuery {
    const location = filters.location.trim();

    return {
        status: "AVAILABLE",
        q: location || undefined,
        priceRanges: filters.price.length ? filters.price : undefined,
        beds: filters.beds.length ? filters.beds : undefined,
        baths: filters.baths.length ? filters.baths : undefined,
        types: filters.type.length
            ? (filters.type as PropertyType[])
            : undefined,
        sort,
        page,
        limit: SEARCH_PAGE_SIZE,
    };
}
