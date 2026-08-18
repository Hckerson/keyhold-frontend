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
import {
    FEATURED_LISTINGS,
    RECENT_SALES,
    formatPrice,
} from "@/lib/data/listings";
import { formatCompactUsd } from "@/lib/utils";

export const metadata = {
    title: "Home | Luxury Real Estate Marketplace",
    description:
        "A quiet, considered approach to extraordinary property — off-market estates and architectural landmarks.",
};

const GALLERY: GalleryTileData[] = FEATURED_LISTINGS.map((listing, index) => ({
    id: listing.id,
    imageUrl: listing.images[0],
    price: formatPrice(listing.price),
    address: `${listing.address}, ${listing.locality}`,
    specs: `${listing.beds} Bd · ${listing.baths} Ba · ${listing.sqft.toLocaleString()} Sq Ft`,
    agentName: listing.agent.name,
    featured: index === 0,
}));

const SALES: LatestSaleData[] = RECENT_SALES.map((listing) => ({
    id: listing.id,
    imageUrl: listing.images[0],
    address: listing.address,
    locality: listing.locality,
    price: formatCompactUsd(listing.price),
    specs: `${listing.beds} Bd · ${listing.baths} Ba`,
    soldLabel: `Sold ${listing.soldMonthsAgo}mo ago`,
    daysOnMarket: 12 + Number(listing.id) * 2,
}));

export default function Home() {
    return (
        <>
            <HeroSection />
            <Reveal>
                <PremierListing />
            </Reveal>
            <Reveal>
                <FeaturedGallery tiles={GALLERY} />
            </Reveal>
            <Reveal>
                <ConciergeSection />
            </Reveal>
            <Reveal>
                <StatsBand />
            </Reveal>
            <Reveal>
                <TestimonialsSection />
            </Reveal>
            <Reveal>
                <LatestSales sales={SALES} />
            </Reveal>
            <Reveal>
                <CtaBanner />
            </Reveal>
        </>
    );
}
