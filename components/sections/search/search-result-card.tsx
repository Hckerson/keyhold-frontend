"use client";

import { useState } from "react";
import { SearchResultFrames } from "@/components/sections/search/search-result-frames";
import { SearchResultPlate } from "@/components/sections/search/search-result-plate";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface SearchResultCardProps {
    listing: Listing;
    href: string;
    saved: boolean;
    onSaveChange: () => void;
    className?: string;
}

export function SearchResultCard({
    listing,
    href,
    saved,
    onSaveChange,
    className,
}: SearchResultCardProps) {
    const [activeFrame, setActiveFrame] = useState(0);

    return (
        <article
            onMouseLeave={() => setActiveFrame(0)}
            className={cn(
                "border-border-light hover:border-border bg-background-muted ease-smooth relative isolate flex flex-col overflow-hidden rounded-xl border pb-2.5 shadow-sm transition-colors duration-200",
                className,
            )}
        >
            <SearchResultFrames
                images={listing.images}
                title={listing.title}
                href={href}
                activeFrame={activeFrame}
                onFrameChange={setActiveFrame}
            />

            <SearchResultPlate
                listing={listing}
                href={href}
                saved={saved}
                onToggleSave={onSaveChange}
            />
        </article>
    );
}

SearchResultCard.displayName = "SearchResultCard";
