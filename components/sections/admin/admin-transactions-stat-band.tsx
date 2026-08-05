import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Deal flow at a glance";

export interface AdminTransactionsStatBandProps {
    stats: StatDatum[];
}

export function AdminTransactionsStatBand({
    stats,
}: AdminTransactionsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AdminTransactionsStatBand.displayName = "AdminTransactionsStatBand";
