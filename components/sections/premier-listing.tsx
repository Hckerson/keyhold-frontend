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
import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";

interface Spec {
    icon: LucideIcon;
    value: string;
    label: string;
}

const IMAGE =
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80";

const SPECS: Spec[] = [
    { icon: BedDouble, value: "5", label: "Bedrooms" },
    { icon: Bath, value: "6", label: "Bathrooms" },
    { icon: Ruler, value: "8,400", label: "Sq Ft" },
];

export function PremierListing() {
    return (
        <section className="bg-background py-20 md:py-24">
            <SectionShell>
                <div className="grid items-center gap-12 lg:grid-cols-[58%_1fr] lg:gap-14">
                    <div className="relative">
                        <span className="bg-highlight text-text-inverse text-caption absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-mono tracking-[0.12em] uppercase shadow-lg">
                            <Star size={14} strokeWidth={1.5} />
                            Premier Listing
                        </span>
                        <img
                            src={IMAGE}
                            alt="The Canyon House"
                            className="h-[420px] w-full rounded-2xl object-cover md:h-[560px]"
                        />
                    </div>

                    <div>
                        <p className="text-highlight-dark text-caption font-mono tracking-[0.14em] uppercase">
                            Beverly Hills · Off-Market
                        </p>
                        <h2 className="font-display text-text text-h3 mt-3 mb-4 font-light">
                            The Canyon House
                        </h2>
                        <div className="text-text-secondary flex items-center gap-2 text-sm">
                            <MapPin
                                size={15}
                                strokeWidth={1.5}
                                className="text-text-muted shrink-0"
                            />
                            123 Beverly Hills Drive, Los Angeles, CA
                        </div>

                        <div className="mt-6 flex items-baseline gap-3.5">
                            <span className="font-display text-text text-h3 font-light tracking-tight tabular-nums">
                                $8,750,000
                            </span>
                            <span className="text-text-muted text-caption font-mono tracking-wide uppercase">
                                Guide Price
                            </span>
                        </div>

                        <div className="bg-border my-6 h-px" />

                        <div className="flex flex-wrap gap-x-10 gap-y-4">
                            {SPECS.map((spec) => (
                                <div
                                    key={spec.label}
                                    className="flex items-start gap-3"
                                >
                                    <spec.icon
                                        size={18}
                                        strokeWidth={1.5}
                                        className="text-highlight-dark mt-1 shrink-0"
                                    />
                                    <div>
                                        <p className="font-display text-text text-h5 leading-none font-light tabular-nums">
                                            {spec.value}
                                        </p>
                                        <p className="text-text-muted text-caption mt-1.5 font-mono tracking-wide uppercase">
                                            {spec.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-7">
                            <Button variant="primary">
                                Private Viewing
                                <ArrowUpRight
                                    size={16}
                                    strokeWidth={1.5}
                                    className="ml-1.5"
                                />
                            </Button>
                            <Link
                                href="/listing/1"
                                className="border-border-dark hover:border-accent text-text ease-smooth inline-flex items-center gap-2 border-b pb-0.5 text-sm font-medium transition-colors"
                            >
                                View full dossier
                                <ArrowRight
                                    size={15}
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
