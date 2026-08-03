import { MapPin } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { EmptyState } from "@/components/ui/empty-state";
import { AudienceMix } from "@/components/features/admin/audience-mix";
import { RegionPerformanceTable } from "@/components/features/admin/region-performance-table";
import {
    REGION_PERFORMANCE,
    TOTAL_USERS_LABEL,
    USER_ROLE_SEGMENTS,
    USER_TIER_SEGMENTS,
} from "@/lib/data/admin-reports";

export function AdminReportMarket() {
    return (
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            <Panel
                title="Regional performance"
                description="Ranked by transaction volume"
                count={REGION_PERFORMANCE.length}
                bodyClassName="pt-1"
            >
                {REGION_PERFORMANCE.length > 0 ? (
                    <RegionPerformanceTable regions={REGION_PERFORMANCE} />
                ) : (
                    <EmptyState
                        icon={MapPin}
                        title="No regional data"
                        description="Transaction volume has not been recorded for any region yet."
                    />
                )}
            </Panel>

            <Panel
                title="Audience mix"
                description="Roles and subscription tiers"
                bodyClassName="pt-3"
            >
                <AudienceMix
                    roles={USER_ROLE_SEGMENTS}
                    tiers={USER_TIER_SEGMENTS}
                    total={TOTAL_USERS_LABEL}
                    tierLabel="Tier distribution"
                />
            </Panel>
        </div>
    );
}

AdminReportMarket.displayName = "AdminReportMarket";
