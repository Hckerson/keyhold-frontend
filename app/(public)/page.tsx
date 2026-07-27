import { HeroSection } from "@/components/sections/hero";
import { PremierListing } from "@/components/sections/premier-listing";
import { FeaturedGallery } from "@/components/sections/featured-gallery";
import { StatsBand } from "@/components/sections/stats-band";
import { ConciergeSection } from "@/components/sections/concierge";
import type { GalleryTileData } from "@/components/sections/gallery-tile";
import { propertyImage } from "@/lib/config/sample-images";

export const metadata = {
    title: "Home | Luxury Real Estate Marketplace",
    description:
        "A quiet, considered approach to extraordinary property — off-market estates and architectural landmarks.",
};

const GALLERY: GalleryTileData[] = [
    {
        id: "1",
        imageUrl: propertyImage(1),
        price: "$4,200,000",
        address: "567 Ocean View Drive, Malibu",
        specs: "4 Bd · 5 Ba · 6,100 Sq Ft",
        featured: true,
    },
    {
        id: "2",
        imageUrl: propertyImage(2),
        price: "$2,950,000",
        address: "18 Camden Terrace, Bel Air",
        specs: "3 Bd · 3 Ba · 3,200 Sq Ft",
    },
    {
        id: "3",
        imageUrl: propertyImage(4),
        price: "$3,480,000",
        address: "402 Laurel Canyon Road",
        specs: "4 Bd · 4 Ba · 4,050 Sq Ft",
    },
    {
        id: "4",
        imageUrl: propertyImage(5),
        price: "$5,120,000",
        address: "9 Palisades Bluff, Santa Monica",
        specs: "5 Bd · 5 Ba · 5,600 Sq Ft",
    },
    {
        id: "5",
        imageUrl: propertyImage(6),
        price: "$6,750,000",
        address: "1200 Summit Ridge, Beverly Hills",
        specs: "6 Bd · 7 Ba · 7,300 Sq Ft",
    },
];

export default function Home() {
    return (
        <>
            <HeroSection />
            <PremierListing />
            <FeaturedGallery tiles={GALLERY} />
            <StatsBand />
            <ConciergeSection />
        </>
    );
}
