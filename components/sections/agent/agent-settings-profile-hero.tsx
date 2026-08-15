import { ProgressBar } from "@/components/ui/progress-bar";
import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { AgeMark } from "@/components/features/shared/age-mark";
import { strengthTone } from "@/lib/config/agent-settings-tones";
import {
    CREDENTIAL_COUNT,
    NOTIFICATION_RULE_COUNT,
    PROFILE_STRENGTH,
    verifiedCredentialCount,
} from "@/lib/data/agent-account";
import { PROFILE_PUBLISHED } from "@/lib/data/agent-settings";

const HERO_EYEBROW = "Public profile";
const COMPLETE_SUFFIX = "complete";
const PENDING_SUFFIX = "pending";
const UNSAVED_LABEL = "Awaiting save";
const PUBLISHED_LABEL = "Published";
const PENDING_LEDE = "Unsaved edits reach buyers once you save this profile";
const PUBLISHED_LEDE = "Live values match what buyers see on your listings";
const ALERTS_LABEL = "Alerts on";
const SENDS_LABEL = "Weekly sends";
const CREDENTIALS_LABEL = "Credentials";
const PUBLISHED_METRIC_LABEL = "Last published";
const OF_LABEL = "of";
const STRENGTH_METER_LABEL = "Profile strength";

export interface AgentSettingsProfileHeroProps {
    pending: number;
    serviceArea: string;
    brokerage: string;
    enabledAlerts: number;
    weeklySends: number;
}

export function AgentSettingsProfileHero({
    pending,
    serviceArea,
    brokerage,
    enabledAlerts,
    weeklySends,
}: AgentSettingsProfileHeroProps) {
    const dirty = pending > 0;

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <p className="micro-label">
                {HERO_EYEBROW} · {serviceArea} · {brokerage}
            </p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <p className="text-h4 font-display text-text font-light tabular-nums">
                    {dirty
                        ? `${pending} ${PENDING_SUFFIX}`
                        : `${PROFILE_STRENGTH}% ${COMPLETE_SUFFIX}`}
                </p>
                <span className="flex items-center gap-1.5">
                    <StatusDot tone={dirty ? "warning" : "success"} />
                    <span className="micro-label">
                        {dirty ? UNSAVED_LABEL : PUBLISHED_LABEL}
                    </span>
                </span>
            </div>
            <p className="text-text-secondary mt-0.5 truncate text-xs">
                {dirty ? PENDING_LEDE : PUBLISHED_LEDE}
            </p>

            <span
                className="mt-3 block"
                aria-label={`${STRENGTH_METER_LABEL} ${PROFILE_STRENGTH}%`}
            >
                <ProgressBar
                    value={PROFILE_STRENGTH}
                    tone={strengthTone(PROFILE_STRENGTH)}
                />
            </span>

            <div className="bg-background-muted border-border-light mt-3 grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-4">
                <MetricCell label={ALERTS_LABEL}>
                    <span className="tabular-nums">
                        {enabledAlerts} {OF_LABEL} {NOTIFICATION_RULE_COUNT}
                    </span>
                </MetricCell>
                <MetricCell label={SENDS_LABEL}>
                    <span className="tabular-nums">{weeklySends}</span>
                </MetricCell>
                <MetricCell label={CREDENTIALS_LABEL}>
                    <span className="tabular-nums">
                        {verifiedCredentialCount} {OF_LABEL} {CREDENTIAL_COUNT}
                    </span>
                </MetricCell>
                <MetricCell label={PUBLISHED_METRIC_LABEL}>
                    <span className="flex min-w-0 items-baseline gap-1.5">
                        <AgeMark
                            minutes={PROFILE_PUBLISHED.ageMinutes}
                            tone="neutral"
                        />
                        <span className="text-text-secondary min-w-0 truncate text-xs">
                            {PROFILE_PUBLISHED.actor}
                        </span>
                    </span>
                </MetricCell>
            </div>
        </section>
    );
}

AgentSettingsProfileHero.displayName = "AgentSettingsProfileHero";
