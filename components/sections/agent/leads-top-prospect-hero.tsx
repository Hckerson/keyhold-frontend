import { Avatar } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { StatusDot } from "@/components/patterns/status-dot";
import { LeadFitMeter } from "@/components/features/agent/lead-fit-meter";
import { MetricCell } from "@/components/patterns/metric-cell";
import {
    LEAD_SCORES,
    LEAD_SOURCES,
    LEAD_STAGES,
} from "@/lib/config/lead-tones";
import { mailHref, telHref, type Lead } from "@/lib/data/agent-leads";
import { formatCompactUsd, initialsOf } from "@/lib/utils";

const HERO_EYEBROW = "Top prospect";
const SOURCE_PREFIX = "via";
const BUDGET_LABEL = "Budget";
const FIT_LABEL = "Fit";
const TOUCHES_LABEL = "Touches";
const TOUCH_LABEL = "Last touch";
const NEXT_LABEL = "Next";
const CALL_ACTION = "Call";
const EMAIL_ACTION = "Email";

export interface LeadsTopProspectHeroProps {
    lead: Lead;
    onAdvance: (id: string) => void;
}

export function LeadsTopProspectHero({
    lead,
    onAdvance,
}: LeadsTopProspectHeroProps) {
    const stage = LEAD_STAGES[lead.stage];
    const score = LEAD_SCORES[lead.score];
    const source = LEAD_SOURCES[lead.source];

    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <Avatar
                        size="md"
                        src={lead.portrait}
                        alt={lead.name}
                        initials={initialsOf(lead.name)}
                    />
                    <div className="min-w-0">
                        <p className="micro-label">
                            {HERO_EYEBROW} · {score.label} · {SOURCE_PREFIX}{" "}
                            {source.label}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatCompactUsd(lead.budget)}
                            </p>
                            <span className="micro-label">{BUDGET_LABEL}</span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {lead.name}
                            </span>
                            <StatusDot tone={stage.tone} />
                            <span className="text-text-secondary truncate text-xs">
                                {stage.label}
                            </span>
                        </p>
                        <ul className="mt-1.5 flex flex-wrap gap-1">
                            {lead.interests.map((interest) => (
                                <li
                                    key={interest}
                                    className="micro-label bg-background-alt rounded px-1.5 py-0.5"
                                >
                                    {interest}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex shrink-0 gap-2">
                    <a
                        href={telHref(lead.phone)}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {CALL_ACTION}
                    </a>
                    <a
                        href={mailHref(lead.email)}
                        className={buttonVariants({
                            variant: "secondary",
                            size: "sm",
                        })}
                    >
                        {EMAIL_ACTION}
                    </a>
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => onAdvance(lead.id)}
                    >
                        {stage.next.label}
                    </Button>
                </div>
            </div>

            <div className="bg-background-muted border-border-light mt-3 grid grid-cols-2 gap-3 rounded-md border p-3 sm:grid-cols-4">
                <MetricCell label={FIT_LABEL}>
                    <LeadFitMeter percent={lead.fit} />
                </MetricCell>
                <MetricCell label={TOUCHES_LABEL}>
                    <span className="tabular-nums">{lead.touches}</span>
                </MetricCell>
                <MetricCell label={TOUCH_LABEL}>
                    <span className="truncate">{lead.lastContact}</span>
                </MetricCell>
                <MetricCell label={NEXT_LABEL}>
                    <span className="truncate">{lead.nextAction}</span>
                </MetricCell>
            </div>
        </section>
    );
}

LeadsTopProspectHero.displayName = "LeadsTopProspectHero";
