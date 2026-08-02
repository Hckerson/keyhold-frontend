"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "@/components/patterns/section-heading";

interface ListingDescriptionProps {
    description: string;
    highlights: string[];
}

export function ListingDescription({
    description,
    highlights,
}: ListingDescriptionProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="flex flex-col gap-3">
            <SectionEyebrow tone="muted">Overview</SectionEyebrow>
            <h2 className="text-h5 font-display text-text leading-tight font-light tracking-tight">
                About this property
            </h2>

            <p
                id="listing-description"
                className={cn(
                    "text-text-secondary text-xs leading-[1.9]",
                    !expanded && "line-clamp-3",
                )}
            >
                {description}
            </p>

            {expanded && (
                <ul className="grid gap-2 sm:grid-cols-2">
                    {highlights.map((highlight) => (
                        <li
                            key={highlight}
                            className="text-text flex items-center gap-2 text-xs"
                        >
                            <Check
                                className="text-accent size-3 shrink-0"
                                strokeWidth={1.5}
                            />
                            {highlight}
                        </li>
                    ))}
                </ul>
            )}

            <button
                type="button"
                onClick={() => setExpanded((open) => !open)}
                aria-expanded={expanded}
                aria-controls="listing-description"
                className="text-accent hover:text-accent-dark focus-visible:ring-accent ease-smooth inline-flex w-fit items-center gap-1 rounded text-xs font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                {expanded ? "Read less" : "Read more"}
                {expanded ? (
                    <ChevronUp size={12} strokeWidth={1.5} />
                ) : (
                    <ChevronDown size={12} strokeWidth={1.5} />
                )}
            </button>
        </section>
    );
}

ListingDescription.displayName = "ListingDescription";
