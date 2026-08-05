"use client";

import { ListingThumb } from "@/components/features/shared/listing-thumb";
import type { ModerationListing } from "@/lib/types";

const REVIEW_PREFIX = "Review";
const PHOTOS_NOUN = "photos";

export interface ModerationListingMarkProps {
    listing: ModerationListing;
    onOpen: (id: string) => void;
}

export function ModerationListingMark({
    listing,
    onOpen,
}: ModerationListingMarkProps) {
    const [cover] = listing.photos;

    return (
        <button
            type="button"
            aria-label={`${REVIEW_PREFIX} ${listing.address}, ${listing.locality}`}
            onClick={() => onOpen(listing.id)}
            className="group ease-smooth focus-visible:ring-accent flex w-full min-w-0 items-center gap-2 rounded-md text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
            <ListingThumb src={cover} alt="" className="h-8 w-11 rounded-md" />
            <span className="min-w-0">
                <span className="text-text group-hover:text-accent ease-smooth block truncate text-xs font-medium transition-colors">
                    {listing.address}
                </span>
                <span className="text-text-muted block truncate text-[10px]">
                    {listing.locality} · {listing.photos.length} {PHOTOS_NOUN}
                </span>
            </span>
        </button>
    );
}

ModerationListingMark.displayName = "ModerationListingMark";
