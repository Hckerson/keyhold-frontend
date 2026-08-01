"use client";

import { useState } from "react";
import { SearchResultFrames } from "@/components/sections/search/search-result-frames";
import { SearchResultPlate } from "@/components/sections/search/search-result-plate";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface SearchResultCardProps {
    listing: Listing;
    href: string;
    saved?: boolean;
    onSaveChange?: (saved: boolean) => void;
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
    const [internalSaved, setInternalSaved] = useState(false);
    const isSaved = saved ?? internalSaved;

    const toggleSave = () => {
        const next = !isSaved;
        onSaveChange?.(next);
        if (saved === undefined) setInternalSaved(next);
    };

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
                saved={isSaved}
                onToggleSave={toggleSave}
            />
        </article>
    );
}

SearchResultCard.displayName = "SearchResultCard";
