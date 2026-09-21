import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Reporting period at a glance";

export interface AdminReportsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AdminReportsStatBand({
    stats,
    pending,
}: AdminReportsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AdminReportsStatBand.displayName = "AdminReportsStatBand";
