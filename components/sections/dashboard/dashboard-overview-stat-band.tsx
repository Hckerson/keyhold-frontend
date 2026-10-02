import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Your property journey";

export interface DashboardOverviewStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function DashboardOverviewStatBand({
    stats,
    pending,
}: DashboardOverviewStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

DashboardOverviewStatBand.displayName = "DashboardOverviewStatBand";
