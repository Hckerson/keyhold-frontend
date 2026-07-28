import Link from "next/link";
import { Bath, BedDouble } from "lucide-react";
import type { Listing } from "@/app/(public)/_data/listings";
import { DeltaChip } from "@/components/sections/listing/delta-chip";

interface ListingComparablesProps {
    listing: Listing;
    comparables: Listing[];
}

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
                        className="group border-border hover:bg-background/70 focus-visible:ring-accent ease-smooth flex items-center gap-3 border-b px-3 py-2.5 transition-colors duration-200 last:border-b-0 focus-visible:ring-2 focus-visible:outline-none"
                    >
                        <img
                            src={comparable.images[0]}
                            alt=""
                            aria-hidden="true"
                            className="ring-border h-12 w-16 shrink-0 rounded-lg object-cover ring-1"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="text-text group-hover:text-accent ease-smooth truncate text-xs font-medium transition-colors">
                                {comparable.address}
                            </p>
                            <p className="text-text-muted truncate text-xs">
                                {comparable.locality} ·{" "}
                                {timingLabel(comparable)}
                            </p>
                            <div className="text-text-secondary mt-0.5 flex items-center gap-3">
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
                                <span className="text-text-muted text-xs tabular-nums">
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
