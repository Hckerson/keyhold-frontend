import { StatBand } from "@/components/patterns/stat-band";
import { analyticsStats } from "@/lib/data/agent-analytics";

const BAND_LABEL = "Performance summary";

export function AnalyticsStatBand() {
    return <StatBand label={BAND_LABEL} stats={analyticsStats} />;
}

AnalyticsStatBand.displayName = "AnalyticsStatBand";
