"use client";

import { Button } from "@/components/ui/button";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import { MetricCell } from "@/components/patterns/metric-cell";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ComplianceMeter } from "@/components/features/admin/compliance-meter";
import { ModerationAgentMark } from "@/components/features/admin/moderation-agent-mark";
import { ModerationStatusMark } from "@/components/features/admin/moderation-status-mark";
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
        <section className="border-highlight/25 bg-background overflow-hidden rounded-xl border shadow-md">
            <header className="border-border-light flex items-center justify-between gap-3 border-b px-4 py-2">
                <p className="micro-label shrink-0">{HERO_EYEBROW}</p>
                <div className="flex min-w-0 items-center gap-2">
                    <ModerationStatusMark status={listing.status} />
                    <span className="micro-label shrink-0">
                        {open} {OPEN_CHECKS_SUFFIX}
                    </span>
                </div>
            </header>

            <div className="flex flex-col gap-3 p-4">
                <div className="flex items-start gap-3">
                    <ListingThumb
                        src={cover}
                        alt={listing.address}
                        className="h-14 w-20 rounded-lg"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                        <p className="text-text min-w-0 truncate text-xs font-semibold">
                            {listing.address}, {listing.locality}
                        </p>
                        <p className="flex shrink-0 items-baseline gap-1.5">
                            <span className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(listing.price, 2)}
                            </span>
                            <span className="micro-label">{ASKING_LABEL}</span>
                        </p>
                    </div>
                </div>

                {listing.note && (
                    <LabelledBlock label={status.noteTitle}>
                        <p className="text-text-secondary line-clamp-2 text-xs">
                            {listing.note}
                        </p>
                    </LabelledBlock>
                )}
            </div>

            <div className="metric-strip border-border-light bg-background-muted gap-3 border-t px-4 py-3">
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

            <footer className="border-border-light flex flex-col gap-2 border-t p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid grid-cols-2 gap-2 sm:flex">
                    <Button
                        type="button"
                        variant="secondary"
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
                <div className="grid grid-cols-2 gap-2 sm:flex">
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
                </div>
            </footer>
        </section>
    );
}

ModerationFocusHero.displayName = "ModerationFocusHero";
