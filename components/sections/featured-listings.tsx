import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PropertyCard, type Property } from "@/components/ui/property-card";

interface FeaturedListingsProps {
    listings: Property[];
}

export function FeaturedListings({ listings }: FeaturedListingsProps) {
    return (
        <section className="bg-background py-16 md:py-24">
            <Container>
                <div className="space-y-12">
                    <div className="space-y-4 text-center">
                        <h2 className="text-h2 font-display text-text font-light">
                            Curated Selections
                        </h2>
                        <p className="text-text-secondary mx-auto max-w-2xl text-lg">
                            Handpicked luxury properties selected for discerning
                            buyers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {listings.map((listing) => (
                            <PropertyCard key={listing.id} property={listing} />
                        ))}
                    </div>

                    <div className="pt-8 text-center">
                        <Button variant="primary" size="lg">
                            Browse All Properties
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
