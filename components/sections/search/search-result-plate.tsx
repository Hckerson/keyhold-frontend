"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { SearchResultLedger } from "@/components/sections/search/search-result-ledger";
import { formatPrice } from "@/lib/data/listings";
import { PROPERTY_TYPE_LABELS } from "@/lib/enums/enums";
import { PROPERTY_STATUS_LABELS } from "@/lib/enums/enums";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/utils";

const FRESH_DAYS = 7;
const STALE_DAYS = 45;

function describeMarketAge(days: number) {
    if (days <= FRESH_DAYS) {
        return {
            label: days <= 1 ? "Listed today" : `${days} days new`,
            tone: "text-highlight-dark",
        };
    }

    if (days >= STALE_DAYS) {
        return { label: `${days} days listed`, tone: "text-text-muted" };
    }

    return { label: `${days} days listed`, tone: "text-text-secondary" };
}

export interface SearchResultPlateProps {
    listing: Listing;
    href: string;
    saved: boolean;
    onToggleSave: () => void;
}

export function SearchResultPlate({
    listing,
    href,
    saved,
    onToggleSave,
}: SearchResultPlateProps) {
    const market = describeMarketAge(listing.listedDaysAgo);

    return (
        <div className="border-border-light bg-background relative z-10 mx-2.5 -mt-7 flex flex-col gap-2 rounded-lg border p-3 shadow-sm">
            <div className="flex items-center justify-between gap-2">
                <span className="micro-label truncate">
                    {PROPERTY_TYPE_LABELS[listing.type]} ·{" "}
                    {PROPERTY_STATUS_LABELS[listing.status]}
                </span>
                <span
                    className={cn(
                        "shrink-0 font-mono text-[10px] tracking-wide uppercase",
                        market.tone,
                    )}
                >
                    {market.label}
                </span>
            </div>

            <div className="min-w-0">
                <Link
                    href={href}
                    className="text-text hover:text-accent focus-visible:ring-accent ease-smooth line-clamp-2 rounded-xs text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    {listing.address}
                </Link>
                <p className="text-text-muted mt-0.5 truncate text-xs">
                    {listing.locality}
                </p>
            </div>

            <div className="flex items-baseline justify-between gap-2">
                <p className="text-h5 font-display text-text leading-none font-light tabular-nums">
                    {formatPrice(listing.price)}
                </p>
                <p className="text-text-muted shrink-0 font-mono text-[10px] tabular-nums">
                    ${listing.pricePerSqft.toLocaleString()}/sq ft
                </p>
            </div>

            <SearchResultLedger
                beds={listing.beds}
                baths={listing.baths}
                sqft={listing.sqft}
                yearBuilt={listing.yearBuilt}
            />

            <div className="border-border flex items-center justify-between gap-2 border-t pt-2">
                <span className="text-text-secondary truncate text-xs">
                    {listing.agent.name}
                </span>

                <button
                    type="button"
                    onClick={onToggleSave}
                    aria-pressed={saved}
                    aria-label={
                        saved
                            ? `Remove ${listing.title} from saved`
                            : `Save ${listing.title}`
                    }
                    className="text-text-secondary hover:text-highlight-dark focus-visible:ring-accent ease-smooth inline-flex shrink-0 items-center gap-1 rounded-xs font-mono text-[10px] tabular-nums transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <Heart
                        size={12}
                        strokeWidth={1.5}
                        className={cn(
                            saved && "fill-highlight text-highlight-dark",
                        )}
                    />
                    {(listing.saves + (saved ? 1 : 0)).toLocaleString()}
                </button>
            </div>
        </div>
    );
}

SearchResultPlate.displayName = "SearchResultPlate";
