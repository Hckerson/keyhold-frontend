import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Performance summary";

export interface AnalyticsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AnalyticsStatBand({ stats, pending }: AnalyticsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AnalyticsStatBand.displayName = "AnalyticsStatBand";
