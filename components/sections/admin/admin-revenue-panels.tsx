import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { PayoutPipeline } from "@/components/features/admin/payout-pipeline";
import { RevenueStreamSplit } from "@/components/features/admin/revenue-stream-split";
import {
    OUTSTANDING_PAYOUT,
    PAYOUT_STAGES,
    PENDING_PAYOUT_COUNT,
    PROCESSING_METRICS,
    REVENUE_MONTHS,
    REVENUE_PERIOD_LABEL,
    REVENUE_SERIES,
    REVENUE_SPLIT,
    REVENUE_SPLIT_METRICS,
    REVENUE_STREAMS,
    REVENUE_TOTAL_LABEL,
} from "@/lib/data/admin-payments";

export function AdminRevenuePanels() {
    return (
        <>
            <Panel
                title="Monthly Revenue"
                description="Commission vs platform fees"
            >
                <ColumnChart
                    data={REVENUE_MONTHS}
                    xKey="month"
                    series={REVENUE_SERIES}
                    divideBy={1_000}
                    valuePrefix="$"
                    valueSuffix="K"
                />
            </Panel>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <Panel
                    title="Revenue Breakdown"
                    description="Share of year to date · month-over-month change"
                    bodyClassName="pt-3"
                >
                    <RevenueStreamSplit
                        streams={REVENUE_STREAMS}
                        segments={REVENUE_SPLIT}
                        total={REVENUE_TOTAL_LABEL}
                        caption={REVENUE_PERIOD_LABEL}
                        metrics={REVENUE_SPLIT_METRICS}
                    />
                </Panel>

                <Panel
                    title="Payment Processing"
                    description="Agent commission payout queue"
                    bodyClassName="pt-3"
                    action={
                        <Button variant="secondary" size="sm">
                            Process
                        </Button>
                    }
                >
                    <PayoutPipeline
                        stages={PAYOUT_STAGES}
                        outstanding={OUTSTANDING_PAYOUT}
                        pendingCount={PENDING_PAYOUT_COUNT}
                        metrics={PROCESSING_METRICS}
                    />
                </Panel>
            </div>
        </>
    );
}

AdminRevenuePanels.displayName = "AdminRevenuePanels";
