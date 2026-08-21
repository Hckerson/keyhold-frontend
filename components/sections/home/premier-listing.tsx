import Link from "next/link";
import {
    Star,
    MapPin,
    BedDouble,
    Bath,
    Ruler,
    ArrowUpRight,
    ArrowRight,
    type LucideIcon,
} from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { Button } from "@/components/ui/button";
import { formatUsd } from "@/lib/utils";
import type { Listing } from "@/lib/types";

interface Spec {
    icon: LucideIcon;
    value: string;
    label: string;
}

interface PremierListingProps {
    listing: Listing;
}

interface ListingView {
    id: string;
    image: string;
    place: string;
    name: string;
    address: string;
    price: string;
    priceLabel: string;
}

const PRICE_LABEL = "Guide price";

const toView = (listing: Listing): ListingView => ({
    id: listing.id,
    image: listing.images[0] ?? "",
    place: `${listing.locality.split(",")[0]} · Off-market`,
    name: listing.title,
    address: `${listing.address}, ${listing.locality}`,
    price: formatUsd(listing.price),
    priceLabel: PRICE_LABEL,
});

const toSpecs = (listing: Listing): Spec[] => [
    { icon: BedDouble, value: String(listing.beds), label: "Bedrooms" },
    { icon: Bath, value: String(listing.baths), label: "Bathrooms" },
    { icon: Ruler, value: listing.sqft.toLocaleString(), label: "Sq Ft" },
];

function ListingMedia({ listing }: { listing: ListingView }) {
    return (
        <div className="relative">
            <span className="bg-sidebar/75 text-text-inverse ring-highlight/30 absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase shadow-md ring-1 backdrop-blur-md">
                <Star size={12} strokeWidth={1.5} className="text-highlight" />
                Premier listing
            </span>
            <img
                src={listing.image}
                alt={listing.name}
                className="h-100 w-full rounded-xl object-cover shadow-md md:h-140"
            />
        </div>
    );
}

function SpecCluster({ specs }: { specs: Spec[] }) {
    return (
        <div className="bg-background-muted/60 border-border-light flex flex-wrap gap-x-8 gap-y-3 rounded-md border p-3">
            {specs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-2">
                    <spec.icon
                        size={12}
                        strokeWidth={1.5}
                        className="text-highlight-dark shrink-0"
                    />
                    <span className="text-text text-xs font-semibold tabular-nums">
                        {spec.value}
                    </span>
                    <span className="text-text-muted font-mono text-[10px] tracking-[0.12em] uppercase">
                        {spec.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

export function PremierListing({ listing }: PremierListingProps) {
    const view = toView(listing);
    const specs = toSpecs(listing);

    return (
        <section className="bg-background py-16 md:py-20">
            <SectionShell>
                <div className="grid items-center gap-10 lg:grid-cols-[58%_1fr] lg:gap-14">
                    <ListingMedia listing={view} />

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2.5">
                            <SectionHeading
                                eyebrow={view.place}
                                title={view.name}
                            />
                            <p className="text-text-secondary flex items-center gap-1.5 text-xs">
                                <MapPin
                                    size={12}
                                    strokeWidth={1.5}
                                    className="text-text-muted shrink-0"
                                />
                                {view.address}
                            </p>
                        </div>

                        <div className="relative isolate flex items-baseline gap-3">
                            <div
                                aria-hidden="true"
                                className="bg-highlight/25 pointer-events-none absolute -top-6 -left-6 -z-10 h-24 w-56 rounded-full blur-3xl"
                            />
                            <span className="font-display text-text text-h3 leading-none font-light tracking-tight tabular-nums">
                                {view.price}
                            </span>
                            <span className="text-text-muted font-mono text-[10px] tracking-[0.14em] uppercase">
                                {view.priceLabel}
                            </span>
                        </div>

                        <SpecCluster specs={specs} />

                        <div className="flex flex-wrap items-center gap-6">
                            <Button variant="primary" size="md">
                                Private viewing
                                <ArrowUpRight
                                    size={15}
                                    strokeWidth={1.5}
                                    className="ml-1.5"
                                />
                            </Button>
                            <Link
                                href={`/listing/${view.id}`}
                                className="border-border-dark hover:border-accent text-text ease-smooth inline-flex items-center gap-1.5 border-b pb-0.5 text-xs font-medium transition-colors duration-200"
                            >
                                View full dossier
                                <ArrowRight
                                    size={12}
                                    strokeWidth={1.5}
                                    className="text-highlight-dark"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </SectionShell>
        </section>
    );
}
