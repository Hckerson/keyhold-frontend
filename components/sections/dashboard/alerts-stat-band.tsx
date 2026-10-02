import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Alert activity at a glance";

export interface AlertsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AlertsStatBand({ stats, pending }: AlertsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AlertsStatBand.displayName = "AlertsStatBand";
