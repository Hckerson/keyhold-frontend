import { Quote, ShieldCheck, Lock, BadgeCheck, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionShell } from "@/components/sections/section-shell";
import { SectionHeading } from "@/components/sections/section-heading";
import { Avatar } from "@/components/ui/avatar";

interface Testimonial {
    id: string;
    quote: string;
    name: string;
    role: string;
    avatarUrl: string;
    rating: number;
}

interface TrustBadge {
    icon: LucideIcon;
    label: string;
    detail: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        quote: "They showed us four houses and one of them was ours. No feed to trawl, no weekends lost — just the right shortlist, quietly assembled.",
        name: "Adaeze Okafor",
        role: "Bought in Bel Air",
        avatarUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
        rating: 5,
    },
    {
        id: "2",
        quote: "Our sale never reached the open market. Three approaches, one offer above guide, closed in twenty-six days with no disruption at home.",
        name: "James Reinhardt",
        role: "Sold in Beverly Hills",
        avatarUrl:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
        rating: 5,
    },
    {
        id: "3",
        quote: "The offer process was the part I dreaded. Having every document, counter and deadline in one place made it genuinely straightforward.",
        name: "Priya Raman",
        role: "Bought in Santa Monica",
        avatarUrl:
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
        rating: 5,
    },
    {
        id: "4",
        quote: "Discretion was the whole point for us. Nothing was listed publicly, and every viewing was arranged around our schedule.",
        name: "Tomás Herrera",
        role: "Bought in Malibu",
        avatarUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
        rating: 4,
    },
];

const TRUST_BADGES: TrustBadge[] = [
    {
        icon: ShieldCheck,
        label: "Verified platform",
        detail: "Every agent licence checked against state records",
    },
    {
        icon: Lock,
        label: "Bank-grade encryption",
        detail: "Offers and documents encrypted in transit and at rest",
    },
    {
        icon: BadgeCheck,
        label: "Escrow protected",
        detail: "Funds held by a licensed third-party escrow agent",
    },
];

function Rating({ value }: { value: number }) {
    return (
        <div
            className="flex items-center gap-0.5"
            aria-label={`${value} out of 5`}
        >
            {[1, 2, 3, 4, 5].map((step) => (
                <Star
                    key={step}
                    size={12}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={
                        step <= value
                            ? "fill-highlight text-highlight"
                            : "text-border-dark"
                    }
                />
            ))}
        </div>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <figure className="border-border bg-background-muted flex flex-col gap-3 rounded-xl border p-4 shadow-sm">
            <Quote
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-highlight-dark"
            />
            <blockquote className="text-text-secondary text-xs leading-[1.9]">
                {testimonial.quote}
            </blockquote>
            <figcaption className="border-border mt-auto flex items-center gap-2.5 border-t pt-3">
                <Avatar
                    size="sm"
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    initials={testimonial.name.charAt(0)}
                />
                <div className="min-w-0 flex-1">
                    <p className="text-text truncate text-xs font-semibold">
                        {testimonial.name}
                    </p>
                    <p className="text-text-muted truncate text-xs">
                        {testimonial.role}
                    </p>
                </div>
                <Rating value={testimonial.rating} />
            </figcaption>
        </figure>
    );
}

export function TestimonialsSection() {
    return (
        <section className="bg-background py-16 md:py-20">
            <SectionShell>
                <div className="mb-8">
                    <SectionHeading
                        eyebrow={`In their words · ${TESTIMONIALS.length} clients`}
                        title="Trusted with the decision that matters most"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {TESTIMONIALS.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}
                </div>

                <ul className="border-border mt-8 grid gap-4 border-t pt-6 sm:grid-cols-3">
                    {TRUST_BADGES.map((badge) => (
                        <li
                            key={badge.label}
                            className="flex items-start gap-2.5"
                        >
                            <span className="border-border text-accent grid size-7 shrink-0 place-items-center rounded-full border">
                                <badge.icon size={14} strokeWidth={1.5} />
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-text text-xs font-semibold">
                                    {badge.label}
                                </span>
                                <span className="text-text-muted text-xs leading-relaxed">
                                    {badge.detail}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </SectionShell>
        </section>
    );
}

TestimonialsSection.displayName = "TestimonialsSection";
