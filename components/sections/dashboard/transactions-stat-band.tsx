import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Escrow position at a glance";

export interface TransactionsStatBandProps {
    stats: StatDatum[];
}

export function TransactionsStatBand({ stats }: TransactionsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

TransactionsStatBand.displayName = "TransactionsStatBand";
