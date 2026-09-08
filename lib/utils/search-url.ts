import {
    EMPTY_FILTERS,
    PRICE_BANDS,
    type SearchFilters,
} from "@/lib/config/search-filters";
import {
    readList,
    readNumber,
    readOneOf,
    type UrlStateCodec,
} from "@/lib/hooks/use-url-state";
import { TOOLBAR_SORTS, type SortValue } from "@/lib/utils/search";

export const VIEW_MODES = ["grid", "list", "map"] as const;

export type SearchViewMode = (typeof VIEW_MODES)[number];

export interface SearchUrlState {
    filters: SearchFilters;
    sort: SortValue;
    view: SearchViewMode;
    page: number;
}

const LEGACY_MINIMUM_TO_BAND: Record<string, string> = {
    "1000000": "1000000-2000000",
    "5000000": "5000000-",
    "10000000": "5000000-",
};

const priceFrom = (params: URLSearchParams): string[] => {
    const explicit = readList(params, "price").filter((band) =>
        PRICE_BANDS.some((option) => option.id === band),
    );
    if (explicit.length) return explicit;

    const legacy = LEGACY_MINIMUM_TO_BAND[params.get("min") ?? ""];
    return legacy ? [legacy] : [];
};

export const EMPTY_SEARCH_URL_STATE: SearchUrlState = {
    filters: EMPTY_FILTERS,
    sort: "newest",
    view: "grid",
    page: 1,
};

export const SEARCH_URL_CODEC: UrlStateCodec<SearchUrlState> = {
    fromParams: (params) => ({
        filters: {
            location: params.get("q") ?? "",
            price: priceFrom(params),
            beds: readList(params, "beds"),
            baths: readList(params, "baths"),
            type: readList(params, "type").map((value) => value.toUpperCase()),
        },
        sort: readOneOf(params, "sort", TOOLBAR_SORTS, "newest"),
        view: readOneOf(params, "view", VIEW_MODES, "grid"),
        page: readNumber(params, "page", 1),
    }),

    toParams: ({ filters, sort, view, page }) => ({
        q: filters.location,
        price: filters.price,
        beds: filters.beds,
        baths: filters.baths,
        type: filters.type,
        sort: sort === "newest" ? undefined : sort,
        view: view === "grid" ? undefined : view,
        page: page > 1 ? page : undefined,
    }),
};
