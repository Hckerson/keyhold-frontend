"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { ViewingAgentMark } from "@/components/features/dashboard/viewing-agent-mark";
import { ViewingCountdown } from "@/components/features/dashboard/viewing-countdown";
import { ViewingModeMark } from "@/components/features/dashboard/viewing-mode-mark";
import { VIEWING_MODES, VIEWING_STATUSES } from "@/lib/config/viewing-tones";
import { daysUntil, formatViewingDate } from "@/lib/data/viewings";
import type { Viewing } from "@/lib/types";
import { formatMillions } from "@/lib/utils";
import { PUBLIC_ROUTES } from "@/lib/constants";

const HERO_EYEBROW = "Next viewing";
const ASKING_LABEL = "Asking";
const SLOT_LABEL = "Slot";
const FORMAT_LABEL = "Format";
const AGENT_LABEL = "Agent";
const COUNTDOWN_LABEL = "Starts in";
const MINUTES_SUFFIX = "min";
const VIEW_ACTION = "View Listing";
const CALL_ACTION = "Call Agent";
const RESCHEDULE_ACTION = "Reschedule";
const CANCEL_ACTION = "Cancel";

export interface ViewingsNextHeroProps {
    viewing: Viewing;
    onReschedule: (id: string) => void;
    onCancel: (id: string) => void;
}

export function ViewingsNextHero({
    viewing,
    onReschedule,
    onCancel,
}: ViewingsNextHeroProps) {
    const status = VIEWING_STATUSES[viewing.status];

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <ListingThumb
                        src={viewing.photo}
                        alt={viewing.address}
                        className="h-20 w-28 rounded-lg"
                    />
                    <div className="min-w-0">
                        <p className="micro-label">
                            {HERO_EYEBROW} · {status.label} ·{" "}
                            {VIEWING_MODES[viewing.mode].label}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(viewing.price, 2)}
                            </p>
                            <span className="micro-label">{ASKING_LABEL}</span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {viewing.address}, {viewing.locality}
                            </span>
                            <StatusDot tone={status.tone} />
                            <span className="text-text-secondary shrink-0 text-xs">
                                {status.label}
                            </span>
                        </p>
                        <a
                            href={`tel:${viewing.agentPhone}`}
                            className="text-text-secondary hover:text-accent ease-smooth mt-1.5 inline-block text-xs tabular-nums transition-colors"
                        >
                            {CALL_ACTION} · {viewing.agentPhone}
                        </a>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <Link
                        href={PUBLIC_ROUTES.listing(viewing.listingId)}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {VIEW_ACTION}
                    </Link>
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => onReschedule(viewing.id)}
                    >
                        {RESCHEDULE_ACTION}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onCancel(viewing.id)}
                    >
                        {CANCEL_ACTION}
                    </Button>
                </div>
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                <MetricCell label={SLOT_LABEL}>
                    <span className="truncate tabular-nums">
                        {formatViewingDate(viewing.date)} · {viewing.time} ·{" "}
                        {viewing.durationMinutes}
                        {MINUTES_SUFFIX}
                    </span>
                </MetricCell>
                <MetricCell label={FORMAT_LABEL}>
                    <ViewingModeMark mode={viewing.mode} />
                </MetricCell>
                <MetricCell label={AGENT_LABEL}>
                    <ViewingAgentMark agent={viewing.agent} />
                </MetricCell>
                <MetricCell label={COUNTDOWN_LABEL}>
                    <ViewingCountdown days={daysUntil(viewing)} />
                </MetricCell>
            </div>
        </section>
    );
}

ViewingsNextHero.displayName = "ViewingsNextHero";
