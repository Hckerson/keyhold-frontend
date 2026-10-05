import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Offer book at a glance";

export interface OffersStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function OffersStatBand({ stats, pending }: OffersStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

OffersStatBand.displayName = "OffersStatBand";
