import { GraduationCap } from "lucide-react";
import { FactCell } from "@/components/sections/listing/fact-cell";
import { SectionEyebrow } from "@/components/patterns/section-heading";
import { MapView } from "@/components/ui/map-view";
import { MAP_DETAIL_ZOOM } from "@/lib/config/map";
import { hasCoordinates, toListingPins } from "@/lib/data/listing-map";

import type { Listing } from "@/lib/types";
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

const MAP_LABEL = "Where this residence sits";

export function ListingNeighborhood({ listing }: { listing: Listing }) {
    const placed = hasCoordinates(listing);

    return (
        <div className="flex flex-col gap-4">
            {placed && (
                <div className="h-64">
                    <MapView
                        pins={toListingPins([listing])}
                        selectedId={listing.id}
                        centre={[listing.longitude, listing.latitude]}
                        zoom={MAP_DETAIL_ZOOM}
                        fit={false}
                        label={MAP_LABEL}
                    />
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

            <div className="border-border flex items-start gap-2 border-t pt-3">
                <GraduationCap
                    className="text-highlight-dark mt-0.5 size-3 shrink-0"
                    strokeWidth={1.5}
                />
                <div className="flex flex-col gap-0.5">
                    <SectionEyebrow tone="muted">Schools</SectionEyebrow>
                    <p className="text-text text-xs">
                        Catchment and private school detail is released with the
                        full dossier.
                    </p>
                </div>
            </div>
        </div>
    );
}

ListingNeighborhood.displayName = "ListingNeighborhood";
