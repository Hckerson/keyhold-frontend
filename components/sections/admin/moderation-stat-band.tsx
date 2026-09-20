import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Moderation queue at a glance";

export interface ModerationStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function ModerationStatBand({
    stats,
    pending,
}: ModerationStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

ModerationStatBand.displayName = "ModerationStatBand";
