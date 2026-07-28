import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { StatCard } from "@/components/ui/stat-card";
import { BarChart } from "@/components/ui/charts/bar-chart";
import {
    DonutChart,
    type DonutSegment,
} from "@/components/ui/charts/donut-chart";

interface RegionMetric {
    region: string;
    listings: number;
    volume: number;
    avgPrice: number;
}

const regionData: RegionMetric[] = [
    { region: "Beverly Hills", listings: 87, volume: 285, avgPrice: 3.2 },
    { region: "Bel Air", listings: 56, volume: 198, avgPrice: 3.5 },
    { region: "West Hollywood", listings: 72, volume: 156, avgPrice: 2.1 },
    { region: "Malibu", listings: 45, volume: 142, avgPrice: 3.1 },
    { region: "Santa Monica", listings: 82, volume: 166, avgPrice: 2.0 },
];

const userBreakdown: DonutSegment[] = [
    { name: "Buyers", value: 722, tone: "accent" },
    { name: "Agents", value: 435, tone: "info" },
    { name: "Admins", value: 90, tone: "neutral" },
];

const tierDistribution: DonutSegment[] = [
    { name: "Standard", value: 845, tone: "neutral" },
    { name: "Premium", value: 315, tone: "info" },
    { name: "Platinum", value: 87, tone: "highlight" },
];

const TOTAL_USERS = "1,247";

export default function AdminReportsPage() {
    const regionBars = [...regionData]
        .sort((a, b) => b.volume - a.volume)
        .map((r) => ({ label: r.region, value: r.volume }));

    return (
        <div className="space-y-6">
            <PageHeader
                title="Analytics & Reports"
                description="Platform performance and market insights"
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                            Download
                        </Button>
                        <Button variant="primary" size="sm">
                            Generate Custom
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="GMV (YTD)"
                    value="$847M"
                    change="+22%"
                    trend="up"
                    caption="vs 2023"
                    featured
                />
                <StatCard
                    label="Active Listings"
                    value={342}
                    change="+18%"
                    trend="up"
                    caption="month over month"
                />
                <StatCard
                    label="User Growth"
                    value="+14%"
                    caption="1,247 active users"
                />
                <StatCard
                    label="Avg Transaction"
                    value="$2.47M"
                    change="+8%"
                    trend="up"
                    caption="vs market"
                />
            </div>

            <Panel
                title="Market by Region"
                description="Ranked by transaction volume"
            >
                <BarChart
                    data={regionBars}
                    tone="accent"
                    highlightFirstTone="highlight"
                    labelWidth={132}
                    valuePrefix="$"
                    valueSuffix="M"
                />
            </Panel>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Panel title="User Breakdown">
                    <DonutChart
                        data={userBreakdown}
                        total={TOTAL_USERS}
                        unit="users"
                    />
                </Panel>
                <Panel title="Tier Distribution">
                    <DonutChart
                        data={tierDistribution}
                        total={TOTAL_USERS}
                        unit="users"
                    />
                </Panel>
            </div>
        </div>
    );
}
