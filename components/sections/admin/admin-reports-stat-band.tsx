import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Reporting period at a glance";

export interface AdminReportsStatBandProps {
    stats: StatDatum[];
}

export function AdminReportsStatBand({ stats }: AdminReportsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AdminReportsStatBand.displayName = "AdminReportsStatBand";
