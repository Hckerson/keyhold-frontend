import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { MapExperience } from "@/components/sections/search/map-experience";
import { SearchResultsSkeleton } from "@/components/sections/search/search-skeleton";

export const metadata = {
    title: "Map View | Luxury Real Estate",
    description: "Explore the collection geographically, filtered as you go.",
};

export default function MapPage() {
    return (
        <Container className="py-8">
            <Suspense fallback={<SearchResultsSkeleton />}>
                <MapExperience />
            </Suspense>
        </Container>
    );
}
