import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Performance summary";

export interface AnalyticsStatBandProps {
    stats: StatDatum[];
}

export function AnalyticsStatBand({ stats }: AnalyticsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AnalyticsStatBand.displayName = "AnalyticsStatBand";
