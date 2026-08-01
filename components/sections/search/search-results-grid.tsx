import {
    PropertyCard,
    type Property,
} from "@/components/features/listings/property-card";
import type { Listing } from "@/lib/types";

function toProperty(listing: Listing): Property {
    return {
        id: listing.id,
        price: listing.price,
        address: listing.address,
        locality: listing.locality,
        beds: listing.beds,
        baths: listing.baths,
        sqft: listing.sqft,
        imageUrl: listing.images[0],
        status: listing.status,
        agent: {
            name: listing.agent.name,
            avatarUrl: listing.agent.avatarUrl,
        },
    };
}

interface SearchResultsGridProps {
    listings: Listing[];
}

export function SearchResultsGrid({ listings }: SearchResultsGridProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
                <PropertyCard
                    key={listing.id}
                    property={toProperty(listing)}
                    href={`/listing/${listing.id}`}
                />
            ))}
        </div>
    );
}

SearchResultsGrid.displayName = "SearchResultsGrid";
