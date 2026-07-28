import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListingRow } from "@/components/features/listings/listing-row";
import type { Listing } from "@/lib/types";

interface SearchResultsListProps {
    listings: Listing[];
}

export function SearchResultsList({ listings }: SearchResultsListProps) {
    return (
        <div className="flex flex-col gap-3">
            {listings.map((listing) => (
                <ListingRow
                    key={listing.id}
                    listing={{
                        imageUrl: listing.images[0],
                        address: `${listing.address}, ${listing.locality}`,
                        price: listing.price,
                        beds: listing.beds,
                        baths: listing.baths,
                        sqft: listing.sqft,
                    }}
                    href={`/listing/${listing.id}`}
                    meta={`${listing.agent.name} · listed ${listing.listedDaysAgo} days ago`}
                    actions={
                        <Link href={`/listing/${listing.id}`}>
                            <Button variant="secondary" size="sm">
                                View
                            </Button>
                        </Link>
                    }
                />
            ))}
        </div>
    );
}

SearchResultsList.displayName = "SearchResultsList";
