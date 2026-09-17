"use client";

import { useMemo, useState } from "react";
import { FactCell } from "@/components/sections/listing/fact-cell";
import { NearbyKindToggles } from "@/components/sections/listing/nearby-kind-toggles";
import { MapView } from "@/components/ui/map-view";
import { MAP_DETAIL_ZOOM } from "@/lib/config/map";
import { POI_KIND_KEYS } from "@/lib/config/nearby-tones";
import {
    countNearbyByKind,
    hasCoordinates,
    neighbourhoodPins,
} from "@/lib/data/listing-map";
import { useNearbyPlaces } from "@/lib/hooks/use-properties";
import { cn } from "@/lib/utils";
import type { Listing, NearbyPlace, PoiKind } from "@/lib/types";
import { formatCount } from "@/lib/utils/format";

interface AreaStat {
    label: string;
    value: string;
}

function buildAreaStats(listing: Listing): AreaStat[] {
    return [
        { label: "Walk score", value: String(listing.walkScore) },
        { label: "Days on market", value: String(listing.listedDaysAgo) },
        { label: "Saves", value: formatCount(listing.saves) },
    ];
}

const MAP_LABEL = "Where this residence sits, with places nearby";
const NEARBY_LOADING =
    "Finding schools, transit, parks and restaurants nearby.";
const NEARBY_EMPTY =
    "No schools, transit, parks or restaurants are mapped close to this residence.";
const NEARBY_UNAVAILABLE = "Places nearby could not be loaded right now.";
const NO_PLACES: NearbyPlace[] = [];

export function ListingNeighborhood({ listing }: { listing: Listing }) {
    const placed = hasCoordinates(listing);
    const nearby = useNearbyPlaces(listing.id, placed);
    const [shown, setShown] = useState<PoiKind[]>(POI_KIND_KEYS);

    const places = nearby.data ?? NO_PLACES;
    const counts = useMemo(() => countNearbyByKind(places), [places]);
    const pins = useMemo(
        () => neighbourhoodPins(listing, places, shown),
        [listing, places, shown],
    );

    const toggle = (kind: PoiKind) =>
        setShown((current) =>
            current.includes(kind)
                ? current.filter((entry) => entry !== kind)
                : [...current, kind],
        );

    const status = nearby.isLoading
        ? NEARBY_LOADING
        : nearby.isError
          ? NEARBY_UNAVAILABLE
          : nearby.isSuccess && places.length === 0
            ? NEARBY_EMPTY
            : "";

    return (
        <div className="flex flex-col gap-4">
            {placed && (
                <div className="flex flex-col gap-2">
                    <div className="h-64">
                        <MapView
                            pins={pins}
                            selectedId={listing.id}
                            centre={[listing.longitude, listing.latitude]}
                            zoom={MAP_DETAIL_ZOOM}
                            fit={false}
                            label={MAP_LABEL}
                        />
                    </div>

                    <NearbyKindToggles
                        counts={counts}
                        shown={shown}
                        onToggle={toggle}
                    />

                    <p
                        role="status"
                        className={cn(
                            "text-text-muted text-xs",
                            !status && "sr-only",
                        )}
                    >
                        {status}
                    </p>
                </div>
            )}

            <p className="text-text-secondary max-w-[54ch] text-xs leading-relaxed">
                {listing.locality} at a glance. Your agent can walk the
                immediate area with you and open any property on the street by
                private appointment.
            </p>

            <dl className="grid grid-cols-3 gap-2">
                {buildAreaStats(listing).map((stat) => (
                    <FactCell
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                    />
                ))}
            </dl>
        </div>
    );
}

ListingNeighborhood.displayName = "ListingNeighborhood";
