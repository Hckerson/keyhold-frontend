import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Saved book at a glance";

export interface SavedStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function SavedStatBand({ stats, pending }: SavedStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

SavedStatBand.displayName = "SavedStatBand";
