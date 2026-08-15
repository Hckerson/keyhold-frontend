import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Viewing schedule at a glance";

export interface ViewingsStatBandProps {
    stats: StatDatum[];
}

export function ViewingsStatBand({ stats }: ViewingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

ViewingsStatBand.displayName = "ViewingsStatBand";
