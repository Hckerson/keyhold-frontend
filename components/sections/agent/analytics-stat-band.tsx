import { AnalyticsStatCell } from "@/components/features/agent/analytics-stat-cell";
import { analyticsStats } from "@/lib/data/agent-analytics";

const BAND_LABEL = "Performance summary";

export function AnalyticsStatBand() {
    return (
        <section
            aria-label={BAND_LABEL}
            className="border-border-light bg-background-muted divide-border grid grid-cols-2 divide-x divide-y overflow-hidden rounded-lg border shadow-sm sm:flex sm:h-14 sm:divide-y-0"
        >
            {analyticsStats.map((stat) => (
                <AnalyticsStatCell key={stat.id} stat={stat} />
            ))}
        </section>
    );
}

AnalyticsStatBand.displayName = "AnalyticsStatBand";
