import {
    SAVED_STATUSES,
    SAVED_STATUS_KEYS,
    watchBandOf,
} from "@/lib/config/saved-tones";
import type {
    SavedListing,
    SavedSortKey,
    SavedStatusFilter,
} from "@/lib/types";
import { sum } from "@/lib/utils";

export const SAVED_FILTERS: { id: SavedStatusFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...SAVED_STATUS_KEYS.map((id) => ({ id, label: SAVED_STATUSES[id].label })),
];

export const SAVED_SORTS: { value: SavedSortKey; label: string }[] = [
    { value: "rank", label: "Priority" },
    { value: "move", label: "Biggest cut" },
    { value: "match", label: "Best match" },
    { value: "price-asc", label: "Price low-high" },
    { value: "recent", label: "Recently saved" },
];

export const priceMove = (listing: SavedListing) =>
    listing.price - listing.savedPrice;

export const movePercent = (listing: SavedListing) =>
    Math.round((priceMove(listing) / listing.savedPrice) * 100);

export const pricePerSqft = (listing: SavedListing) =>
    Math.round(listing.price / listing.sqft);

export const liveSaved = (listings: SavedListing[]) =>
    listings.filter((listing) => SAVED_STATUSES[listing.status].live);

export const cutSaved = (listings: SavedListing[]) =>
    listings.filter((listing) => priceMove(listing) < 0);

export const offerSaved = (listings: SavedListing[]) =>
    listings.filter((listing) => listing.offerId !== undefined);

export const coldSaved = (listings: SavedListing[]) =>
    listings.filter((listing) => watchBandOf(listing.viewedDaysAgo) === "cold");

export const watchedValue = (listings: SavedListing[]) =>
    sum(listings.map((listing) => listing.price));

export const rankSaved = (listings: SavedListing[]) =>
    [...listings].sort(
        (a, b) =>
            Number(SAVED_STATUSES[b.status].live) -
                Number(SAVED_STATUSES[a.status].live) ||
            Number(b.offerId !== undefined) - Number(a.offerId !== undefined) ||
            b.matchScore - a.matchScore ||
            priceMove(a) - priceMove(b) ||
            a.savedDaysAgo - b.savedDaysAgo,
    );

const SORTERS: Record<
    SavedSortKey,
    (a: SavedListing, b: SavedListing) => number
> = {
    rank: () => 0,
    move: (a, b) => priceMove(a) - priceMove(b),
    match: (a, b) => b.matchScore - a.matchScore,
    "price-asc": (a, b) => a.price - b.price,
    recent: (a, b) => a.savedDaysAgo - b.savedDaysAgo,
};

export const sortSaved = (listings: SavedListing[], key: SavedSortKey) =>
    [...listings].sort(SORTERS[key]);

export const countByStatus = (
    listings: SavedListing[],
): Record<SavedStatusFilter, number> => {
    const counts: Record<SavedStatusFilter, number> = {
        all: listings.length,
        available: 0,
        "under-offer": 0,
        sold: 0,
        withdrawn: 0,
    };
    for (const listing of listings) counts[listing.status] += 1;
    return counts;
};
