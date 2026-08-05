import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Platform configuration at a glance";

export interface AdminSettingsStatBandProps {
    stats: StatDatum[];
}

export function AdminSettingsStatBand({ stats }: AdminSettingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AdminSettingsStatBand.displayName = "AdminSettingsStatBand";
