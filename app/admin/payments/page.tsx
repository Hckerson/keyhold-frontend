import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { StatCard } from "@/components/ui/stat-card";
import {
    ColumnChart,
    type ColumnSeries,
} from "@/components/ui/charts/column-chart";
import {
    DonutChart,
    type DonutSegment,
} from "@/components/ui/charts/donut-chart";
import { SummaryRow } from "@/components/ui/summary-row";
import { Callout } from "@/components/ui/callout";

const monthlyData: Record<string, string | number>[] = [
    { month: "Jan", commission: 145000, fees: 28000 },
    { month: "Feb", commission: 152000, fees: 31000 },
    { month: "Mar", commission: 138000, fees: 26000 },
    { month: "Apr", commission: 168000, fees: 35000 },
    { month: "May", commission: 175000, fees: 38000 },
    { month: "Jun", commission: 192000, fees: 42000 },
    { month: "Jul", commission: 180000, fees: 39000 },
];

const revenueSeries: ColumnSeries[] = [
    { key: "commission", name: "Commission", tone: "accent" },
    { key: "fees", name: "Platform Fees", tone: "info" },
];

const revenueSplit: DonutSegment[] = [
    { name: "Commission (2.5%)", value: 950, tone: "accent" },
    { name: "Platform Fees", value: 290, tone: "info" },
];

export default function AdminPaymentsPage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="Payment & Revenue"
                description="Commissions, platform fees, and payouts"
                action={
                    <Button variant="secondary" size="sm">
                        Export
                    </Button>
                }
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Revenue YTD"
                    value="$1.24M"
                    change="+18%"
                    trend="up"
                    caption="vs last year"
                    featured
                />
                <StatCard
                    label="Monthly Avg"
                    value="$176K"
                    change="+5%"
                    trend="up"
                    caption="6-month trend"
                />
                <StatCard
                    label="Commission"
                    value="$950K"
                    caption="77% of total"
                />
                <StatCard
                    label="Outstanding"
                    value="$42K"
                    caption="3 pending transactions"
                />
            </div>

            <Panel
                title="Monthly Revenue"
                description="Commission vs platform fees"
            >
                <ColumnChart
                    data={monthlyData}
                    xKey="month"
                    series={revenueSeries}
                    divideBy={1000}
                    valuePrefix="$"
                    valueSuffix="K"
                />
            </Panel>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <Panel title="Revenue Breakdown">
                    <DonutChart
                        data={revenueSplit}
                        total="$1.24M"
                        unit="YTD"
                        valuePrefix="$"
                        valueSuffix="K"
                    />
                </Panel>

                <Panel
                    title="Payment Processing"
                    action={
                        <Button variant="secondary" size="sm">
                            Process
                        </Button>
                    }
                >
                    <div className="space-y-3">
                        <Callout
                            variant="warning"
                            title="Pending payouts"
                            description="$42K in agent commission payments awaiting release"
                        />
                        <SummaryRow
                            label="Avg. processing time"
                            value="3–5 days"
                        />
                    </div>
                </Panel>
            </div>
        </div>
    );
}
