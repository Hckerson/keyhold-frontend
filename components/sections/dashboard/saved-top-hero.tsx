"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { MetricCell } from "@/components/patterns/metric-cell";
import { MoveChip } from "@/components/patterns/move-chip";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { SavedMatchMeter } from "@/components/features/dashboard/saved-match-meter";
import { SavedStatusMark } from "@/components/features/dashboard/saved-status-mark";
import { chartToneText } from "@/lib/config/chart-tones";
import { WATCH_BANDS, watchBandOf } from "@/lib/config/saved-tones";
import { movePercent, pricePerSqft } from "@/lib/data/saved-listings";
import type { SavedListing } from "@/lib/types";
import { cn, formatCount, formatMillions, formatUsd } from "@/lib/utils";

const HERO_EYEBROW = "Top of your book";
const SAVED_PREFIX = "saved";
const RATE_SUFFIX = "per sq ft";
const ASKING_LABEL = "Asking";
const LAYOUT_LABEL = "Layout";
const MOVE_LABEL = "Since you saved";
const MATCH_LABEL = "Search match";
const WATCH_LABEL = "Last seen";
const DAYS_SUFFIX = "d";
const VIEW_ACTION = "View Listing";
const OFFER_ACTION = "View Offer";
const REMOVE_ACTION = "Remove";

export interface SavedTopHeroProps {
    listing: SavedListing;
    onRemove: (id: string) => void;
}

export function SavedTopHero({ listing, onRemove }: SavedTopHeroProps) {
    const watch = WATCH_BANDS[watchBandOf(listing.viewedDaysAgo)];

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <ListingThumb
                        src={listing.photo}
                        alt={listing.address}
                        className="h-20 w-28 rounded-lg"
                    />
                    <div className="min-w-0">
                        <p className="micro-label truncate">
                            {HERO_EYEBROW} · {SAVED_PREFIX}{" "}
                            {listing.savedDaysAgo}
                            {DAYS_SUFFIX} · {formatUsd(pricePerSqft(listing))}{" "}
                            {RATE_SUFFIX}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(listing.price, 2)}
                            </p>
                            <span className="micro-label">{ASKING_LABEL}</span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {listing.address}, {listing.locality}
                            </span>
                            <SavedStatusMark
                                status={listing.status}
                                className="shrink-0"
                            />
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <Link
                        href={`/listing/${listing.id}`}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {VIEW_ACTION}
                    </Link>
                    {listing.offerId && (
                        <Link
                            href={`/dashboard/offers/${listing.offerId}`}
                            className={buttonVariants({
                                variant: "secondary",
                                size: "sm",
                            })}
                        >
                            {OFFER_ACTION}
                        </Link>
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(listing.id)}
                    >
                        {REMOVE_ACTION}
                    </Button>
                </div>
            </div>

            <div className="bg-background-muted border-border-light mt-3 grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-4">
                <MetricCell label={LAYOUT_LABEL}>
                    <span className="truncate tabular-nums">
                        {listing.beds} bd · {listing.baths} ba ·{" "}
                        {formatCount(listing.sqft)} sq ft
                    </span>
                </MetricCell>
                <MetricCell label={MOVE_LABEL}>
                    <MoveChip percent={movePercent(listing)} />
                </MetricCell>
                <MetricCell label={MATCH_LABEL}>
                    <SavedMatchMeter score={listing.matchScore} />
                </MetricCell>
                <MetricCell label={WATCH_LABEL}>
                    <span
                        className={cn(
                            "tabular-nums",
                            chartToneText[watch.tone],
                        )}
                    >
                        {listing.viewedDaysAgo}
                        {DAYS_SUFFIX}
                    </span>
                </MetricCell>
            </div>
        </section>
    );
}

SavedTopHero.displayName = "SavedTopHero";
