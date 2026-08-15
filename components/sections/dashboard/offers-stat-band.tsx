import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Offer book at a glance";

export interface OffersStatBandProps {
    stats: StatDatum[];
}

export function OffersStatBand({ stats }: OffersStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

OffersStatBand.displayName = "OffersStatBand";
