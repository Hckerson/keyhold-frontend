import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/patterns/status-dot";
import { ConciergeAllocation } from "@/components/features/agent/concierge-allocation";
import { MetricCell } from "@/components/patterns/metric-cell";
import {
    CONCIERGE_STATUSES,
    CONCIERGE_TIERS,
} from "@/lib/config/concierge-tones";
import { allocationPct, type VIPClient } from "@/lib/data/agent-concierge";
import { formatMillions, initialsOf } from "@/lib/utils";

const HERO_EYEBROW = "Top relationship";
const MANDATE_LABEL = "Mandate";
const ALLOCATED_LABEL = "Allocated";
const REQUESTS_LABEL = "Open requests";
const TOUCH_LABEL = "Last touch";
const NEXT_LABEL = "Next";
const REQUESTS_SUFFIX = "open";

export interface ConciergeTopClientHeroProps {
    client: VIPClient;
}

export function ConciergeTopClientHero({
    client,
}: ConciergeTopClientHeroProps) {
    const tier = CONCIERGE_TIERS[client.tier];
    const status = CONCIERGE_STATUSES[client.status];

    return (
        <section className="border-accent/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                    <Avatar
                        size="md"
                        src={client.portrait ?? undefined}
                        alt={client.name}
                        initials={initialsOf(client.name)}
                    />
                    <div className="min-w-0">
                        <p className="micro-label">
                            {HERO_EYEBROW} · {tier.label} · Since{" "}
                            {client.clientSince}
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            <p className="text-h4 font-display text-text font-light tabular-nums">
                                {formatMillions(client.budget)}
                            </p>
                            <span className="micro-label">{MANDATE_LABEL}</span>
                        </div>
                        <p className="mt-0.5 flex min-w-0 items-center gap-1.5">
                            <span className="text-text truncate text-xs font-semibold">
                                {client.name}
                            </span>
                            <StatusDot tone={status.tone} />
                            <span className="text-text-secondary truncate text-xs">
                                {status.label}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="metric-strip bg-background-muted border-border-light mt-3 gap-3 rounded-md border p-3">
                <MetricCell label={ALLOCATED_LABEL}>
                    <ConciergeAllocation percent={allocationPct(client)} />
                </MetricCell>
                <MetricCell label={REQUESTS_LABEL}>
                    <span className="tabular-nums">
                        {client.openRequests} {REQUESTS_SUFFIX}
                    </span>
                </MetricCell>
                <MetricCell label={TOUCH_LABEL}>
                    <span className="truncate">{client.lastContact}</span>
                </MetricCell>
                <MetricCell label={NEXT_LABEL}>
                    <span className="truncate">{client.nextAction}</span>
                </MetricCell>
            </div>
        </section>
    );
}

ConciergeTopClientHero.displayName = "ConciergeTopClientHero";
