import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Portfolio at a glance";

export interface ListingsStatBandProps {
    stats: StatDatum[];
}

export function ListingsStatBand({ stats }: ListingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

ListingsStatBand.displayName = "ListingsStatBand";
