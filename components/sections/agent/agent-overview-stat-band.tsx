import { OverviewStatCell } from "@/components/features/agent/overview-stat-cell";
import { stats } from "@/lib/data/agent-overview";

const BAND_LABEL = "Book of business";

export function AgentOverviewStatBand() {
    return (
        <section
            aria-label={BAND_LABEL}
            className="border-border-light bg-background-muted divide-border grid grid-cols-2 divide-x divide-y overflow-hidden rounded-lg border shadow-sm sm:flex sm:h-14 sm:divide-y-0"
        >
            {stats.map((stat) => (
                <OverviewStatCell key={stat.id} stat={stat} />
            ))}
        </section>
    );
}

AgentOverviewStatBand.displayName = "AgentOverviewStatBand";
