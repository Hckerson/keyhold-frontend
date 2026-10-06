import {
    AGE_BANDS,
    AGE_BAND_KEYS,
    DEMAND_BANDS,
    DEMAND_BAND_KEYS,
    LISTING_STATUSES,
    LISTING_STATUS_KEYS,
} from "@/lib/config/listing-tones";
import {
    ageBandOf,
    countByStatus,
    demandBandOf,
} from "@/lib/data/agent-listings";
import type { ManagedListing, ShareDatum } from "@/lib/types";
import { percentOf } from "@/lib/utils";

export const statusShares = (listings: ManagedListing[]): ShareDatum[] => {
    const counts = countByStatus(listings);
    return LISTING_STATUS_KEYS.map((id) => ({
        id,
        icon: LISTING_STATUSES[id].icon,
        label: LISTING_STATUSES[id].label,
        value: `${counts[id]}`,
        percent: percentOf(counts[id], listings.length),
        tone: LISTING_STATUSES[id].chartTone,
    }));
};

export const demandShares = (listings: ManagedListing[]): ShareDatum[] =>
    DEMAND_BAND_KEYS.map((id) => {
        const count = listings.filter(
            (listing) => demandBandOf(listing) === id,
        ).length;
        return {
            id,
            icon: DEMAND_BANDS[id].icon,
            label: DEMAND_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, listings.length),
            tone: DEMAND_BANDS[id].tone,
        };
    });

export const ageShares = (listings: ManagedListing[]): ShareDatum[] =>
    AGE_BAND_KEYS.map((id) => {
        const count = listings.filter(
            (listing) => ageBandOf(listing) === id,
        ).length;
        return {
            id,
            icon: AGE_BANDS[id].icon,
            label: AGE_BANDS[id].label,
            value: `${count}`,
            percent: percentOf(count, listings.length),
            tone: AGE_BANDS[id].tone,
        };
    });
