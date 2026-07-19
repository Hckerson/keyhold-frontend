import Link from "next/link";
import { Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ListingRow } from "@/components/ui/listing-row";
import { EmptyState } from "@/components/ui/empty-state";
import { propertyImages } from "@/lib/config/sample-images";

interface SavedListing {
    id: string;
    image: string;
    address: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    savedDate: string;
}

const savedListings: SavedListing[] = [
    {
        id: "1",
        image: propertyImages[0],
        address: "456 Oak Avenue, Beverly Hills, CA",
        price: 3200000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        savedDate: "2 days ago",
    },
    {
        id: "2",
        image: propertyImages[1],
        address: "789 Sunset Blvd, West Hollywood, CA",
        price: 2950000,
        beds: 3,
        baths: 2.5,
        sqft: 4800,
        savedDate: "5 days ago",
    },
    {
        id: "3",
        image: propertyImages[2],
        address: "234 Oak Street, Bel Air, CA",
        price: 4500000,
        beds: 5,
        baths: 4,
        sqft: 6500,
        savedDate: "1 week ago",
    },
];

export default function SavedListingsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Saved Listings"
                description={`${savedListings.length} propert${
                    savedListings.length === 1 ? "y" : "ies"
                } saved`}
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Continue Browsing
                        </Button>
                    </Link>
                }
            />

            {savedListings.length > 0 ? (
                <div className="space-y-4">
                    {savedListings.map((listing) => (
                        <ListingRow
                            key={listing.id}
                            href={`/listing/${listing.id}`}
                            listing={{
                                imageUrl: listing.image,
                                address: listing.address,
                                price: listing.price,
                                beds: listing.beds,
                                baths: listing.baths,
                                sqft: listing.sqft,
                            }}
                            meta={`Saved ${listing.savedDate}`}
                            actions={
                                <>
                                    <Link
                                        href={`/listing/${listing.id}`}
                                        className="block"
                                    >
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="w-full sm:w-28"
                                        >
                                            View Details
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-error hover:text-error w-full sm:w-28"
                                    >
                                        <Trash2
                                            size={14}
                                            strokeWidth={1.5}
                                            className="mr-1.5"
                                        />
                                        Remove
                                    </Button>
                                </>
                            }
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={Heart}
                    title="No saved listings yet"
                    description="Properties you save will appear here."
                    action={
                        <Link href="/search">
                            <Button variant="primary" size="sm">
                                Start Browsing
                            </Button>
                        </Link>
                    }
                />
            )}
        </div>
    );
}
