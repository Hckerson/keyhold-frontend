import { HeroSection } from "@/components/sections/hero";
import { PremierListing } from "@/components/sections/premier-listing";
import { FeaturedGallery } from "@/components/sections/featured-gallery";
import { StatsBand } from "@/components/sections/stats-band";
import { ConciergeSection } from "@/components/sections/concierge";
import type { GalleryTileData } from "@/components/sections/gallery-tile";

export const metadata = {
    title: "Home | Luxury Real Estate Marketplace",
    description:
        "A quiet, considered approach to extraordinary property — off-market estates and architectural landmarks.",
};

const GALLERY: GalleryTileData[] = [
    {
        id: "1",
        imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        price: "$4,200,000",
        address: "567 Ocean View Drive",
        specs: "4 Bd · 5 Ba · 6,100 Sq Ft",
        featured: true,
    },
    {
        id: "2",
        imageUrl:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        price: "$2,950,000",
        specs: "3 Bd · 3 Ba · 3,200 Sq Ft",
    },
    {
        id: "3",
        imageUrl:
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
        price: "$3,480,000",
        specs: "4 Bd · 4 Ba · 4,050 Sq Ft",
    },
    {
        id: "4",
        imageUrl:
            "https://images.unsplash.com/photo-1580216643062-cf460548a66a?w=1200&q=80",
        price: "$5,120,000",
        specs: "5 Bd · 5 Ba · 5,600 Sq Ft",
    },
    {
        id: "5",
        imageUrl:
            "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80",
        price: "$6,750,000",
        specs: "6 Bd · 7 Ba · 7,300 Sq Ft",
    },
];

export default function Home() {
    return (
        <main className="w-full">
            <HeroSection />
            <PremierListing />
            <FeaturedGallery tiles={GALLERY} />
            <StatsBand />
            <ConciergeSection />
        </main>
    );
}
