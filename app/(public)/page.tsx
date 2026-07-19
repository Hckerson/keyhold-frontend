import { HeroSection } from "@/components/sections/hero";
import { FeaturedListings } from "@/components/sections/featured-listings";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TrustSignals } from "@/components/sections/trust-signals";
import type { Property } from "@/components/ui/property-card";

export const metadata = {
    title: "Home | Luxury Real Estate Marketplace",
    description:
        "Discover exclusive luxury properties with white-glove concierge service.",
};

const FEATURED_LISTINGS: Property[] = [
    {
        id: "1",
        imageUrl:
            "https://images.unsplash.com/photo-1494976866556-6812c9d1c72e?w=500&h=400&fit=crop",
        price: 2500000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        address: "123 Beverly Hills Drive",
        locality: "Los Angeles, CA",
        featured: true,
    },
    {
        id: "2",
        imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop",
        price: 1850000,
        beds: 3,
        baths: 2,
        sqft: 4100,
        address: "456 Pacific Heights",
        locality: "San Francisco, CA",
    },
    {
        id: "3",
        imageUrl:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
        price: 3200000,
        beds: 5,
        baths: 4,
        sqft: 6800,
        address: "789 Malibu Crest",
        locality: "Malibu, CA",
        featured: true,
    },
];

export default function Home() {
    return (
        <main className="w-full">
            <HeroSection />
            <TrustSignals />
            <FeaturedListings listings={FEATURED_LISTINGS} />
            <HowItWorks />
        </main>
    );
}
