import { BULK_PREVIEW, bulkOverflow } from "@/lib/config/listing-bulk";
import type { ManagedListing } from "@/lib/types";

export interface ListingBulkPreviewProps {
    listings: ManagedListing[];
}

export function ListingBulkPreview({ listings }: ListingBulkPreviewProps) {
    const overflow = bulkOverflow(listings.length);

    return (
        <ul className="bg-background-muted border-border-light divide-border-light divide-y rounded-md border px-3">
            {listings.slice(0, BULK_PREVIEW).map((listing) => (
                <li
                    key={listing.id}
                    className="flex h-9 items-center justify-between gap-3"
                >
                    <span className="text-text min-w-0 truncate text-xs font-medium">
                        {listing.address}
                    </span>
                    <span className="text-text-secondary shrink-0 truncate text-xs">
                        {listing.locality}
                    </span>
                </li>
            ))}
            {overflow && (
                <li className="micro-label flex h-9 items-center">
                    {overflow}
                </li>
            )}
        </ul>
    );
}

ListingBulkPreview.displayName = "ListingBulkPreview";
