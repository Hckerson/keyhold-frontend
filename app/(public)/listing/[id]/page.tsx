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
import { ListingViewRecorder } from "@/components/features/listings/listing-view-recorder";
import { ListingUnavailable } from "@/components/sections/listing/listing-unavailable";
import { propertiesServerAPI } from "@/lib/api/server";
import { config } from "@/lib/constants";
import { clamp } from "@/lib/utils/format";
import { toListing } from "@/lib/utils/to-listing";
import {
    serialiseSchema,
    toListingSchema,
} from "@/lib/utils/to-listing-schema";

const COMPARABLE_COUNT = 3;
const DESCRIPTION_LIMIT = 160;

interface ListingDetailPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: ListingDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const property = await propertiesServerAPI.detail(id);

    if (!property) {
        return {
            title: "Listing unavailable | Luxury Real Estate",
            description: "This listing is no longer available.",
        };
    }

    const title = `${property.title}, ${property.locality} | Luxury Real Estate`;
    const description = clamp(property.description, DESCRIPTION_LIMIT);
    const path = `/listing/${property.id}`;
    const photo = property.images[0]?.url;

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url: `${config.site.url}${path}`,
            type: "article",
            images: photo ? [{ url: photo, alt: property.title }] : undefined,
        },
    };
}

export default async function ListingDetailPage({
    params,
}: ListingDetailPageProps) {
    const { id } = await params;
    const property = await propertiesServerAPI.detail(id);

    if (!property) return <ListingUnavailable />;

    const listing = toListing(property);
    const nearby = await propertiesServerAPI.list({
        locality: property.locality,
        status: "AVAILABLE",
        limit: COMPARABLE_COUNT + 1,
    });

    const comparables = (nearby?.items ?? [])
        .filter((candidate) => candidate.id !== property.id)
        .slice(0, COMPARABLE_COUNT)
        .map(toListing);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serialiseSchema(toListingSchema(property)),
                }}
            />

            <ListingViewRecorder propertyId={property.id} />

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

            <ListingDetail listing={listing} comparables={comparables} />
        </>
    );
}
