import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Escrow position at a glance";

export interface TransactionsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function TransactionsStatBand({
    stats,
    pending,
}: TransactionsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

TransactionsStatBand.displayName = "TransactionsStatBand";
