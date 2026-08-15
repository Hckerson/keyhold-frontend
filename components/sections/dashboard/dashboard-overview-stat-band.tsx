import { StatBand } from "@/components/patterns/stat-band";
import { stats } from "@/lib/data/dashboard-overview";

const BAND_LABEL = "Your property journey";

export function DashboardOverviewStatBand() {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

DashboardOverviewStatBand.displayName = "DashboardOverviewStatBand";
