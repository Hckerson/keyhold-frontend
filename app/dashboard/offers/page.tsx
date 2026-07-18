import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { OfferRow, type OfferStatus } from "@/components/dashboard/offer-row";

interface Offer {
    id: string;
    address: string;
    offerPrice: number;
    listPrice: number;
    status: OfferStatus;
    daysOld: number;
}

const offers: Offer[] = [
    {
        id: "1",
        address: "456 Oak Avenue, Beverly Hills, CA",
        offerPrice: 3100000,
        listPrice: 3200000,
        status: "pending",
        daysOld: 2,
    },
    {
        id: "2",
        address: "789 Sunset Blvd, West Hollywood, CA",
        offerPrice: 2950000,
        listPrice: 2950000,
        status: "accepted",
        daysOld: 5,
    },
];

export default function OffersPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Your Offers"
                description={`${offers.length} active offer${
                    offers.length !== 1 ? "s" : ""
                }`}
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Make New Offer
                        </Button>
                    </Link>
                }
            />

            {offers.length > 0 ? (
                <div className="space-y-4">
                    {offers.map((offer) => (
                        <OfferRow
                            key={offer.id}
                            id={offer.id}
                            address={offer.address}
                            offerPrice={offer.offerPrice}
                            listPrice={offer.listPrice}
                            status={offer.status}
                            daysOld={offer.daysOld}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={FileText}
                    title="No active offers yet"
                    description="Offers you submit on a property will appear here."
                    action={
                        <Link href="/search">
                            <Button variant="primary" size="sm">
                                Browse Properties
                            </Button>
                        </Link>
                    }
                />
            )}
        </div>
    );
}
