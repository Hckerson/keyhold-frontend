import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "Viewing schedule at a glance";

export interface ViewingsStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function ViewingsStatBand({ stats, pending }: ViewingsStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

ViewingsStatBand.displayName = "ViewingsStatBand";
