import { MetricCell } from "@/components/patterns/metric-cell";
import { StatusDot } from "@/components/patterns/status-dot";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ConfigActorMark } from "@/components/features/admin/config-actor-mark";
import { POLICY_COUNT } from "@/lib/data/admin-policies";
import { ENVIRONMENT_LABEL } from "@/lib/data/admin-settings";
import type { ConfigChange } from "@/lib/types";

const HERO_EYEBROW = "Live configuration";
const IN_SYNC_VALUE = "In sync";
const PENDING_SUFFIX = "pending";
const UNSAVED_LABEL = "Awaiting save";
const SAVED_LABEL = "Committed";
const PENDING_LEDE = "Unsaved edits apply once you save this revision";
const SYNCED_LEDE = "Running values match the last saved revision";
const POLICIES_LABEL = "Policies on";
const BLOCKING_LABEL = "Blocking rules";
const CHANGE_LABEL = "Last change";
const NO_CHANGE = "—";
const OF_LABEL = "of";

export interface AdminSettingsPostureHeroProps {
    pending: number;
    enabled: number;
    blocking: number;
    lastChange?: ConfigChange;
}

export function AdminSettingsPostureHero({
    pending,
    enabled,
    blocking,
    lastChange,
}: AdminSettingsPostureHeroProps) {
    const dirty = pending > 0;

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <p className="micro-label">
                {HERO_EYEBROW} · {ENVIRONMENT_LABEL}
            </p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <p className="text-h4 font-display text-text font-light tabular-nums">
                    {dirty ? `${pending} ${PENDING_SUFFIX}` : IN_SYNC_VALUE}
                </p>
                <span className="flex items-center gap-1.5">
                    <StatusDot tone={dirty ? "warning" : "success"} />
                    <span className="micro-label">
                        {dirty ? UNSAVED_LABEL : SAVED_LABEL}
                    </span>
                </span>
            </div>
            <p className="text-text-secondary mt-0.5 truncate text-xs">
                {dirty ? PENDING_LEDE : SYNCED_LEDE}
            </p>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                <MetricCell label={POLICIES_LABEL}>
                    <span className="tabular-nums">
                        {enabled} {OF_LABEL} {POLICY_COUNT}
                    </span>
                </MetricCell>
                <MetricCell label={BLOCKING_LABEL}>
                    <span className="tabular-nums">{blocking}</span>
                </MetricCell>
                <MetricCell label={CHANGE_LABEL}>
                    {lastChange ? (
                        <span className="flex min-w-0 items-baseline gap-1.5">
                            <AgeMark
                                minutes={lastChange.ageMinutes}
                                tone="neutral"
                            />
                            <ConfigActorMark change={lastChange} />
                        </span>
                    ) : (
                        <span>{NO_CHANGE}</span>
                    )}
                </MetricCell>
            </div>
        </section>
    );
}

AdminSettingsPostureHero.displayName = "AdminSettingsPostureHero";
