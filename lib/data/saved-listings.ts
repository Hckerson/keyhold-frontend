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
    MATCH_BANDS,
    MATCH_BAND_KEYS,
    SAVED_STATUSES,
    SAVED_STATUS_KEYS,
    WATCH_BANDS,
    WATCH_BAND_KEYS,
    matchBandOf,
    watchBandOf,
} from "@/lib/config/saved-tones";
import { propertyImage } from "@/lib/data/sample-images";
import type { SavedListing, SavedStatus } from "@/lib/types";
import { formatCompactUsd, percentOf, sum } from "@/lib/utils";

export type SavedStatusFilter = SavedStatus | "all";

export type SavedSortKey = "rank" | "move" | "match" | "price-asc" | "recent";

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

export const initialListings: SavedListing[] = [
    {
        id: "1",
        address: "456 Oak Avenue",
        locality: "Beverly Hills",
        photo: propertyImage(0),
        price: 3_200_000,
        savedPrice: 3_350_000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        status: "available",
        matchScore: 94,
        savedDaysAgo: 2,
        viewedDaysAgo: 1,
        offerId: "1",
    },
    {
        id: "2",
        address: "789 Sunset Blvd",
        locality: "West Hollywood",
        photo: propertyImage(1),
        price: 2_950_000,
        savedPrice: 2_950_000,
        beds: 3,
        baths: 2.5,
        sqft: 4800,
        status: "under-offer",
        matchScore: 81,
        savedDaysAgo: 5,
        viewedDaysAgo: 4,
        offerId: "2",
    },
    {
        id: "3",
        address: "234 Oak Street",
        locality: "Bel Air",
        photo: propertyImage(2),
        price: 4_500_000,
        savedPrice: 4_250_000,
        beds: 5,
        baths: 4,
        sqft: 6500,
        status: "available",
        matchScore: 88,
        savedDaysAgo: 7,
        viewedDaysAgo: 0,
        offerId: "3",
    },
    {
        id: "5",
        address: "567 Palm Drive",
        locality: "Malibu",
        photo: propertyImage(3),
        price: 2_750_000,
        savedPrice: 2_900_000,
        beds: 3,
        baths: 3,
        sqft: 3900,
        status: "available",
        matchScore: 76,
        savedDaysAgo: 12,
        viewedDaysAgo: 6,
    },
    {
        id: "7",
        address: "18 Palisades Bluff",
        locality: "Pacific Palisades",
        photo: propertyImage(6),
        price: 8_150_000,
        savedPrice: 8_400_000,
        beds: 6,
        baths: 6,
        sqft: 9200,
        status: "available",
        matchScore: 69,
        savedDaysAgo: 19,
        viewedDaysAgo: 2,
    },
    {
        id: "8",
        address: "301 Montana Row",
        locality: "Santa Monica",
        photo: propertyImage(7),
        price: 3_950_000,
        savedPrice: 3_950_000,
        beds: 4,
        baths: 3.5,
        sqft: 4100,
        status: "under-offer",
        matchScore: 91,
        savedDaysAgo: 24,
        viewedDaysAgo: 9,
    },
    {
        id: "9",
        address: "64 Brentwood Mews",
        locality: "Brentwood",
        photo: propertyImage(8),
        price: 4_950_000,
        savedPrice: 5_100_000,
        beds: 5,
        baths: 4.5,
        sqft: 5800,
        status: "available",
        matchScore: 72,
        savedDaysAgo: 33,
        viewedDaysAgo: 21,
    },
    {
        id: "4",
        address: "678 Elm Street",
        locality: "Bel Air",
        photo: propertyImage(9),
        price: 3_800_000,
        savedPrice: 3_800_000,
        beds: 4,
        baths: 3,
        sqft: 4400,
        status: "available",
        matchScore: 85,
        savedDaysAgo: 41,
        viewedDaysAgo: 34,
    },
    {
        id: "10",
        address: "890 Beverly Grove",
        locality: "Los Angeles",
        photo: propertyImage(4),
        price: 2_400_000,
        savedPrice: 2_550_000,
        beds: 3,
        baths: 2,
        sqft: 3200,
        status: "sold",
        matchScore: 64,
        savedDaysAgo: 58,
        viewedDaysAgo: 47,
    },
    {
        id: "6",
        address: "77 Hillcrest Terrace",
        locality: "Pasadena",
        photo: propertyImage(5),
        price: 1_850_000,
        savedPrice: 1_850_000,
        beds: 4,
        baths: 3,
        sqft: 3900,
        status: "withdrawn",
        matchScore: 58,
        savedDaysAgo: 71,
        viewedDaysAgo: 62,
    },
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

export const removeSaved = (listings: SavedListing[], id: string) =>
    listings.filter((listing) => listing.id !== id);

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

export const matchShares = (listings: SavedListing[]): ShareDatum[] =>
    MATCH_BAND_KEYS.map((id) => {
        const count = listings.filter(
            (listing) => matchBandOf(listing.matchScore) === id,
        ).length;
        return {
            id,
            icon: MATCH_BANDS[id].icon,
            label: MATCH_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, listings.length),
            tone: MATCH_BANDS[id].tone,
        };
    });

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
