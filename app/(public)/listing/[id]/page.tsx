import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ListingDetail } from "@/components/sections/listing/listing-detail";
import { ListingUnavailable } from "@/components/sections/listing/listing-unavailable";
import { LISTINGS, getListing, getComparables } from "@/lib/data/listings";

interface ListingDetailPageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return LISTINGS.map((listing) => ({ id: listing.id }));
}

export async function generateMetadata({
    params,
}: ListingDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const listing = getListing(id);

    if (!listing) {
        return {
            title: "Listing unavailable | Luxury Real Estate",
            description: "This listing is no longer available.",
        };
    }

    return {
        title: `${listing.title}, ${listing.locality} | Luxury Real Estate`,
        description: listing.description,
    };
}

export default async function ListingDetailPage({
    params,
}: ListingDetailPageProps) {
    const { id } = await params;
    const listing = getListing(id);

    if (!listing) return <ListingUnavailable />;

    return (
        <>
            <Container className="pt-6">
                <Breadcrumb aria-label="Breadcrumb">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/search">
                                Search
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <span className="text-text text-xs font-medium">
                                {listing.title}
                            </span>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Container>

            <ListingDetail
                listing={listing}
                comparables={getComparables(listing)}
            />
        </>
    );
}
