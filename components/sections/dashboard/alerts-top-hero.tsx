"use client";

import { Button } from "@/components/ui/button";
import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { MoveChip } from "@/components/patterns/move-chip";
import { AlertChannelMark } from "@/components/features/dashboard/alert-channel-mark";
import { ALERT_TYPES, RECENCY_BANDS } from "@/lib/config/alert-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { movePercent, recencyBandOf } from "@/lib/data/alerts";
import type { Alert } from "@/lib/types";
import { cn, formatAge, formatMillions } from "@/lib/utils";

const HERO_EYEBROW = "Needs attention";
const NOW_LABEL = "Now";
const ASKING_LABEL = "Asking";
const MOVE_LABEL = "Movement";
const PREVIOUS_LABEL = "Previous ask";
const CHANNEL_LABEL = "Delivered by";
const AGE_LABEL = "Age";
const NO_PREVIOUS = "—";
const VIEW_ACTION = "View Listing";
const MARK_ACTION = "Mark Read";

export interface AlertsTopHeroProps {
    alert: Alert;
    onMarkRead: (id: string) => void;
}

export function AlertsTopHero({ alert, onMarkRead }: AlertsTopHeroProps) {
    const type = ALERT_TYPES[alert.type];
    const band = RECENCY_BANDS[recencyBandOf(alert)];
    const percent = movePercent(alert);

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <ListingThumb
                        src={alert.photo}
                        alt={alert.address}
                        className="h-20 w-28 rounded-lg"
                    />
                    <div className="min-w-0">
                        <p className="micro-label">
                            {HERO_EYEBROW} · {type.label} ·{" "}
                            {formatAge(alert.minutesAgo)}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(alert.price, 2)}
                            </p>
                            <span className="micro-label">
                                {alert.previousPrice === undefined
                                    ? ASKING_LABEL
                                    : NOW_LABEL}
                            </span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {alert.address}, {alert.locality}
                            </span>
                            <StatusDot tone={type.tone} />
                            <span className="text-text-secondary shrink-0 text-xs">
                                {band.label}
                            </span>
                        </p>
                        <p className="text-text-secondary mt-1.5 line-clamp-2 max-w-[54ch] text-xs">
                            {alert.description}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <PanelLink
                        href={`/listing/${alert.listingId}`}
                        label={VIEW_ACTION}
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        disabled={alert.read}
                        onClick={() => onMarkRead(alert.id)}
                    >
                        {MARK_ACTION}
                    </Button>
                </div>
            </div>

            <div className="bg-background-muted border-border-light mt-3 grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-4">
                <MetricCell label={MOVE_LABEL}>
                    <MoveChip percent={percent} />
                </MetricCell>
                <MetricCell label={PREVIOUS_LABEL}>
                    <span className="tabular-nums">
                        {alert.previousPrice === undefined
                            ? NO_PREVIOUS
                            : formatMillions(alert.previousPrice, 2)}
                    </span>
                </MetricCell>
                <MetricCell label={CHANNEL_LABEL}>
                    <AlertChannelMark channel={alert.channel} />
                </MetricCell>
                <MetricCell label={AGE_LABEL}>
                    <span
                        className={cn("tabular-nums", chartToneText[band.tone])}
                    >
                        {formatAge(alert.minutesAgo)}
                    </span>
                </MetricCell>
            </div>
        </section>
    );
}

AlertsTopHero.displayName = "AlertsTopHero";
