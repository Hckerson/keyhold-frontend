import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Alert activity at a glance";

export interface AlertsStatBandProps {
    stats: StatDatum[];
}

export function AlertsStatBand({ stats }: AlertsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AlertsStatBand.displayName = "AlertsStatBand";
