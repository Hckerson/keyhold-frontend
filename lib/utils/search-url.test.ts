import { describe, expect, it } from "vitest";
import { EMPTY_FILTERS } from "@/lib/config/search-filters";
import {
    SEARCH_URL_CODEC,
    EMPTY_SEARCH_URL_STATE,
} from "@/lib/utils/search-url";
import { DEFAULT_SEARCH_SORT } from "@/lib/utils/search";

const read = (query: string) =>
    SEARCH_URL_CODEC.fromParams(new URLSearchParams(query));

const write = (state: Parameters<typeof SEARCH_URL_CODEC.toParams>[0]) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(
        SEARCH_URL_CODEC.toParams(state),
    )) {
        if (value === undefined || value === "") continue;
        if (Array.isArray(value)) {
            if (value.length) params.set(key, value.join(","));
            continue;
        }
        params.set(key, String(value));
    }
    return params.toString();
};

describe("reading search state from the URL", () => {
    it("gives the default state for an empty query string", () => {
        expect(read("")).toEqual(EMPTY_SEARCH_URL_STATE);
    });

    it("reads every filter group, the sort, the view and the page", () => {
        const state = read(
            "q=Carmel&price=1000000-2000000&beds=3,4&baths=2&type=villa&sort=price-asc&view=list&page=3",
        );

        expect(state.filters.location).toBe("Carmel");
        expect(state.filters.price).toEqual(["1000000-2000000"]);
        expect(state.filters.beds).toEqual(["3", "4"]);
        expect(state.filters.baths).toEqual(["2"]);
        expect(state.filters.type).toEqual(["VILLA"]);
        expect(state.sort).toBe("price-asc");
        expect(state.view).toBe("list");
        expect(state.page).toBe(3);
    });

    it("still honours the legacy min= links the marketing pages emit", () => {
        expect(read("min=5000000").filters.price).toEqual(["5000000-"]);
        expect(read("min=1000000").filters.price).toEqual(["1000000-2000000"]);
    });

    it("prefers an explicit price band over the legacy minimum", () => {
        expect(read("min=5000000&price=0-1000000").filters.price).toEqual([
            "0-1000000",
        ]);
    });

    it("discards a price band that is not one of the offered ones", () => {
        expect(read("price=nonsense").filters.price).toEqual([]);
    });

    it("falls back rather than trusting an unknown sort, view or page", () => {
        const state = read("sort=cheapest&view=globe&page=-4");
        expect(state.sort).toBe(DEFAULT_SEARCH_SORT);
        expect(state.view).toBe("grid");
        expect(state.page).toBe(1);
    });
});

describe("writing search state back to the URL", () => {
    it("writes nothing for the default state, so a clean search has a clean URL", () => {
        expect(write(EMPTY_SEARCH_URL_STATE)).toBe("");
    });

    it("omits the default sort, view and first page", () => {
        expect(
            write({
                filters: { ...EMPTY_FILTERS, beds: ["3"] },
                sort: DEFAULT_SEARCH_SORT,
                view: "grid",
                page: 1,
            }),
        ).toBe("beds=3");
    });

    it("round-trips a fully specified search", () => {
        const original = {
            filters: {
                location: "Carmel",
                price: ["1000000-2000000"],
                beds: ["3", "4"],
                baths: ["2"],
                type: ["VILLA"],
            },
            sort: "price-desc" as const,
            view: "list" as const,
            page: 2,
        };

        expect(read(write(original))).toEqual(original);
    });
});
