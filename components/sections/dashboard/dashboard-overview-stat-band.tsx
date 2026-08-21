import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Your property journey";

export interface DashboardOverviewStatBandProps {
    stats: StatDatum[];
}

export function DashboardOverviewStatBand({
    stats,
}: DashboardOverviewStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

DashboardOverviewStatBand.displayName = "DashboardOverviewStatBand";
