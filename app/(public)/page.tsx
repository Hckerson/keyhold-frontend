import { Reveal } from "@/components/patterns/reveal";
import { HeroSection } from "@/components/sections/home/hero";
import { PremierListing } from "@/components/sections/home/premier-listing";
import { FeaturedGallery } from "@/components/sections/home/featured-gallery";
import { StatsBand } from "@/components/sections/home/stats-band";
import { TestimonialsSection } from "@/components/sections/home/testimonials";
import { ConciergeSection } from "@/components/sections/home/concierge";
import {
    LatestSales,
    type LatestSaleData,
} from "@/components/sections/home/latest-sales";
import { CtaBanner } from "@/components/sections/home/cta-banner";
import type { GalleryTileData } from "@/components/sections/home/gallery-tile";
import { propertiesServerAPI } from "@/lib/api/server";
import { toListing } from "@/lib/utils/to-listing";
import { formatCompactUsd, formatUsd } from "@/lib/utils";
import { daysBetween, monthsSince } from "@/lib/utils/elapsed";
import type { Property } from "@/lib/validations/property";

export const metadata = {
    title: "Home | Luxury Real Estate Marketplace",
    description:
        "A quiet, considered approach to extraordinary property — off-market estates and architectural landmarks.",
};

const FEATURED_COUNT = 6;
const SALES_COUNT = 4;

const toGalleryTile = (property: Property, index: number): GalleryTileData => ({
    id: property.id,
    imageUrl: property.images[0]?.url ?? "",
    price: formatUsd(property.price),
    address: `${property.address}, ${property.locality}`,
    specs: `${property.bedrooms} Bd · ${property.bathrooms} Ba · ${(property.sqFt ?? 0).toLocaleString()} Sq Ft`,
    agentName: property.seller?.fullName ?? "Listing advisor",
    featured: index === 0,
});

const toLatestSale = (property: Property): LatestSaleData => ({
    id: property.id,
    imageUrl: property.images[0]?.url ?? "",
    address: property.address,
    locality: property.locality,
    price: formatCompactUsd(property.price),
    specs: `${property.bedrooms} Bd · ${property.bathrooms} Ba`,
    soldLabel: `Sold ${monthsSince(property.updatedAt)}mo ago`,
    daysOnMarket: daysBetween(property.createdAt, property.updatedAt),
});

export default async function Home() {
    const [featured, sold] = await Promise.all([
        propertiesServerAPI.list({
            status: "AVAILABLE",
            sort: "popular",
            limit: FEATURED_COUNT,
        }),
        propertiesServerAPI.list({ status: "SOLD", limit: SALES_COUNT }),
    ]);

    const properties = featured?.items ?? [];
    const premier = properties[0];
    const gallery = properties.map(toGalleryTile);
    const sales = (sold?.items ?? []).map(toLatestSale);

    return (
        <>
            <HeroSection />
            {premier && (
                <Reveal>
                    <PremierListing listing={toListing(premier)} />
                </Reveal>
            )}
            {gallery.length > 0 && (
                <Reveal>
                    <FeaturedGallery tiles={gallery} />
                </Reveal>
            )}
            <Reveal>
                <ConciergeSection />
            </Reveal>
            <Reveal>
                <StatsBand />
            </Reveal>
            <Reveal>
                <TestimonialsSection />
            </Reveal>
            {sales.length > 0 && (
                <Reveal>
                    <LatestSales sales={sales} />
                </Reveal>
            )}
            <Reveal>
                <CtaBanner />
            </Reveal>
        </>
    );
}
