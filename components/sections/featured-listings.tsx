import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";

interface Listing {
    id: string;
    image: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    address: string;
    featured?: boolean;
}

interface FeaturedListingsProps {
    listings: Listing[];
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
                            <Card
                                key={listing.id}
                                className="group overflow-hidden"
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={listing.image}
                                        alt={listing.address}
                                        variant="card"
                                        className="transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {listing.featured && (
                                        <Badge className="bg-accent text-text absolute top-4 right-4">
                                            Featured
                                        </Badge>
                                    )}
                                </div>

                                <CardContent className="space-y-4 p-6">
                                    <div className="space-y-2">
                                        <h3 className="text-h5 font-body text-text font-normal">
                                            ${listing.price.toLocaleString()}
                                        </h3>
                                        <p className="text-text-secondary text-sm">
                                            {listing.address}
                                        </p>
                                    </div>

                                    <div className="text-text-muted flex gap-4 text-sm">
                                        <span>
                                            {listing.beds} bed
                                            {listing.beds !== 1 ? "s" : ""}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {listing.baths} bath
                                            {listing.baths !== 1 ? "s" : ""}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {listing.sqft.toLocaleString()} sqft
                                        </span>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
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
