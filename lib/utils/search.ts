import {
    FILTER_GROUPS,
    type FilterGroupKey,
    type SearchFilters,
} from "@/lib/config/search-filters";
import type { Listing } from "@/lib/types";

export const SEARCH_PAGE_SIZE = 20;

export const SORT_OPTIONS = [
    { value: "newest", label: "Newest first" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "popular", label: "Most saved" },
];

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export function isSortValue(value: string): value is SortValue {
    return SORT_OPTIONS.some((option) => option.value === value);
}

function matchesPrice(listing: Listing, selected: string[]): boolean {
    if (selected.length === 0) return true;
    return selected.some((band) => {
        if (band === "under-1m") return listing.price < 1_000_000;
        if (band === "1m-2m")
            return listing.price >= 1_000_000 && listing.price < 2_000_000;
        if (band === "2m-5m")
            return listing.price >= 2_000_000 && listing.price < 5_000_000;
        return listing.price >= 5_000_000;
    });
}

function matchesCount(value: number, selected: string[]): boolean {
    if (selected.length === 0) return true;
    return selected.some((option) => {
        if (option.endsWith("plus")) {
            return value >= Number(option.replace("plus", ""));
        }
        return value === Number(option);
    });
}

function matchesLocation(listing: Listing, query: string): boolean {
    const term = query.trim().toLowerCase();
    if (!term) return true;
    return `${listing.address} ${listing.locality} ${listing.zipcode} ${listing.title}`
        .toLowerCase()
        .includes(term);
}

export function matchesSearchFilters(
    listing: Listing,
    filters: SearchFilters,
): boolean {
    return (
        matchesLocation(listing, filters.location) &&
        matchesPrice(listing, filters.price) &&
        matchesCount(listing.beds, filters.beds) &&
        matchesCount(listing.baths, filters.baths) &&
        (filters.type.length === 0 || filters.type.includes(listing.type))
    );
}

export function sortListings(listings: Listing[], sort: SortValue): Listing[] {
    const sorted = [...listings];
    if (sort === "price-asc") return sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return sorted.sort((a, b) => b.price - a.price);
    if (sort === "popular") return sorted.sort((a, b) => b.saves - a.saves);
    return sorted.sort((a, b) => a.listedDaysAgo - b.listedDaysAgo);
}

export function buildFilterCounts(
    listings: Listing[],
): Record<FilterGroupKey, Record<string, number>> {
    const counts: Record<FilterGroupKey, Record<string, number>> = {
        price: {},
        beds: {},
        baths: {},
        type: {},
    };

    for (const group of FILTER_GROUPS) {
        for (const option of group.options) {
            counts[group.key][option.id] = listings.filter((listing) => {
                if (group.key === "price")
                    return matchesPrice(listing, [option.id]);
                if (group.key === "beds")
                    return matchesCount(listing.beds, [option.id]);
                if (group.key === "baths")
                    return matchesCount(listing.baths, [option.id]);
                return listing.type === option.id;
            }).length;
        }
    }

    return counts;
}
