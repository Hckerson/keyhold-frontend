"use client";

import { Button } from "@/components/ui/button";
import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { AgeMark } from "@/components/features/admin/age-mark";
import { ComplianceMeter } from "@/components/features/admin/compliance-meter";
import { ModerationAgentMark } from "@/components/features/admin/moderation-agent-mark";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { MODERATION_STATUSES } from "@/lib/config/moderation-tones";
import { complianceScore, openChecks } from "@/lib/data/admin-listings";
import { formatMillions } from "@/lib/utils";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const HERO_EYEBROW = "Next decision";
const ASKING_LABEL = "Asking";
const COMPLIANCE_LABEL = "Compliance";
const REPORTS_LABEL = "Reports";
const QUEUE_LABEL = "In queue";
const AGENT_LABEL = "Agent";
const OPEN_CHECKS_SUFFIX = "checks open";
const REVIEW_ACTION = "Review";
const APPROVE_ACTION = "Approve";
const CHANGES_ACTION = "Request Changes";
const REJECT_ACTION = "Reject";

export interface ModerationFocusHeroProps {
    listing: ModerationListing;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationFocusHero({
    listing,
    onOpen,
    onApprove,
    onDecide,
}: ModerationFocusHeroProps) {
    const status = MODERATION_STATUSES[listing.status];
    const [cover] = listing.photos;
    const open = openChecks(listing);

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <ListingThumb
                        src={cover}
                        alt={listing.address}
                        className="h-16 w-20 rounded-lg sm:h-20 sm:w-28"
                    />
                    <div className="min-w-0">
                        <p className="micro-label">
                            {HERO_EYEBROW} · {status.label} · {open}{" "}
                            {OPEN_CHECKS_SUFFIX}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(listing.price, 2)}
                            </p>
                            <span className="micro-label">{ASKING_LABEL}</span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-1.5">
                            <span className="text-text min-w-0 text-xs font-semibold sm:truncate">
                                {listing.address}, {listing.locality}
                            </span>
                            <StatusDot tone={status.tone} />
                            <span className="text-text-secondary shrink-0 text-xs">
                                {status.label}
                            </span>
                        </p>
                        {listing.note && (
                            <p className="text-text-secondary mt-1.5 line-clamp-2 text-xs">
                                {listing.note}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:shrink-0 sm:items-center">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => onOpen(listing.id)}
                    >
                        {REVIEW_ACTION}
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => onApprove(listing.id)}
                    >
                        {APPROVE_ACTION}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onDecide("changes", listing.id)}
                    >
                        {CHANGES_ACTION}
                    </Button>
                    <Button
                        type="button"
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDecide("reject", listing.id)}
                    >
                        {REJECT_ACTION}
                    </Button>
                </div>
            </div>

            <div className="bg-background-muted border-border-light mt-3 grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-4">
                <MetricCell label={COMPLIANCE_LABEL}>
                    <ComplianceMeter
                        score={complianceScore(listing)}
                        label={listing.address}
                        className="justify-start"
                    />
                </MetricCell>
                <MetricCell label={REPORTS_LABEL}>
                    <ReportCountMark reports={listing.reports} />
                </MetricCell>
                <MetricCell label={QUEUE_LABEL}>
                    <AgeMark minutes={listing.queuedMinutes} />
                </MetricCell>
                <MetricCell label={AGENT_LABEL}>
                    <ModerationAgentMark agent={listing.agent} />
                </MetricCell>
            </div>
        </section>
    );
}

ModerationFocusHero.displayName = "ModerationFocusHero";
