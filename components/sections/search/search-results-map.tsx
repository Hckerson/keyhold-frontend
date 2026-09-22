"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapView } from "@/components/ui/map-view";
import { Button } from "@/components/ui/button";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { StatusBadge } from "@/components/ui/status-badge";
import { LISTING_STATUSES } from "@/lib/config/listing-tones";
import { MAP_AREA_COPY, type MapBounds } from "@/lib/config/map";
import { toListingPins } from "@/lib/data/listing-map";
import { MANAGED_STATUS_BY_PROPERTY } from "@/lib/utils/to-managed-listing";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { formatMillions } from "@/lib/utils";
import type { Listing } from "@/lib/types";

const MAP_LABEL = "Search results on a map";

export interface SearchResultsMapProps {
    listings: Listing[];
    fit?: boolean;
    onSearchArea?: (bounds: MapBounds) => void;
    onClearArea?: () => void;
}

export function SearchResultsMap({
    listings,
    fit,
    onSearchArea,
    onClearArea,
}: SearchResultsMapProps) {
    const pins = useMemo(() => toListingPins(listings), [listings]);
    const [selectedId, setSelectedId] = useState<string>();
    const [bounds, setBounds] = useState<MapBounds>();

    const selected = listings.find((listing) => listing.id === selectedId);
    const status =
        selected &&
        LISTING_STATUSES[MANAGED_STATUS_BY_PROPERTY[selected.status]];

    return (
        <div className="flex flex-col gap-2">
            <div className="relative h-[32rem]">
                <MapView
                    pins={pins}
                    selectedId={selectedId}
                    fit={fit}
                    label={MAP_LABEL}
                    onSelect={setSelectedId}
                    onBoundsChange={onSearchArea ? setBounds : undefined}
                />

                {onSearchArea && (
                    <div className="bg-background border-border z-dropdown absolute top-2 left-2 flex gap-1 rounded-md border p-1 shadow-md">
                        <Button
                            type="button"
                            emphasis="solid"
                            tone="neutral"
                            disabled={!bounds}
                            onClick={() => bounds && onSearchArea(bounds)}
                        >
                            {MAP_AREA_COPY.search}
                        </Button>

                        {onClearArea && (
                            <Button
                                type="button"
                                emphasis="quiet"
                                tone="neutral"
                                onClick={onClearArea}
                            >
                                {MAP_AREA_COPY.clear}
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {listings.length === 0 && (
                <p className="micro-label">{MAP_AREA_COPY.emptyView}</p>
            )}

            {selected && status && (
                <Link
                    href={PUBLIC_ROUTES.listing(selected.id)}
                    className="group bg-background-muted border-border-light hover:border-border ease-smooth flex items-center gap-3 rounded-md border p-3 transition-colors"
                >
                    <ListingThumb
                        src={selected.images[0] ?? null}
                        alt={selected.address}
                    />
                    <span className="min-w-0 flex-1">
                        <span className="text-text group-hover:text-accent ease-smooth block truncate text-xs font-medium transition-colors">
                            {selected.address}
                        </span>
                        <span className="text-text-muted block truncate text-xs">
                            {selected.locality}
                        </span>
                    </span>
                    <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                    <span className="text-h6 font-display text-accent shrink-0 font-light tabular-nums">
                        {formatMillions(selected.price, 2)}
                    </span>
                </Link>
            )}
        </div>
    );
}

SearchResultsMap.displayName = "SearchResultsMap";
