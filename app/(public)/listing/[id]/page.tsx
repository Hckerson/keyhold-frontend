import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { PropertySpecs } from "@/components/ui/property-specs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const metadata = {
    title: "Property Details | Luxury Real Estate",
    description: "View detailed information about this luxury property.",
};

interface ListingDetailPageProps {
    params: Promise<{ id: string }>;
}

const FEATURES = [
    "Smart Home Technology",
    "Swimming Pool",
    "Home Theater",
    "Wine Cellar",
    "Chef's Kitchen",
    "Master Suite",
    "Private Gym",
    "Guest House",
];

const COMPARABLES = [
    { address: "145 Beverly Hills Drive", price: 2500000, soldMonthsAgo: 1 },
    { address: "982 Canon Terrace", price: 2600000, soldMonthsAgo: 2 },
    { address: "310 Rodeo Crest", price: 2700000, soldMonthsAgo: 3 },
    { address: "77 Whittier Lane", price: 2800000, soldMonthsAgo: 4 },
];

const specLabel =
    "text-text-muted font-mono text-[10px] tracking-wide uppercase";

export default async function ListingDetailPage({
    params,
}: ListingDetailPageProps) {
    const { id } = await params;

    const listing = {
        id,
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

    const specs = [
        { label: "Property Type", value: listing.propertyType },
        { label: "Year Built", value: String(listing.yearBuilt) },
        {
            label: "Price / Sq Ft",
            value: `$${Math.round(listing.price / listing.sqft).toLocaleString()}`,
        },
    ];

    return (
        <Container className="py-8">
            <div className="grid h-[300px] grid-cols-1 gap-2 md:h-[420px] md:grid-cols-3 md:grid-rows-2">
                <div className="relative overflow-hidden rounded-xl md:col-span-2 md:row-span-2">
                    <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="size-full object-cover"
                    />
                </div>
                {listing.images.slice(1, 3).map((src, i) => (
                    <div
                        key={src}
                        className="relative hidden overflow-hidden rounded-xl md:block"
                    >
                        <img
                            src={src}
                            alt={`${listing.title} view ${i + 2}`}
                            className="size-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                <div className="space-y-10 lg:col-span-2">
                    <div className="space-y-5">
                        <div className="space-y-1">
                            <h1 className="text-h2 font-display text-text font-light tabular-nums">
                                ${listing.price.toLocaleString()}
                            </h1>
                            <p className="text-text-secondary text-lg">
                                {listing.address}
                            </p>
                            <p className="text-text-muted text-sm">
                                {listing.city}, {listing.zipcode}
                            </p>
                        </div>

                        <PropertySpecs
                            beds={listing.beds}
                            baths={listing.baths}
                            sqft={listing.sqft}
                        />

                        <dl className="border-border-light grid grid-cols-2 gap-4 border-y py-5 md:grid-cols-3">
                            {specs.map((spec) => (
                                <div key={spec.label}>
                                    <dt className={specLabel}>{spec.label}</dt>
                                    <dd className="text-text mt-1 text-sm font-medium">
                                        {spec.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-h5 font-display text-text font-light">
                            About This Property
                        </h2>
                        <p className="text-text-secondary leading-relaxed">
                            {listing.description}
                        </p>
                    </section>

                    <Tabs defaultValue="features">
                        <TabsList>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="neighborhood">
                                Neighborhood
                            </TabsTrigger>
                            <TabsTrigger value="comparables">
                                Comparables
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="features" className="pt-6">
                            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                {FEATURES.map((feature) => (
                                    <li
                                        key={feature}
                                        className="bg-background-muted border-border-light flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
                                    >
                                        <Check
                                            size={14}
                                            strokeWidth={1.5}
                                            className="text-accent shrink-0"
                                        />
                                        <span className="text-text text-sm">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </TabsContent>

                        <TabsContent value="neighborhood" className="pt-6">
                            <div className="space-y-4">
                                <p className="text-text-secondary leading-relaxed">
                                    This prestigious neighborhood is known for
                                    its exclusivity and privacy. Close to fine
                                    dining, shopping, and entertainment.
                                </p>
                                <div>
                                    <p className={specLabel}>Nearby Schools</p>
                                    <p className="text-text mt-1 text-sm">
                                        Top-rated private schools within walking
                                        distance
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="comparables" className="pt-6">
                            <ul className="divide-border-light border-border-light divide-y rounded-xl border">
                                {COMPARABLES.map((comp) => (
                                    <li
                                        key={comp.address}
                                        className="flex items-center justify-between gap-4 px-4 py-3"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-text truncate text-sm font-medium">
                                                {comp.address}
                                            </p>
                                            <p className="text-text-muted text-xs">
                                                Sold {comp.soldMonthsAgo} month
                                                {comp.soldMonthsAgo > 1
                                                    ? "s"
                                                    : ""}{" "}
                                                ago
                                            </p>
                                        </div>
                                        <p className="text-text shrink-0 text-sm font-medium tabular-nums">
                                            ${comp.price.toLocaleString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </TabsContent>
                    </Tabs>
                </div>

                <aside className="space-y-4 lg:col-span-1">
                    <Panel
                        title="Ready to View?"
                        className="lg:sticky lg:top-24"
                    >
                        <div className="space-y-2.5">
                            <Button variant="primary" className="w-full">
                                Request Viewing
                            </Button>
                            <Button variant="secondary" className="w-full">
                                Save Property
                            </Button>
                        </div>
                    </Panel>

                    <Panel title="Your Agent">
                        <div className="flex items-center gap-3">
                            <img
                                src={listing.agent.image}
                                alt={listing.agent.name}
                                className="size-12 shrink-0 rounded-full object-cover"
                            />
                            <div className="min-w-0">
                                <p className="text-text truncate text-sm font-medium">
                                    {listing.agent.name}
                                </p>
                                <p className="text-text-secondary truncate text-xs">
                                    Luxury Specialist
                                </p>
                                <p className="text-text-muted mt-0.5 text-xs">
                                    Responds in {listing.agent.responseTime}
                                </p>
                            </div>
                        </div>

                        <div className="border-border-light mt-4 space-y-2 border-t pt-4">
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
                    </Panel>
                </aside>
            </div>
        </Container>
    );
}
