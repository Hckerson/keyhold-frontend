"use client";

import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { PanelLink } from "@/components/features/shared/panel-link";
import { InterestTractionChip } from "@/components/features/dashboard/interest-traction-chip";
import { INTEREST_STATUSES, TRACTIONS } from "@/lib/config/interest-tones";
import { tractionOf } from "@/lib/data/interests";
import { BUYER_ROUTES } from "@/lib/constants";
import type { Interest } from "@/lib/types";
import { formatAge, formatMillions } from "@/lib/utils";

const HERO_EYEBROW = "Furthest along";
const ASK_LABEL = "Asking";
const OFFICE_LABEL = "Listing office";
const AGENCY_LABEL = "Agency";
const MESSAGES_LABEL = "Messages";
const VIEWINGS_LABEL = "Viewings";
const NO_AGENCY = "Independent";
const OPEN_ACTION = "Open Thread";

export interface InterestsTopHeroProps {
    interest: Interest;
}

export function InterestsTopHero({ interest }: InterestsTopHeroProps) {
    const status = INTEREST_STATUSES[interest.status];
    const traction = tractionOf(interest);

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <ListingThumb
                        src={interest.photo}
                        alt={interest.address}
                        className="h-20 w-28 rounded-lg"
                    />
                    <div className="min-w-0">
                        <p className="micro-label">
                            {HERO_EYEBROW} · {status.label} ·{" "}
                            {formatAge(interest.minutesAgo)}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(interest.listPrice, 2)}
                            </p>
                            <span className="micro-label">{ASK_LABEL}</span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {interest.address}, {interest.locality}
                            </span>
                            <StatusDot tone={status.tone} />
                            <span className="text-text-secondary shrink-0 text-xs">
                                {TRACTIONS[traction].label}
                            </span>
                        </p>
                        <div className="mt-1.5">
                            <InterestTractionChip traction={traction} />
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <PanelLink
                        href={BUYER_ROUTES.messages}
                        label={OPEN_ACTION}
                    />
                </div>
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                <MetricCell label={OFFICE_LABEL}>
                    <span className="min-w-0 truncate">{interest.agent}</span>
                </MetricCell>
                <MetricCell label={AGENCY_LABEL}>
                    <span className="min-w-0 truncate">
                        {interest.agency ?? NO_AGENCY}
                    </span>
                </MetricCell>
                <MetricCell label={MESSAGES_LABEL}>
                    <span className="tabular-nums">{interest.messages}</span>
                </MetricCell>
                <MetricCell label={VIEWINGS_LABEL}>
                    <span className="tabular-nums">{interest.viewings}</span>
                </MetricCell>
            </div>
        </section>
    );
}

InterestsTopHero.displayName = "InterestsTopHero";
