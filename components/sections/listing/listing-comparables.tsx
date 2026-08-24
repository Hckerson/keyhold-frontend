import Link from "next/link";
import { Bath, BedDouble, ImageOff, Scale } from "lucide-react";
import { DeltaChip } from "@/components/sections/listing/delta-chip";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import type { Listing } from "@/lib/types";
interface ListingComparablesProps {
    listing: Listing;
    comparables: Listing[];
}

const EMPTY_TITLE = "No comparables in this locality yet";
const EMPTY_LEDE =
    "Nothing else is on the market nearby right now. Your agent can pull recent private sales on request.";
const EMPTY_ACTION = "Browse the wider market";
const THUMBNAIL_CLASS =
    "ring-border h-11 w-14 shrink-0 rounded-lg object-cover ring-1 sm:h-12 sm:w-16";

function timingLabel(comparable: Listing): string {
    if (comparable.soldMonthsAgo) {
        return `Sold ${comparable.soldMonthsAgo} month${comparable.soldMonthsAgo > 1 ? "s" : ""} ago`;
    }
    return `Listed ${comparable.listedDaysAgo} days ago`;
}

export function ListingComparables({
    listing,
    comparables,
}: ListingComparablesProps) {
    if (comparables.length === 0) {
        return (
            <EmptyState
                icon={Scale}
                title={EMPTY_TITLE}
                description={EMPTY_LEDE}
                action={
                    <Link
                        href={`/search?q=${encodeURIComponent(listing.locality)}`}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {EMPTY_ACTION}
                    </Link>
                }
            />
        );
    }

    return (
        <div className="border-border bg-background-muted/40 flex flex-col rounded-xl border">
            {comparables.map((comparable) => {
                const delta = Math.round(
                    ((comparable.price - listing.price) / listing.price) * 100,
                );
                return (
                    <Link
                        key={comparable.id}
                        href={`/listing/${comparable.id}`}
                        className="group border-border hover:bg-background/70 focus-visible:ring-accent ease-smooth flex items-center gap-2.5 border-b px-2.5 py-2 transition-colors duration-200 last:border-b-0 focus-visible:ring-2 focus-visible:outline-none sm:gap-3 sm:px-3 sm:py-2.5"
                    >
                        {comparable.images[0] ? (
                            <img
                                src={comparable.images[0]}
                                alt=""
                                aria-hidden="true"
                                className={THUMBNAIL_CLASS}
                            />
                        ) : (
                            <span
                                aria-hidden="true"
                                className={cn(
                                    THUMBNAIL_CLASS,
                                    "bg-background-muted text-text-muted grid place-items-center",
                                )}
                            >
                                <ImageOff
                                    className="size-3"
                                    strokeWidth={1.5}
                                />
                            </span>
                        )}

                        <div className="min-w-0 flex-1">
                            <p className="text-text group-hover:text-accent ease-smooth truncate text-xs font-medium transition-colors">
                                {comparable.address}
                            </p>
                            <p className="text-text-muted text-xs leading-snug">
                                {comparable.locality} ·{" "}
                                {timingLabel(comparable)}
                            </p>
                            <div className="text-text-secondary mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                                <span className="inline-flex items-center gap-1 text-xs tabular-nums">
                                    <BedDouble
                                        size={12}
                                        strokeWidth={1.5}
                                        className="text-text-muted"
                                    />
                                    {comparable.beds}
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs tabular-nums">
                                    <Bath
                                        size={12}
                                        strokeWidth={1.5}
                                        className="text-text-muted"
                                    />
                                    {comparable.baths}
                                </span>
                                <span className="text-text-muted text-xs whitespace-nowrap tabular-nums">
                                    {comparable.sqft.toLocaleString()} sq ft
                                </span>
                            </div>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-1">
                            <p className="text-text text-xs font-semibold tabular-nums">
                                ${comparable.price.toLocaleString()}
                            </p>
                            {delta !== 0 && <DeltaChip percent={delta} />}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

ListingComparables.displayName = "ListingComparables";
