"use client";

import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { OfferGapChip } from "@/components/features/dashboard/offer-gap-chip";
import { GAP_BANDS, OFFER_STATUSES, gapBandOf } from "@/lib/config/offer-tones";
import { activePrice, discountPercent, gapPercent } from "@/lib/data/offers";
import type { Offer } from "@/lib/types";
import { cn, formatAge, formatMillions } from "@/lib/utils";

const HERO_EYEBROW = "Most at stake";
const ON_TABLE_LABEL = "On the table";
const YOUR_OFFER_LABEL = "Your offer";
const ASK_LABEL = "Asking";
const COUNTER_LABEL = "Counter";
const GAP_LABEL = "Gap to ask";
const AGENT_LABEL = "Represented by";
const NO_COUNTER = "—";
const VIEW_ACTION = "View Details";

export interface OffersTopHeroProps {
    offer: Offer;
}

export function OffersTopHero({ offer }: OffersTopHeroProps) {
    const status = OFFER_STATUSES[offer.status];
    const band = GAP_BANDS[gapBandOf(discountPercent(offer))];

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <ListingThumb
                        src={offer.photo}
                        alt={offer.address}
                        className="h-20 w-28 rounded-lg"
                    />
                    <div className="min-w-0">
                        <p className="micro-label">
                            {HERO_EYEBROW} · {status.label} ·{" "}
                            {formatAge(offer.minutesAgo)}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(activePrice(offer), 2)}
                            </p>
                            <span className="micro-label">
                                {offer.counterPrice === undefined
                                    ? YOUR_OFFER_LABEL
                                    : ON_TABLE_LABEL}
                            </span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {offer.address}, {offer.locality}
                            </span>
                            <StatusDot tone={status.tone} />
                            <span className="text-text-secondary shrink-0 text-xs">
                                {band.label}
                            </span>
                        </p>
                        <p className="text-text-secondary mt-1.5 line-clamp-2 max-w-[54ch] text-xs">
                            {offer.note}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <PanelLink
                        href={`/dashboard/offers/${offer.id}`}
                        label={VIEW_ACTION}
                    />
                </div>
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                <MetricCell label={ASK_LABEL}>
                    <span className="tabular-nums">
                        {formatMillions(offer.listPrice, 2)}
                    </span>
                </MetricCell>
                <MetricCell label={COUNTER_LABEL}>
                    <span
                        className={cn(
                            "tabular-nums",
                            offer.counterPrice !== undefined && "text-info",
                        )}
                    >
                        {offer.counterPrice === undefined
                            ? NO_COUNTER
                            : formatMillions(offer.counterPrice, 2)}
                    </span>
                </MetricCell>
                <MetricCell label={GAP_LABEL}>
                    <OfferGapChip percent={gapPercent(offer)} />
                </MetricCell>
                <MetricCell label={AGENT_LABEL}>
                    <span className="min-w-0 truncate">{offer.agent}</span>
                </MetricCell>
            </div>
        </section>
    );
}

OffersTopHero.displayName = "OffersTopHero";
