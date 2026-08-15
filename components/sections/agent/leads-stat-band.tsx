import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Pipeline at a glance";

export interface LeadsStatBandProps {
    stats: StatDatum[];
}

export function LeadsStatBand({ stats }: LeadsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

LeadsStatBand.displayName = "LeadsStatBand";
