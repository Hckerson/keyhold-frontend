import { ConciergeStatCell } from "@/components/features/agent/concierge-stat-cell";
import { conciergeStats } from "@/lib/data/agent-concierge";

const BAND_LABEL = "VIP book at a glance";

export function ConciergeStatBand() {
    return (
        <section
            aria-label={BAND_LABEL}
            className="border-border-light bg-background-muted divide-border grid grid-cols-2 divide-x divide-y overflow-hidden rounded-lg border shadow-sm sm:flex sm:h-14 sm:divide-y-0"
        >
            {conciergeStats.map((stat) => (
                <ConciergeStatCell key={stat.id} stat={stat} />
            ))}
        </section>
    );
}

ConciergeStatBand.displayName = "ConciergeStatBand";
