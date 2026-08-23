import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "VIP book at a glance";

export interface ConciergeStatBandProps {
    stats: StatDatum[];
}

export function ConciergeStatBand({ stats }: ConciergeStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

ConciergeStatBand.displayName = "ConciergeStatBand";
