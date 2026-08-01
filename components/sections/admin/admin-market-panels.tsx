import { MapPin } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { EmptyState } from "@/components/ui/empty-state";
import { BarChart } from "@/components/ui/charts/bar-chart";
import { DonutChart } from "@/components/ui/charts/donut-chart";
import {
    REGION_BARS,
    TOTAL_USERS_LABEL,
    USER_ROLE_SEGMENTS,
    USER_TIER_SEGMENTS,
} from "@/lib/data/admin-reports";

const REGION_LABEL_WIDTH = 132;

export function AdminMarketPanels() {
    return (
        <>
            <Panel
                title="Market by Region"
                description="Ranked by transaction volume"
            >
                {REGION_BARS.length > 0 ? (
                    <BarChart
                        data={REGION_BARS}
                        tone="accent"
                        highlightFirstTone="highlight"
                        labelWidth={REGION_LABEL_WIDTH}
                        valuePrefix="$"
                        valueSuffix="M"
                    />
                ) : (
                    <EmptyState
                        icon={MapPin}
                        title="No regional data"
                        description="Transaction volume has not been recorded for any region yet."
                    />
                )}
            </Panel>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <Panel title="User Breakdown">
                    <DonutChart
                        data={USER_ROLE_SEGMENTS}
                        total={TOTAL_USERS_LABEL}
                        unit="users"
                    />
                </Panel>
                <Panel title="Tier Distribution">
                    <DonutChart
                        data={USER_TIER_SEGMENTS}
                        total={TOTAL_USERS_LABEL}
                        unit="users"
                    />
                </Panel>
            </div>
        </>
    );
}

AdminMarketPanels.displayName = "AdminMarketPanels";
