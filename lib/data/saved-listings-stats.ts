import {
    Bookmark,
    EyeOff,
    Handshake,
    TrendingDown,
    Wallet,
} from "lucide-react";
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
import {
    coldSaved,
    countByStatus,
    cutSaved,
    liveSaved,
    offerSaved,
    watchedValue,
} from "@/lib/data/saved-listings";
import type { SavedListing, ShareDatum, StatDatum } from "@/lib/types";
import { formatCompactUsd, percentOf } from "@/lib/utils";

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
