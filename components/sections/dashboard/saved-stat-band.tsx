import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Saved book at a glance";

export interface SavedStatBandProps {
    stats: StatDatum[];
}

export function SavedStatBand({ stats }: SavedStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

SavedStatBand.displayName = "SavedStatBand";
