import {
    Check,
    MapPin,
    BedDouble,
    Bath,
    Ruler,
    Home,
    CalendarDays,
    TrendingUp,
    ArrowUp,
    ArrowDown,
    CalendarCheck,
    Heart,
    Phone,
    MessageSquare,
    ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

const NEIGHBORHOOD_STATS = [
    { label: "Walk Score", value: "88" },
    { label: "Median Home", value: "$2.6M" },
    { label: "Days on Market", value: "12" },
];

const eyebrow = "font-mono text-[10px] uppercase tracking-wide text-text-muted";

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
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=600&fit=crop",
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

    const pricePerSqft = Math.round(listing.price / listing.sqft);

    const keyFacts = [
        { icon: BedDouble, label: "Beds", value: String(listing.beds) },
        { icon: Bath, label: "Baths", value: String(listing.baths) },
        { icon: Ruler, label: "Sq Ft", value: listing.sqft.toLocaleString() },
        { icon: Home, label: "Type", value: listing.propertyType },
        {
            icon: CalendarDays,
            label: "Built",
            value: String(listing.yearBuilt),
        },
        {
            icon: TrendingUp,
            label: "$ / Sq Ft",
            value: `$${pricePerSqft.toLocaleString()}`,
        },
    ];

    const comparables = COMPARABLES.map((comp) => ({
        ...comp,
        delta: Math.round(((comp.price - listing.price) / listing.price) * 100),
    }));

    return (
        <Container className="py-8">
            <div className="w-full">
                <div className="grid h-[300px] grid-cols-1 gap-2 md:h-[440px] md:grid-cols-3 md:grid-rows-2">
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

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        <section className="border-border-light bg-background-muted/60 relative isolate overflow-hidden rounded-xl border p-6 shadow-sm md:p-7">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--color-text)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top_left,#000,transparent_70%)] bg-[size:32px_32px] opacity-[0.04]"
                            />
                            <div
                                aria-hidden
                                className="bg-highlight/15 pointer-events-none absolute -top-16 -left-12 -z-10 h-56 w-56 rounded-full blur-3xl"
                            />

                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="highlight" size="sm">
                                            For Sale
                                        </Badge>
                                        <span className={eyebrow}>
                                            {listing.propertyType}
                                        </span>
                                    </div>
                                    <h1 className="text-h3 font-display text-text md:text-h2 font-light tabular-nums">
                                        ${listing.price.toLocaleString()}
                                    </h1>
                                    <div className="text-text-secondary flex items-center gap-1.5 text-base">
                                        <MapPin
                                            size={14}
                                            strokeWidth={1.5}
                                            className="text-text-muted shrink-0"
                                        />
                                        <span>{listing.address}</span>
                                    </div>
                                    <p className="text-text-muted text-sm">
                                        {listing.city}, {listing.zipcode}
                                    </p>
                                </div>
                            </div>

                            <dl className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {keyFacts.map(
                                    ({ icon: Icon, label, value }) => (
                                        <div
                                            key={label}
                                            className="border-border-light/70 bg-background/60 rounded-md border p-3"
                                        >
                                            <div className="text-text-muted flex items-center gap-1.5">
                                                <Icon
                                                    size={12}
                                                    strokeWidth={1.5}
                                                    className="shrink-0"
                                                />
                                                <dt className={eyebrow}>
                                                    {label}
                                                </dt>
                                            </div>
                                            <dd className="text-text mt-1.5 truncate text-sm font-medium tabular-nums md:text-base">
                                                {value}
                                            </dd>
                                        </div>
                                    ),
                                )}
                            </dl>
                        </section>

                        <section className="space-y-3">
                            <span className={eyebrow}>Overview</span>
                            <h2 className="text-h5 font-display text-text font-light">
                                About This Property
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                {listing.description}
                            </p>
                        </section>

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
                                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {FEATURES.map((feature) => (
                                        <li
                                            key={feature}
                                            className="bg-background-muted/40 border-border-light hover:border-border flex items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors"
                                        >
                                            <span className="border-accent-light bg-accent-light/40 grid size-6 shrink-0 place-items-center rounded-full border">
                                                <Check
                                                    size={12}
                                                    strokeWidth={1.5}
                                                    className="text-accent"
                                                />
                                            </span>
                                            <span className="text-text text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>

                            <TabsContent value="neighborhood" className="pt-6">
                                <div className="space-y-5">
                                    <p className="text-text-secondary leading-relaxed">
                                        This prestigious neighborhood is known
                                        for its exclusivity and privacy. Close
                                        to fine dining, shopping, and
                                        entertainment.
                                    </p>
                                    <dl className="grid grid-cols-3 gap-2">
                                        {NEIGHBORHOOD_STATS.map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="border-border-light bg-background-muted/40 rounded-lg border p-3"
                                            >
                                                <dt className={eyebrow}>
                                                    {stat.label}
                                                </dt>
                                                <dd className="text-text mt-1 text-lg font-light tabular-nums">
                                                    {stat.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <div className="border-border-light border-t pt-4">
                                        <p className={eyebrow}>
                                            Nearby Schools
                                        </p>
                                        <p className="text-text mt-1 text-sm">
                                            Top-rated private schools within
                                            walking distance
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="comparables" className="pt-6">
                                <div className="bg-background-muted/40 border-border-light space-y-1 rounded-xl border p-1.5">
                                    {comparables.map((comp) => {
                                        const cheaper = comp.delta < 0;
                                        return (
                                            <div
                                                key={comp.address}
                                                className="bg-background/60 flex items-center justify-between gap-4 rounded-lg px-3.5 py-3"
                                            >
                                                <div className="min-w-0">
                                                    <p className="text-text truncate text-sm font-medium">
                                                        {comp.address}
                                                    </p>
                                                    <p className="text-text-muted text-xs">
                                                        Sold{" "}
                                                        {comp.soldMonthsAgo}{" "}
                                                        month
                                                        {comp.soldMonthsAgo > 1
                                                            ? "s"
                                                            : ""}{" "}
                                                        ago
                                                    </p>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-2.5">
                                                    {comp.delta !== 0 && (
                                                        <span
                                                            className={cn(
                                                                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular-nums",
                                                                cheaper
                                                                    ? "bg-success-light text-success"
                                                                    : "bg-warning-light text-warning",
                                                            )}
                                                        >
                                                            {cheaper ? (
                                                                <ArrowDown
                                                                    size={10}
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                />
                                                            ) : (
                                                                <ArrowUp
                                                                    size={10}
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                />
                                                            )}
                                                            {Math.abs(
                                                                comp.delta,
                                                            )}
                                                            %
                                                        </span>
                                                    )}
                                                    <p className="text-text text-sm font-medium tabular-nums">
                                                        $
                                                        {comp.price.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <aside className="space-y-4 lg:col-span-1">
                        <div className="border-highlight/25 bg-background-muted/70 ring-highlight/10 relative isolate overflow-hidden rounded-xl border p-5 shadow-md ring-1 lg:sticky lg:top-24">
                            <div
                                aria-hidden
                                className="bg-highlight/25 pointer-events-none absolute -top-14 -right-10 -z-10 h-44 w-44 rounded-full blur-3xl"
                            />
                            <p className={eyebrow}>Asking Price</p>
                            <p className="text-h4 font-display text-text mt-1 font-light tabular-nums">
                                ${listing.price.toLocaleString()}
                            </p>
                            <p className="text-text-secondary mt-0.5 text-sm">
                                Private viewings available this week
                            </p>

                            <div className="mt-4 space-y-2">
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    icon={
                                        <CalendarCheck
                                            size={14}
                                            strokeWidth={1.5}
                                        />
                                    }
                                >
                                    Request Viewing
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    icon={<Heart size={14} strokeWidth={1.5} />}
                                >
                                    Save Property
                                </Button>
                            </div>

                            <div className="text-text-muted mt-3 flex items-center gap-1.5">
                                <ShieldCheck size={12} strokeWidth={1.5} />
                                <span className="text-xs">
                                    Verified luxury listing
                                </span>
                            </div>
                        </div>

                        <Panel title="Your Agent">
                            <div className="flex items-center gap-3">
                                <img
                                    src={listing.agent.image}
                                    alt={listing.agent.name}
                                    className="ring-border-light size-12 shrink-0 rounded-full object-cover ring-1"
                                />
                                <div className="min-w-0">
                                    <p className="text-text truncate text-sm font-medium">
                                        {listing.agent.name}
                                    </p>
                                    <p className="text-text-secondary truncate text-xs">
                                        Luxury Specialist
                                    </p>
                                    <p className="text-highlight-dark mt-0.5 text-xs font-medium">
                                        Responds in {listing.agent.responseTime}
                                    </p>
                                </div>
                            </div>

                            <div className="border-border-light mt-4 space-y-2 border-t pt-4">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full"
                                    icon={<Phone size={14} strokeWidth={1.5} />}
                                >
                                    Call {listing.agent.phone}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full"
                                    icon={
                                        <MessageSquare
                                            size={14}
                                            strokeWidth={1.5}
                                        />
                                    }
                                >
                                    Message
                                </Button>
                            </div>
                        </Panel>
                    </aside>
                </div>
            </div>
        </Container>
    );
}
