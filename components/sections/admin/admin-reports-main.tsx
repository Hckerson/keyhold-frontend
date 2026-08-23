import { MapPin } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { PanelLink } from "@/components/features/shared/panel-link";
import { RegionLeaderTile } from "@/components/features/admin/region-leader-tile";
import { RegionPerformanceTable } from "@/components/features/admin/region-performance-table";
import { AdminReportsChart } from "@/components/sections/admin/admin-reports-chart";
import type { RegionPerformance, ReportTrendMetric } from "@/lib/types";

const REGION_TITLE = "Regional Performance";
const REGION_LEDE = "Ranked by transaction volume, leader pulled to the front";
const REGION_ACTION = "Listings";
const EMPTY_TITLE = "No regional data";
const EMPTY_LEDE =
    "Transaction volume has not been recorded for any region yet.";

export interface AdminReportsMainProps {
    regions: RegionPerformance[];
    metrics: ReportTrendMetric[];
    months: Record<string, string | number>[];
    period: string;
}

export function AdminReportsMain({
    regions,
    metrics,
    months,
    period,
}: AdminReportsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            <AdminReportsChart
                metrics={metrics}
                months={months}
                period={period}
            />

            <Panel
                title={REGION_TITLE}
                description={REGION_LEDE}
                count={regions.length}
                action={
                    <PanelLink href="/admin/listings" label={REGION_ACTION} />
                }
                bodyClassName="pt-3"
            >
                {regions.length > 0 ? (
                    <>
                        <RegionLeaderTile region={regions[0]} />
                        <PanelInset scroll>
                            <RegionPerformanceTable
                                regions={regions.slice(1)}
                            />
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
