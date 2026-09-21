import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Money earned and money owed at a glance";

export interface AdminPaymentsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function AdminPaymentsStatBand({
    stats,
    pending,
}: AdminPaymentsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

AdminPaymentsStatBand.displayName = "AdminPaymentsStatBand";
