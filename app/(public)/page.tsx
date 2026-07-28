import { HeroSection } from "@/components/sections/hero";
import { PremierListing } from "@/components/sections/premier-listing";
import { FeaturedGallery } from "@/components/sections/featured-gallery";
import { StatsBand } from "@/components/sections/stats-band";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ConciergeSection } from "@/components/sections/concierge";
import {
    LatestSales,
    type LatestSaleData,
} from "@/components/sections/latest-sales";
import { CtaBanner } from "@/components/sections/cta-banner";
import type { GalleryTileData } from "@/components/sections/gallery-tile";
import {
    FEATURED_LISTINGS,
    RECENT_SALES,
    formatPrice,
    formatCompactPrice,
} from "@/app/(public)/_data/listings";

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
    price: formatCompactPrice(listing.price),
    specs: `${listing.beds} Bd · ${listing.baths} Ba`,
    soldLabel: `Sold ${listing.soldMonthsAgo}mo ago`,
    daysOnMarket: 12 + Number(listing.id) * 2,
}));

export default function Home() {
    return (
        <>
            <HeroSection />
            <PremierListing />
            <FeaturedGallery tiles={GALLERY} />
            <ConciergeSection />
            <StatsBand />
            <TestimonialsSection />
            <LatestSales sales={SALES} />
            <CtaBanner />
        </>
    );
}
