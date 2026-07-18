import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import {
    ListingManageRow,
    type ListingStatus,
} from "@/components/dashboard/listing-manage-row";

interface Listing {
    id: string;
    address: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    status: ListingStatus;
    listDate: string;
    showings: number;
    offers: number;
}

const listings: Listing[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        price: 3200000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        status: "active",
        listDate: "2024-06-15",
        showings: 12,
        offers: 2,
    },
    {
        id: "2",
        address: "789 Sunset Blvd, West Hollywood, CA",
        price: 2950000,
        beds: 3,
        baths: 2.5,
        sqft: 4800,
        status: "under-offer",
        listDate: "2024-05-20",
        showings: 8,
        offers: 1,
    },
    {
        id: "3",
        address: "234 Oak Street, Bel Air, CA",
        price: 4500000,
        beds: 5,
        baths: 4,
        sqft: 6500,
        status: "active",
        listDate: "2024-07-01",
        showings: 5,
        offers: 0,
    },
];

export default function AgentListingsPage() {
    const active = listings.filter((l) => l.status === "active").length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Listings"
                description={`${active} active listing${
                    active !== 1 ? "s" : ""
                }`}
                action={
                    <Button variant="primary" size="sm">
                        List New Property
                    </Button>
                }
            />

            {listings.length > 0 ? (
                <div className="space-y-4">
                    {listings.map((listing) => (
                        <ListingManageRow
                            key={listing.id}
                            address={listing.address}
                            price={listing.price}
                            beds={listing.beds}
                            baths={listing.baths}
                            sqft={listing.sqft}
                            status={listing.status}
                            listDate={listing.listDate}
                            showings={listing.showings}
                            offers={listing.offers}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={Home}
                    title="No listings yet"
                    description="Properties you list will appear here."
                    action={
                        <Button variant="primary" size="sm">
                            List New Property
                        </Button>
                    }
                />
            )}
        </div>
    );
}
