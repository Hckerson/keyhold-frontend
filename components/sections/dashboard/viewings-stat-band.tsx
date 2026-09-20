import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Viewing schedule at a glance";

export interface ViewingsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function ViewingsStatBand({ stats, pending }: ViewingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

ViewingsStatBand.displayName = "ViewingsStatBand";
