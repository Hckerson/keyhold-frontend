import { Container } from "@/components/ui/container";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const metadata = {
    title: "Property Details | Luxury Real Estate",
    description: "View detailed information about this luxury property.",
};

interface ListingDetailPageProps {
    params: { id: string };
}

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
    const isSaved = false;

    const listing = {
        id: params.id,
        title: "Luxury Modern Villa",
        price: 2500000,
        beds: 4,
        baths: 3,
        sqft: 5200,
        address: "123 Beverly Hills Drive",
        city: "Los Angeles, CA",
        zipcode: "90210",
        yearBuilt: 2018,
        propertyType: "Single Family Home",
        description:
            "This stunning modern villa features floor-to-ceiling windows, an open floor plan, and state-of-the-art amenities. Located in one of Los Angeles's most prestigious neighborhoods, this property offers unparalleled luxury and privacy.",
        images: [
            "https://images.unsplash.com/photo-1494976866556-6812c9d1c72e?w=1200&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=600&fit=crop",
        ],
        agent: {
            name: "Sarah Johnson",
            phone: "(555) 123-4567",
            email: "sarah@luxuryrealestate.com",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            responseTime: "< 2 hours",
        },
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Hero Gallery */}
            <div className="w-full">
                <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    className="h-96 w-full object-cover md:h-600"
                />
            </div>

            <Container className="py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-12 lg:col-span-2">
                        {/* Price & Key Info */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-h2 font-display text-text font-light">
                                    ${listing.price.toLocaleString()}
                                </h1>
                                <p className="text-text-secondary text-lg">
                                    {listing.address}
                                </p>
                                <p className="text-text-muted text-base">
                                    {listing.city}, {listing.zipcode}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Badge variant="primary">
                                    {listing.beds} Bedrooms
                                </Badge>
                                <Badge variant="default">
                                    {listing.baths} Bathrooms
                                </Badge>
                                <Badge variant="default">
                                    {listing.sqft.toLocaleString()} sqft
                                </Badge>
                            </div>

                            <div className="border-border grid grid-cols-2 gap-4 border-y py-6 md:grid-cols-4">
                                <div>
                                    <p className="text-text-muted text-sm">
                                        Property Type
                                    </p>
                                    <p className="text-text text-base font-medium">
                                        {listing.propertyType}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm">
                                        Year Built
                                    </p>
                                    <p className="text-text text-base font-medium">
                                        {listing.yearBuilt}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm">
                                        Beds / Baths
                                    </p>
                                    <p className="text-text text-base font-medium">
                                        {listing.beds} / {listing.baths}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm">
                                        Square Feet
                                    </p>
                                    <p className="text-text text-base font-medium">
                                        {listing.sqft.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description & Details */}
                        <div className="space-y-4">
                            <h2 className="text-h4 font-body text-text font-normal">
                                About This Property
                            </h2>
                            <p className="text-text-secondary text-base leading-relaxed">
                                {listing.description}
                            </p>
                        </div>

                        {/* Tabs for additional info */}
                        <Tabs defaultValue="features">
                            <TabsList>
                                <TabsTrigger value="features">
                                    Features
                                </TabsTrigger>
                                <TabsTrigger value="neighborhood">
                                    Neighborhood
                                </TabsTrigger>
                                <TabsTrigger value="comparables">
                                    Comparables
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="features" className="pt-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {[
                                        "Smart Home Technology",
                                        "Swimming Pool",
                                        "Home Theater",
                                        "Wine Cellar",
                                        "Chef's Kitchen",
                                        "Master Suite",
                                        "Private Gym",
                                        "Guest House",
                                    ].map((feature) => (
                                        <div
                                            key={feature}
                                            className="bg-background-muted flex items-center gap-3 rounded-sm p-3"
                                        >
                                            <span className="text-accent">
                                                ✓
                                            </span>
                                            <span className="text-text">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="neighborhood" className="pt-6">
                                <div className="space-y-4">
                                    <p className="text-text-secondary">
                                        This prestigious neighborhood is known
                                        for its exclusivity and privacy. Close
                                        to fine dining, shopping, and
                                        entertainment.
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-text-muted text-sm">
                                            Nearby Schools
                                        </p>
                                        <p className="text-text">
                                            Top-rated private schools within
                                            walking distance
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="comparables" className="pt-6">
                                <div className="space-y-4">
                                    <p className="text-text-secondary">
                                        Recent comparable sales in the area show
                                        strong market demand for luxury
                                        properties.
                                    </p>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="border-border space-y-2 rounded-sm border p-4"
                                            >
                                                <p className="text-text-muted text-sm">
                                                    Similar Property {i}
                                                </p>
                                                <p className="text-h6 text-text">
                                                    $
                                                    {(
                                                        2400000 +
                                                        i * 100000
                                                    ).toLocaleString()}
                                                </p>
                                                <p className="text-text-secondary text-sm">
                                                    Sold {i} month
                                                    {i > 1 ? "s" : ""} ago
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* CTA Sticky */}
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-h5">
                                    Ready to View?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                    >
                                        Request Viewing
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        Save Property
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Agent Card */}
                        <Card>
                            <CardContent className="space-y-4 p-6">
                                <h3 className="text-h6 font-body text-text font-medium">
                                    Your Agent
                                </h3>

                                <div className="flex gap-4">
                                    <Image
                                        src={listing.agent.image}
                                        alt={listing.agent.name}
                                        variant="avatar"
                                    />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-text font-medium">
                                            {listing.agent.name}
                                        </p>
                                        <p className="text-text-secondary text-sm">
                                            Luxury Specialist
                                        </p>
                                        <p className="text-text-muted text-xs">
                                            Response:{" "}
                                            {listing.agent.responseTime}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-border space-y-2 border-t pt-4">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-full"
                                    >
                                        Call {listing.agent.phone}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full"
                                    >
                                        Message
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
}
