import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Search profile and alert delivery at a glance";

export interface DashboardSettingsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function DashboardSettingsStatBand({
    stats,
    pending,
}: DashboardSettingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

DashboardSettingsStatBand.displayName = "DashboardSettingsStatBand";
