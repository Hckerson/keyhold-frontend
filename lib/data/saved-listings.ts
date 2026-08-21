import {
    Bookmark,
    EyeOff,
    Handshake,
    TrendingDown,
    Wallet,
} from "lucide-react";
import type { ShareDatum } from "@/components/patterns/share-row";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    SAVED_STATUSES,
    SAVED_STATUS_KEYS,
    WATCH_BANDS,
    WATCH_BAND_KEYS,
    watchBandOf,
} from "@/lib/config/saved-tones";
import type { SavedListing, SavedStatus } from "@/lib/types";
import { formatCompactUsd, percentOf, sum } from "@/lib/utils";

export type SavedStatusFilter = SavedStatus | "all";

export type SavedSortKey = "rank" | "move" | "price-asc" | "recent";

export const SAVED_FILTERS: { id: SavedStatusFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...SAVED_STATUS_KEYS.map((id) => ({ id, label: SAVED_STATUSES[id].label })),
];

export const SAVED_SORTS: { value: SavedSortKey; label: string }[] = [
    { value: "rank", label: "Priority" },
    { value: "move", label: "Biggest cut" },
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
            priceMove(a) - priceMove(b) ||
            a.savedDaysAgo - b.savedDaysAgo,
    );

const SORTERS: Record<
    SavedSortKey,
    (a: SavedListing, b: SavedListing) => number
> = {
    rank: () => 0,
    move: (a, b) => priceMove(a) - priceMove(b),
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

export const savedStats = (listings: SavedListing[]): StatDatum[] => [
    {
        id: "saved",
        icon: Bookmark,
        label: "Saved",
        value: `${listings.length}`,
        tone: "accent",
    },
    {
        id: "value",
        icon: Wallet,
        label: "Value watched",
        value: formatCompactUsd(watchedValue(listings)),
        tone: "highlight",
    },
    {
        id: "cuts",
        icon: TrendingDown,
        label: "Price cuts",
        value: `${cutSaved(listings).length}`,
        tone: "success",
    },
    {
        id: "offers",
        icon: Handshake,
        label: "Offers in",
        value: `${offerSaved(listings).length}`,
        tone: "info",
        href: "/dashboard/offers",
    },
    {
        id: "cold",
        icon: EyeOff,
        label: "Unseen",
        value: `${coldSaved(listings).length}`,
        tone: "warning",
    },
];

export const statusShares = (listings: SavedListing[]): ShareDatum[] => {
    const counts = countByStatus(listings);
    return SAVED_STATUS_KEYS.map((id) => ({
        id,
        icon: SAVED_STATUSES[id].icon,
        label: SAVED_STATUSES[id].label,
        value: `${counts[id]}`,
        percent: percentOf(counts[id], listings.length),
        tone: SAVED_STATUSES[id].chartTone,
    }));
};

export const watchShares = (listings: SavedListing[]): ShareDatum[] =>
    WATCH_BAND_KEYS.map((id) => {
        const count = listings.filter(
            (listing) => watchBandOf(listing.viewedDaysAgo) === id,
        ).length;
        return {
            id,
            icon: WATCH_BANDS[id].icon,
            label: WATCH_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, listings.length),
            tone: WATCH_BANDS[id].tone,
        };
    });

export const savedSummary = (listings: SavedListing[]) =>
    `${liveSaved(listings).length} live · ${formatCompactUsd(watchedValue(listings))} watched`;
