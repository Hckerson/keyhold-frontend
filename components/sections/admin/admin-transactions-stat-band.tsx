import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Deal flow at a glance";

export interface AdminTransactionsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AdminTransactionsStatBand({
    stats,
    pending,
}: AdminTransactionsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AdminTransactionsStatBand.displayName = "AdminTransactionsStatBand";
