import { Button } from "@/components/ui/button";
import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { ListingExposureMeter } from "@/components/features/agent/listing-exposure-meter";
import { LISTING_STATUSES } from "@/lib/config/listing-tones";
import { exposureOf, pricePerSqft } from "@/lib/data/agent-listings";
import type { ManagedListing } from "@/lib/types";
import { formatCount, formatMillions, formatUsd } from "@/lib/utils";

const HERO_EYEBROW = "Top performer";
const PRICE_LABEL = "Asking";
const LAYOUT_LABEL = "Layout";
const RATE_LABEL = "Price / sq ft";
const EXPOSURE_LABEL = "Exposure";
const INTEREST_LABEL = "Interest";
const OFFERS_SUFFIX = "offers";
const DAYS_SUFFIX = "days on market";
const SAVES_SUFFIX = "saves";
const TOURS_SUFFIX = "tours";

export interface ListingsTopHeroProps {
    listing: ManagedListing;
    peak: number;
}

export function ListingsTopHero({ listing, peak }: ListingsTopHeroProps) {
    const status = LISTING_STATUSES[listing.status];

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
                        <p className="micro-label">
                            {HERO_EYEBROW} · {listing.offers} {OFFERS_SUFFIX} ·{" "}
                            {listing.listedDaysAgo} {DAYS_SUFFIX}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(listing.price, 2)}
                            </p>
                            <span className="micro-label">{PRICE_LABEL}</span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {listing.address}, {listing.locality}
                            </span>
                            <StatusDot tone={status.tone} />
                            <span className="text-text-secondary shrink-0 text-xs">
                                {status.label}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 gap-2">
                    <Button type="button" variant="secondary" size="sm">
                        Edit
                    </Button>
                    <Button type="button" variant="secondary" size="sm">
                        Promote
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                        Analytics
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
                <MetricCell label={RATE_LABEL}>
                    <span className="tabular-nums">
                        {formatUsd(pricePerSqft(listing))}
                    </span>
                </MetricCell>
                <MetricCell label={EXPOSURE_LABEL}>
                    <ListingExposureMeter percent={exposureOf(listing, peak)} />
                </MetricCell>
                <MetricCell label={INTEREST_LABEL}>
                    <span className="truncate tabular-nums">
                        {formatCount(listing.saves)} {SAVES_SUFFIX} ·{" "}
                        {listing.showings} {TOURS_SUFFIX}
                    </span>
                </MetricCell>
            </div>
        </section>
    );
}

ListingsTopHero.displayName = "ListingsTopHero";
