import type { ChartTone } from "@/lib/config/chart-tones";
import type { MapPin } from "@/lib/config/map";
import { PUBLIC_ROUTES } from "@/lib/constants";
import type { ListingStatus } from "@/lib/types";
import type { Listing } from "@/lib/types";
import { formatCompactUsd } from "@/lib/utils";

export const MAP_STATUS_TONE: Record<ListingStatus, ChartTone> = {
    DRAFT: "neutral",
    AVAILABLE: "accent",
    PENDING: "warning",
    SOLD: "success",
    EXPIRED: "neutral",
};

export const hasCoordinates = (
    listing: Listing,
): listing is Listing & { latitude: number; longitude: number } =>
    listing.latitude !== null && listing.longitude !== null;

export const toListingPins = (listings: Listing[]): MapPin[] =>
    listings.filter(hasCoordinates).map((listing) => ({
        id: listing.id,
        latitude: listing.latitude,
        longitude: listing.longitude,
        label: listing.address,
        caption: `${formatCompactUsd(listing.price)} · ${listing.locality}`,
        tone: MAP_STATUS_TONE[listing.status],
        href: PUBLIC_ROUTES.listing(listing.id),
    }));

export const unmappableCount = (listings: Listing[]) =>
    listings.length - listings.filter(hasCoordinates).length;
