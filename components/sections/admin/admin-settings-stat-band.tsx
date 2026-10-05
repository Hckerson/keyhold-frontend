import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Platform configuration at a glance";

export interface AdminSettingsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AdminSettingsStatBand({
    stats,
    pending,
}: AdminSettingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AdminSettingsStatBand.displayName = "AdminSettingsStatBand";
