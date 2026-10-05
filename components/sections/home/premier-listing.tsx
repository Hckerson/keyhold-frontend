import Link from "next/link";
import {
    MapPin,
    BedDouble,
    Bath,
    Ruler,
    ArrowUpRight,
    ArrowRight,
} from "lucide-react";
import { SectionShell } from "@/components/patterns/section-shell";
import { SectionHeading } from "@/components/patterns/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { formatUsd } from "@/lib/utils";
import type { Listing, PremierMediaView, PremierSpec } from "@/lib/types";
import { PUBLIC_ROUTES } from "@/lib/constants";
import { formatCount } from "@/lib/utils/format";
import { PROPERTY_TYPE_LABELS } from "@/lib/enums/enums";
import { PremierListingMedia } from "@/components/sections/home/premier-listing-media";
import { PremierSpecCluster } from "@/components/sections/home/premier-spec-cluster";

interface PremierListingProps {
    listing: Listing;
}

interface ListingView extends PremierMediaView {
    id: string;
    place: string;
    address: string;
    price: string;
    priceLabel: string;
}

const PRICE_LABEL = "Guide price";
const POPULAR_BADGE = "Most viewed";
const VIEWING_ACTION = "Private viewing";
const DOSSIER_ACTION = "View full dossier";

const toView = (listing: Listing): ListingView => ({
    id: listing.id,
    image: listing.images[0] ?? "",
    place: `${listing.locality.split(",")[0]} · ${PROPERTY_TYPE_LABELS[listing.type]}`,
    name: listing.title,
    address: `${listing.address}, ${listing.locality}`,
    price: formatUsd(listing.price),
    priceLabel: PRICE_LABEL,
    badge: listing.featured ? undefined : POPULAR_BADGE,
});

const toSpecs = (listing: Listing): PremierSpec[] => [
    { icon: BedDouble, value: String(listing.beds), label: "Bedrooms" },
    { icon: Bath, value: String(listing.baths), label: "Bathrooms" },
    { icon: Ruler, value: formatCount(listing.sqft), label: "Sq Ft" },
];

export function PremierListing({ listing }: PremierListingProps) {
    const view = toView(listing);
    const specs = toSpecs(listing);

    return (
        <section className="section-pady bg-background">
            <SectionShell>
                <div className="grid items-center gap-10 lg:grid-cols-[58%_1fr] lg:gap-14">
                    <PremierListingMedia listing={view} />

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

                        <PremierSpecCluster specs={specs} />

                        <div className="flex flex-wrap items-center gap-6">
                            <Link
                                href={`${PUBLIC_ROUTES.listing(view.id)}#agent`}
                                className={buttonVariants({
                                    emphasis: "solid",
                                    tone: "accent",
                                })}
                            >
                                {VIEWING_ACTION}
                                <ArrowUpRight
                                    size={15}
                                    strokeWidth={1.5}
                                    className="ml-1.5"
                                />
                            </Link>
                            <Link
                                href={PUBLIC_ROUTES.listing(view.id)}
                                className="border-border-dark hover:border-accent text-text ease-smooth inline-flex items-center gap-1.5 border-b pb-0.5 text-xs font-medium transition-colors duration-200"
                            >
                                {DOSSIER_ACTION}
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
