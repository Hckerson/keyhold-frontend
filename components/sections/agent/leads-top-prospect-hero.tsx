import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/patterns/status-dot";
import { MetricCell } from "@/components/patterns/metric-cell";
import { LEAD_STAGES } from "@/lib/config/lead-tones";
import type { Lead } from "@/lib/types/lead";
import { formatCompactUsd, initialsOf } from "@/lib/utils";

const HERO_EYEBROW = "Top enquiry";
const VALUE_LABEL = "Listing value";
const MESSAGES_LABEL = "Unread";
const VIEWINGS_LABEL = "Viewings";
const OFFERS_LABEL = "Offers";
const TOUCH_LABEL = "Last touch";
const CALL_ACTION = "Call";
const EMAIL_ACTION = "Email";
const ACCEPT_ACTION = "Accept";
const DECLINE_ACTION = "Decline";

export interface LeadsTopProspectHeroProps {
    lead: Lead;
    calling: boolean;
    onRespond: (id: string, accept: boolean) => void;
    onCall: () => void;
    onEmail: () => void;
}

export function LeadsTopProspectHero({
    lead,
    calling,
    onRespond,
    onCall,
    onEmail,
}: LeadsTopProspectHeroProps) {
    const stage = LEAD_STAGES[lead.stage];

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
                            {HERO_EYEBROW} · {stage.label}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatCompactUsd(lead.budget)}
                            </p>
                            <span className="micro-label">{VALUE_LABEL}</span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {lead.name}
                            </span>
                            <StatusDot tone={stage.tone} />
                            <span className="text-text-secondary truncate text-xs">
                                {stage.nextAction}
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
                    {lead.phone && (
                        <Button
                            type="button"
                            size="sm"
                            isLoading={calling}
                            onClick={onCall}
                        >
                            {CALL_ACTION}
                        </Button>
                    )}
                    <Button type="button" size="sm" onClick={onEmail}>
                        {EMAIL_ACTION}
                    </Button>
                    {lead.stage === "pending" && (
                        <>
                            <Button
                                type="button"
                                onClick={() => onRespond(lead.id, false)}
                            >
                                {DECLINE_ACTION}
                            </Button>
                            <Button
                                type="button"
                                emphasis="solid"
                                tone="accent"
                                onClick={() => onRespond(lead.id, true)}
                            >
                                {ACCEPT_ACTION}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                <MetricCell label={MESSAGES_LABEL}>
                    <span className="tabular-nums">{lead.unread}</span>
                </MetricCell>
                <MetricCell label={VIEWINGS_LABEL}>
                    <span className="tabular-nums">{lead.viewings}</span>
                </MetricCell>
                <MetricCell label={OFFERS_LABEL}>
                    <span className="tabular-nums">{lead.offers}</span>
                </MetricCell>
                <MetricCell label={TOUCH_LABEL}>
                    <span className="truncate tabular-nums">
                        {lead.lastContact}
                    </span>
                </MetricCell>
            </div>
        </section>
    );
}

LeadsTopProspectHero.displayName = "LeadsTopProspectHero";
