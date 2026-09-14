"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapView } from "@/components/ui/map-view";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { StatusBadge } from "@/components/ui/status-badge";
import { LISTING_STATUSES } from "@/lib/config/listing-tones";
import { toListingPins, unmappableCount } from "@/lib/data/listing-map";
import { MANAGED_STATUS_BY_PROPERTY } from "@/lib/utils/to-managed-listing";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { formatMillions } from "@/lib/utils";
import type { Listing } from "@/lib/types";

const MAP_LABEL = "Search results on a map";
const UNMAPPED_SUFFIX = "without a location are not shown";

export interface SearchResultsMapProps {
    listings: Listing[];
}

export function SearchResultsMap({ listings }: SearchResultsMapProps) {
    const pins = useMemo(() => toListingPins(listings), [listings]);
    const [selectedId, setSelectedId] = useState<string>();

    const selected = listings.find((listing) => listing.id === selectedId);
    const unmapped = unmappableCount(listings);
    const status =
        selected &&
        LISTING_STATUSES[MANAGED_STATUS_BY_PROPERTY[selected.status]];

    return (
        <div className="flex flex-col gap-2">
            <div className="h-[32rem]">
                <MapView
                    pins={pins}
                    selectedId={selectedId}
                    label={MAP_LABEL}
                    onSelect={setSelectedId}
                />
            </div>

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

            {unmapped > 0 && (
                <p className="micro-label">
                    {unmapped} {UNMAPPED_SUFFIX}
                </p>
            )}
        </div>
    );
}

SearchResultsMap.displayName = "SearchResultsMap";
