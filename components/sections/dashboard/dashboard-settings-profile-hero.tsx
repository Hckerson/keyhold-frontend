import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ALERT_TYPE_COUNT } from "@/lib/data/alerts-preferences";
import { minutesSince } from "@/lib/utils/elapsed";

const HERO_EYEBROW = "Buyer profile";
const NEVER_SAVED = "Not saved yet";
const TUNED_SUFFIX = "tuned";
const PENDING_SUFFIX = "pending";
const UNSAVED_LABEL = "Awaiting save";
const SYNCED_LABEL = "Synced";
const PENDING_LEDE = "Unsaved edits reach your matches once you save";
const SYNCED_LEDE = "Live values match what your search and alerts run on";
const VERIFIED_LABEL = "Verified";
const ALERTS_LABEL = "Signals on";
const UPDATED_LABEL = "Last updated";
const OF_LABEL = "of";

export interface DashboardSettingsProfileHeroProps {
    pending: number;
    strength: number;
    verified: number;
    documents: number;
    updatedAt?: string;
    enabledAlerts: number;
}

export function DashboardSettingsProfileHero({
    pending,
    strength,
    verified,
    documents,
    updatedAt,
    enabledAlerts,
}: DashboardSettingsProfileHeroProps) {
    const dirty = pending > 0;

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <p className="micro-label">{HERO_EYEBROW}</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <p className="text-h4 font-display text-text font-light tabular-nums">
                    {dirty
                        ? `${pending} ${PENDING_SUFFIX}`
                        : `${strength}% ${TUNED_SUFFIX}`}
                </p>
                <span className="flex items-center gap-1.5">
                    <StatusDot tone={dirty ? "warning" : "success"} />
                    <span className="micro-label">
                        {dirty ? UNSAVED_LABEL : SYNCED_LABEL}
                    </span>
                </span>
            </div>
            <p className="text-text-secondary mt-0.5 truncate text-xs">
                {dirty ? PENDING_LEDE : SYNCED_LEDE}
            </p>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                <MetricCell label={VERIFIED_LABEL}>
                    <span className="tabular-nums">
                        {verified} {OF_LABEL} {documents}
                    </span>
                </MetricCell>
                <MetricCell label={ALERTS_LABEL}>
                    <span className="tabular-nums">
                        {enabledAlerts} {OF_LABEL} {ALERT_TYPE_COUNT}
                    </span>
                </MetricCell>
                <MetricCell label={UPDATED_LABEL}>
                    {updatedAt ? (
                        <AgeMark
                            minutes={minutesSince(updatedAt)}
                            tone="neutral"
                        />
                    ) : (
                        <span className="micro-label">{NEVER_SAVED}</span>
                    )}
                </MetricCell>
            </div>
        </section>
    );
}

DashboardSettingsProfileHero.displayName = "DashboardSettingsProfileHero";
