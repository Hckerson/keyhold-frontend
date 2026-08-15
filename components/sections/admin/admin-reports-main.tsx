import { MapPin } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { PanelLink } from "@/components/features/shared/panel-link";
import { RegionLeaderTile } from "@/components/features/admin/region-leader-tile";
import { RegionPerformanceTable } from "@/components/features/admin/region-performance-table";
import { AdminReportsChart } from "@/components/sections/admin/admin-reports-chart";
import {
    REGION_LEADER,
    REGION_PEERS,
    REGION_PERFORMANCE,
} from "@/lib/data/admin-reports";

const REGION_TITLE = "Regional Performance";
const REGION_LEDE = "Ranked by transaction volume, leader pulled to the front";
const REGION_ACTION = "Listings";
const EMPTY_TITLE = "No regional data";
const EMPTY_LEDE =
    "Transaction volume has not been recorded for any region yet.";

export function AdminReportsMain() {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            <AdminReportsChart />

            <Panel
                title={REGION_TITLE}
                description={REGION_LEDE}
                count={REGION_PERFORMANCE.length}
                action={
                    <PanelLink href="/admin/listings" label={REGION_ACTION} />
                }
                bodyClassName="pt-3"
            >
                {REGION_PERFORMANCE.length > 0 ? (
                    <>
                        <RegionLeaderTile region={REGION_LEADER} />
                        <PanelInset scroll>
                            <RegionPerformanceTable regions={REGION_PEERS} />
                        </PanelInset>
                    </>
                ) : (
                    <EmptyState
                        icon={MapPin}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

AdminReportsMain.displayName = "AdminReportsMain";
