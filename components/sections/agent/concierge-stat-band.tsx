import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/lib/types";

const BAND_LABEL = "VIP book at a glance";

export interface ConciergeStatBandProps {
    stats: StatDatum[];
    pending?: boolean;
}

export function ConciergeStatBand({ stats, pending }: ConciergeStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} pending={pending} />;
}

ConciergeStatBand.displayName = "ConciergeStatBand";
