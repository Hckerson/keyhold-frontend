import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Search profile and alert delivery at a glance";

export interface DashboardSettingsStatBandProps {
    stats: StatDatum[];
}

export function DashboardSettingsStatBand({
    stats,
}: DashboardSettingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

DashboardSettingsStatBand.displayName = "DashboardSettingsStatBand";
