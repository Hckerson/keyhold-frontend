import { Check } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

type Metric = {
    label: string;
    value: string | number;
    change?: string;
    trend?: "up" | "down";
    caption?: string;
};

const metrics: Metric[] = [
    {
        label: "Total Sales This Year",
        value: "$42.3M",
        change: "+12%",
        trend: "up",
        caption: "vs 2023",
    },
    {
        label: "Average Sale Price",
        value: "$2.85M",
        change: "+5%",
        trend: "up",
        caption: "vs market avg",
    },
    {
        label: "Days to Close",
        value: 48,
        caption: "8 days faster than market",
    },
    {
        label: "Client Satisfaction",
        value: "4.8/5",
        caption: "18% above average",
    },
];

const monthlyData = [
    { month: "Jan", sales: 3, volume: 8.5 },
    { month: "Feb", sales: 4, volume: 11.2 },
    { month: "Mar", sales: 3, volume: 8.1 },
    { month: "Apr", sales: 5, volume: 14.3 },
    { month: "May", sales: 4, volume: 11.8 },
    { month: "Jun", sales: 6, volume: 17.4 },
    { month: "Jul", sales: 2, volume: 5.9 },
];

const maxVolume = Math.max(...monthlyData.map((d) => d.volume));

const comparison = [
    { label: "You", value: "$2.85M", pct: 85, accent: true },
    { label: "Market", value: "$2.15M", pct: 65, accent: false },
];

const advantages = [
    "Higher average transaction value",
    "Faster closing times",
    "Higher client satisfaction",
];

const quarters = [
    { label: "Q1 2024", sales: "10", volume: "$27.8M" },
    { label: "Q2 2024", sales: "15", volume: "$42.1M" },
    { label: "Q3 2024 (YTD)", sales: "2", volume: "$5.9M" },
];

export default function AgentAnalyticsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Performance Analytics"
                description="Track your sales performance and market insights"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <StatCard key={metric.label} {...metric} />
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Panel
                    title="Sales by Month"
                    description="2024 performance overview"
                >
                    <div className="space-y-4">
                        {monthlyData.map((data) => (
                            <div key={data.month}>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <span className="text-text text-sm font-medium">
                                        {data.month}
                                    </span>
                                    <span className="text-text-secondary text-xs tabular-nums">
                                        {data.sales} sales · ${data.volume}M
                                    </span>
                                </div>
                                <ProgressBar
                                    value={(data.volume / maxVolume) * 100}
                                />
                            </div>
                        ))}
                    </div>
                </Panel>

                <Panel
                    title="Market Comparison"
                    description="Your performance vs market average"
                >
                    <div className="space-y-6">
                        <div>
                            <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                                Average Sale Price
                            </p>
                            <div className="mt-3 flex items-end gap-4">
                                {comparison.map((bar) => (
                                    <div key={bar.label} className="flex-1">
                                        <div className="bg-background-alt flex h-24 items-end justify-center overflow-hidden rounded-t-md">
                                            <div
                                                className={cn(
                                                    "w-12 rounded-t-md",
                                                    bar.accent
                                                        ? "bg-accent"
                                                        : "bg-border",
                                                )}
                                                style={{
                                                    height: `${bar.pct}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-text mt-2 text-center text-xs font-medium tabular-nums">
                                            {bar.value}
                                        </p>
                                        <p className="text-text-muted text-center text-[10px] tracking-wide uppercase">
                                            {bar.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-border-light border-t pt-4">
                            <p className="text-text-muted text-caption mb-2 font-medium tracking-wide uppercase">
                                Key Advantages
                            </p>
                            <div className="space-y-2">
                                {advantages.map((advantage) => (
                                    <div
                                        key={advantage}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <Check
                                            size={14}
                                            strokeWidth={1.5}
                                            className="text-success shrink-0"
                                        />
                                        <span className="text-text-secondary">
                                            {advantage}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>

            <Panel
                title="Quarterly Breakdown"
                description="Sales volume and transaction count"
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {quarters.map((quarter) => (
                        <div
                            key={quarter.label}
                            className="bg-background-alt rounded-lg p-4"
                        >
                            <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                                {quarter.label}
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-text-muted text-caption tracking-wide uppercase">
                                        Sales
                                    </p>
                                    <p className="text-h5 font-display text-text mt-0.5 font-light tabular-nums">
                                        {quarter.sales}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-text-muted text-caption tracking-wide uppercase">
                                        Volume
                                    </p>
                                    <p className="text-h5 font-display text-accent mt-0.5 font-light tabular-nums">
                                        {quarter.volume}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
}
