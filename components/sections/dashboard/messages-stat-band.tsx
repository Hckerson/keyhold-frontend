import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Message activity at a glance";

export interface MessagesStatBandProps {
    stats: StatDatum[];
}

export function MessagesStatBand({ stats }: MessagesStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

MessagesStatBand.displayName = "MessagesStatBand";
