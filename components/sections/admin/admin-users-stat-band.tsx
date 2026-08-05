import { StatBand } from "@/components/patterns/stat-band";
import type { StatDatum } from "@/components/patterns/stat-cell";

const BAND_LABEL = "Account directory at a glance";

export interface AdminUsersStatBandProps {
    stats: StatDatum[];
}

export function AdminUsersStatBand({ stats }: AdminUsersStatBandProps) {
    return <StatBand label={BAND_LABEL} stats={stats} />;
}

AdminUsersStatBand.displayName = "AdminUsersStatBand";
