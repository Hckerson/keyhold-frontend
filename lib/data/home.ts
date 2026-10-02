import { LISTABLE_TYPES, PRICE_BANDS } from "@/lib/config/search-filters";
import type { FacetOptions } from "@/lib/api/properties";
import type { HomeStat } from "@/lib/types";
import type {
    LocalityCount,
    Property,
    PropertyQuery,
} from "@/lib/validations/property";
import { formatCount } from "@/lib/utils/format";

const SHOWCASE_COUNT = 6;
const JUST_LISTED_COUNT = 4;
const SALES_COUNT = 4;
const POPULAR_CITY_COUNT = 5;

export const MIN_HOME_STATS = 2;

export const HOME_QUERIES = {
    promoted: {
        status: "AVAILABLE",
        featured: true,
        sort: "popular",
        limit: SHOWCASE_COUNT,
    },
    popular: { status: "AVAILABLE", sort: "popular", limit: SHOWCASE_COUNT },
    newest: {
        status: "AVAILABLE",
        sort: "newest",
        limit: SHOWCASE_COUNT + JUST_LISTED_COUNT,
    },
    sold: { status: "SOLD", sort: "recently-sold", limit: SALES_COUNT },
} satisfies Record<string, PropertyQuery>;

export const HOME_FACET_FILTERS: PropertyQuery = { status: "AVAILABLE" };

export const HOME_FACET_OPTIONS: FacetOptions = {
    price: PRICE_BANDS.map((band) => band.id),
    beds: [],
    baths: [],
    type: LISTABLE_TYPES,
};

export const HOME_COPY = {
    stats: {
        available: "Homes on the market",
        sold: "Homes sold here",
        localities: "Neighbourhoods",
    },
    browse: {
        eyebrow: "Browse the market",
        title: "Start where you already know",
        type: "By type",
        price: "By price",
        locality: "By neighbourhood",
    },
    gallery: {
        eyebrow: (count: number) => `On the market · ${count} homes`,
        title: "Featured and most viewed",
        viewAll: "View all",
    },
    justListed: {
        eyebrow: "Just listed",
        title: "New to the market",
    },
    unavailable: {
        title: "Listings are unavailable right now",
        description:
            "We could not reach the listings service. Search may still work, or try again in a few minutes.",
        action: "Go to search",
    },
} as const;

const uniqueById = (properties: Property[]) =>
    properties.filter(
        (property, index, all) =>
            all.findIndex((other) => other.id === property.id) === index,
    );

export const selectShowcase = (promoted: Property[], popular: Property[]) =>
    uniqueById([...promoted, ...popular]).slice(0, SHOWCASE_COUNT);

export const selectJustListed = (newest: Property[], shown: Property[]) => {
    const shownIds = new Set(shown.map((property) => property.id));
    return newest
        .filter((property) => !shownIds.has(property.id))
        .slice(0, JUST_LISTED_COUNT);
};

export const selectPopularCities = (localities: LocalityCount[]) =>
    [...new Set(localities.map((entry) => entry.locality))].slice(
        0,
        POPULAR_CITY_COUNT,
    );

export const toHomeStats = (counts: {
    available?: number;
    sold?: number;
    localities?: number;
}): HomeStat[] =>
    (
        [
            [counts.available, HOME_COPY.stats.available],
            [counts.sold, HOME_COPY.stats.sold],
            [counts.localities, HOME_COPY.stats.localities],
        ] as const
    ).flatMap(([count, label]) =>
        count ? [{ value: formatCount(count), label }] : [],
    );
