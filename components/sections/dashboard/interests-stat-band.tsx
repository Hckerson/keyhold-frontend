import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Interest book at a glance";

export interface InterestsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function InterestsStatBand({ stats, pending }: InterestsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

InterestsStatBand.displayName = "InterestsStatBand";
