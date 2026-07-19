import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { StatCard } from "@/components/ui/stat-card";
import {
    ProgressBar,
    type ProgressBarProps,
} from "@/components/ui/progress-bar";
import { SummaryRow } from "@/components/ui/summary-row";

type Tone = NonNullable<ProgressBarProps["tone"]>;

interface RegionMetric {
    region: string;
    listings: number;
    volume: number;
    avgPrice: number;
}

interface Distribution {
    label: string;
    count: number;
    pct: number;
    tone: Tone;
}

const regionData: RegionMetric[] = [
    { region: "Beverly Hills", listings: 87, volume: 285, avgPrice: 3.2 },
    { region: "Bel Air", listings: 56, volume: 198, avgPrice: 3.5 },
    { region: "West Hollywood", listings: 72, volume: 156, avgPrice: 2.1 },
    { region: "Malibu", listings: 45, volume: 142, avgPrice: 3.1 },
    { region: "Santa Monica", listings: 82, volume: 166, avgPrice: 2.0 },
];

const userBreakdown: Distribution[] = [
    { label: "Buyers", count: 722, pct: 58, tone: "info" },
    { label: "Agents", count: 435, pct: 35, tone: "accent" },
    { label: "Admins", count: 90, pct: 7, tone: "neutral" },
];

const tierDistribution: Distribution[] = [
    { label: "Standard", count: 845, pct: 68, tone: "neutral" },
    { label: "Premium", count: 315, pct: 25, tone: "info" },
    { label: "Platinum", count: 87, pct: 7, tone: "highlight" },
];

export default function AdminReportsPage() {
    const ranked = [...regionData].sort((a, b) => b.volume - a.volume);
    const maxVolume = Math.max(...regionData.map((r) => r.volume));

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

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Panel
                    title="Market by Region"
                    description="Ranked by transaction volume"
                    className="lg:col-span-2"
                >
                    <ul className="space-y-4">
                        {ranked.map((region, i) => (
                            <li key={region.region}>
                                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <span className="text-text-muted font-mono text-[10px] tabular-nums">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-text truncate text-sm font-medium">
                                            {region.region}
                                        </span>
                                    </div>
                                    <span className="text-text shrink-0 text-sm font-medium tabular-nums">
                                        ${region.volume}M
                                    </span>
                                </div>
                                <ProgressBar
                                    value={(region.volume / maxVolume) * 100}
                                    tone={i === 0 ? "highlight" : "accent"}
                                />
                                <div className="text-text-muted mt-1 flex justify-between text-xs tabular-nums">
                                    <span>{region.listings} listings</span>
                                    <span>
                                        Avg ${region.avgPrice.toFixed(1)}M
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Panel>

                <div className="space-y-4">
                    <Panel title="User Breakdown">
                        <div className="space-y-4">
                            {userBreakdown.map((d) => (
                                <div key={d.label}>
                                    <SummaryRow
                                        label={`${d.label} (${d.pct}%)`}
                                        value={d.count.toLocaleString()}
                                        className="mb-1.5"
                                    />
                                    <ProgressBar value={d.pct} tone={d.tone} />
                                </div>
                            ))}
                        </div>
                    </Panel>

                    <Panel title="Tier Distribution">
                        <div className="space-y-4">
                            {tierDistribution.map((d) => (
                                <div key={d.label}>
                                    <SummaryRow
                                        label={`${d.label} (${d.pct}%)`}
                                        value={d.count.toLocaleString()}
                                        className="mb-1.5"
                                    />
                                    <ProgressBar value={d.pct} tone={d.tone} />
                                </div>
                            ))}
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    );
}
