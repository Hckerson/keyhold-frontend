import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Marketplace volume at a glance";

export interface AdminOverviewStatBandProps {
    stats: StatDatum[];
}

export function AdminOverviewStatBand({ stats }: AdminOverviewStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AdminOverviewStatBand.displayName = "AdminOverviewStatBand";
