import type { ChartTone } from "@/lib/config/chart-tones";
import type { MapPin } from "@/lib/config/map";
import { PUBLIC_ROUTES } from "@/lib/constants";
import type { ListingStatus } from "@/lib/types";
import type { Listing, NearbyPlace, PoiKind } from "@/lib/types";
import { POI_KINDS } from "@/lib/config/nearby-tones";
import { formatCompactUsd } from "@/lib/utils";

export const MAP_STATUS_TONE: Record<ListingStatus, ChartTone> = {
    DRAFT: "neutral",
    AVAILABLE: "accent",
    PENDING: "neutral",
    SOLD: "accent",
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

export const toPoiPins = (places: NearbyPlace[]): MapPin[] =>
    places.map((place) => ({
        id: place.id,
        latitude: place.latitude,
        longitude: place.longitude,
        label: place.name,
        caption: POI_KINDS[place.kind].label,
        tone: POI_KINDS[place.kind].tone,
    }));

export const neighbourhoodPins = (
    listing: Listing,
    places: NearbyPlace[],
    shown: readonly PoiKind[],
): MapPin[] => [
    ...toListingPins([listing]),
    ...toPoiPins(places.filter((place) => shown.includes(place.kind))),
];

export const countNearbyByKind = (
    places: NearbyPlace[],
): Record<PoiKind, number> =>
    places.reduce(
        (counts, place) => ({
            ...counts,
            [place.kind]: counts[place.kind] + 1,
        }),
        { school: 0, transit: 0, park: 0, restaurant: 0 },
    );
