import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Interest book at a glance";

export interface InterestsStatBandProps {
    stats: StatDatum[];
}

export function InterestsStatBand({ stats }: InterestsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

InterestsStatBand.displayName = "InterestsStatBand";
