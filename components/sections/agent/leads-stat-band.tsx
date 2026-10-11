import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Pipeline at a glance";

export interface LeadsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function LeadsStatBand({ stats, pending }: LeadsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

LeadsStatBand.displayName = "LeadsStatBand";
