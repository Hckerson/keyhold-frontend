import { ProgressBar } from "@/components/ui/progress-bar";
import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { AgeMark } from "@/components/features/shared/age-mark";
import { strengthTone } from "@/lib/config/account-tones";
import { ALERT_TYPE_COUNT } from "@/lib/data/alerts";
import {
    PRIVACY_CONTROL_COUNT,
    SEARCH_PROFILE_STRENGTH,
} from "@/lib/data/buyer-account";
import { PROFILE_UPDATED } from "@/lib/data/dashboard-settings";

const HERO_EYEBROW = "Buyer profile";
const TUNED_SUFFIX = "tuned";
const PENDING_SUFFIX = "pending";
const UNSAVED_LABEL = "Awaiting save";
const SYNCED_LABEL = "Synced";
const PENDING_LEDE = "Unsaved edits reach your matches once you save";
const SYNCED_LEDE = "Live values match what your search and alerts run on";
const BUDGET_LABEL = "Budget range";
const ALERTS_LABEL = "Signals on";
const SHARING_LABEL = "Sharing";
const UPDATED_LABEL = "Last updated";
const OF_LABEL = "of";
const STRENGTH_METER_LABEL = "Search profile strength";

export interface DashboardSettingsProfileHeroProps {
    pending: number;
    preferredLocation: string;
    budget: string;
    enabledAlerts: number;
    sharedAudiences: number;
}

export function DashboardSettingsProfileHero({
    pending,
    preferredLocation,
    budget,
    enabledAlerts,
    sharedAudiences,
}: DashboardSettingsProfileHeroProps) {
    const dirty = pending > 0;

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <p className="micro-label">
                {HERO_EYEBROW} · {preferredLocation}
            </p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <p className="text-h4 font-display text-text font-light tabular-nums">
                    {dirty
                        ? `${pending} ${PENDING_SUFFIX}`
                        : `${SEARCH_PROFILE_STRENGTH}% ${TUNED_SUFFIX}`}
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

            <span
                className="mt-3 block"
                aria-label={`${STRENGTH_METER_LABEL} ${SEARCH_PROFILE_STRENGTH}%`}
            >
                <ProgressBar
                    value={SEARCH_PROFILE_STRENGTH}
                    tone={strengthTone(SEARCH_PROFILE_STRENGTH)}
                />
            </span>

            <div className="bg-background-muted border-border-light mt-3 grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-4">
                <MetricCell label={BUDGET_LABEL}>
                    <span className="truncate tabular-nums">{budget}</span>
                </MetricCell>
                <MetricCell label={ALERTS_LABEL}>
                    <span className="tabular-nums">
                        {enabledAlerts} {OF_LABEL} {ALERT_TYPE_COUNT}
                    </span>
                </MetricCell>
                <MetricCell label={SHARING_LABEL}>
                    <span className="tabular-nums">
                        {sharedAudiences} {OF_LABEL} {PRIVACY_CONTROL_COUNT}
                    </span>
                </MetricCell>
                <MetricCell label={UPDATED_LABEL}>
                    <span className="flex min-w-0 items-baseline gap-1.5">
                        <AgeMark
                            minutes={PROFILE_UPDATED.ageMinutes}
                            tone="neutral"
                        />
                        <span className="text-text-secondary min-w-0 truncate text-xs">
                            {PROFILE_UPDATED.actor}
                        </span>
                    </span>
                </MetricCell>
            </div>
        </section>
    );
}

DashboardSettingsProfileHero.displayName = "DashboardSettingsProfileHero";
