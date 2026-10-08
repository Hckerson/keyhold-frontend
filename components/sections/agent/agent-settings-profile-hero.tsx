import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { AgeMark } from "@/components/features/shared/age-mark";
import { strengthTone } from "@/lib/config/account-tones";
import { chartToneText } from "@/lib/config/chart-tones";
import { NOTIFICATION_RULE_COUNT } from "@/lib/data/agent-account";
import { cn } from "@/lib/utils";
import { minutesSince } from "@/lib/utils/elapsed";

const HERO_EYEBROW = "Public profile";
const NEVER_SAVED = "Not saved yet";
const COMPLETE_SUFFIX = "complete";
const PENDING_SUFFIX = "pending";
const UNSAVED_LABEL = "Awaiting save";
const PUBLISHED_LABEL = "Published";
const PENDING_LEDE = "Unsaved edits reach buyers once you save this profile";
const PUBLISHED_LEDE = "Live values match what buyers see on your listings";
const ALERTS_LABEL = "Alerts on";
const CREDENTIALS_LABEL = "Credentials";
const PUBLISHED_METRIC_LABEL = "Last published";
const OF_LABEL = "of";
const STRENGTH_LABEL = "Strength";

export interface AgentSettingsProfileHeroProps {
    pending: number;
    strength: number;
    verified: number;
    credentials: number;
    brokerage: string;
    updatedAt?: string;
    enabledAlerts: number;
}

export function AgentSettingsProfileHero({
    pending,
    strength,
    verified,
    credentials,
    brokerage,
    updatedAt,
    enabledAlerts,
}: AgentSettingsProfileHeroProps) {
    const dirty = pending > 0;

    return (
        <section className="border-accent/25 bg-background rounded-xl border p-4 shadow-md">
            <p className="micro-label">
                {HERO_EYEBROW} · {brokerage}
            </p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <p className="text-h4 font-display text-text font-light tabular-nums">
                    {dirty
                        ? `${pending} ${PENDING_SUFFIX}`
                        : `${strength}% ${COMPLETE_SUFFIX}`}
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

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                <MetricCell label={STRENGTH_LABEL}>
                    <span
                        className={cn(
                            "tabular-nums",
                            chartToneText[strengthTone(strength)],
                        )}
                    >
                        {strength}%
                    </span>
                </MetricCell>
                <MetricCell label={ALERTS_LABEL}>
                    <span className="tabular-nums">
                        {enabledAlerts} {OF_LABEL} {NOTIFICATION_RULE_COUNT}
                    </span>
                </MetricCell>
                <MetricCell label={CREDENTIALS_LABEL}>
                    <span className="tabular-nums">
                        {verified} {OF_LABEL} {credentials}
                    </span>
                </MetricCell>
                <MetricCell label={PUBLISHED_METRIC_LABEL}>
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

AgentSettingsProfileHero.displayName = "AgentSettingsProfileHero";
