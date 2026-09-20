import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Marketplace volume at a glance";

export interface AdminOverviewStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AdminOverviewStatBand({
    stats,
    pending,
}: AdminOverviewStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AdminOverviewStatBand.displayName = "AdminOverviewStatBand";
