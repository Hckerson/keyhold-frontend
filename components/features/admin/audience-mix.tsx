import { ShareBar } from "@/components/patterns/share-bar";
import type { DonutSegment } from "@/lib/types";

const ROLE_LABEL = "By role";

export interface AudienceMixProps {
    roles: DonutSegment[];
    tiers: DonutSegment[];
    tierLabel: string;
}

export function AudienceMix({ roles, tiers, tierLabel }: AudienceMixProps) {
    return (
        <div className="flex flex-col gap-4">
            <ShareBar label={ROLE_LABEL} segments={roles} />
            <ShareBar label={tierLabel} segments={tiers} />
        </div>
    );
}

AudienceMix.displayName = "AudienceMix";
