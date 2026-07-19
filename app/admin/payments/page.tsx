import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SummaryRow } from "@/components/ui/summary-row";
import { Callout } from "@/components/ui/callout";

interface MonthlyRevenue {
    month: string;
    commission: number;
    fees: number;
}

const monthlyData: MonthlyRevenue[] = [
    { month: "Jan", commission: 145000, fees: 28000 },
    { month: "Feb", commission: 152000, fees: 31000 },
    { month: "Mar", commission: 138000, fees: 26000 },
    { month: "Apr", commission: 168000, fees: 35000 },
    { month: "May", commission: 175000, fees: 38000 },
    { month: "Jun", commission: 192000, fees: 42000 },
    { month: "Jul", commission: 180000, fees: 39000 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.commission + d.fees));

const k = (n: number) => `$${Math.round(n / 1000)}K`;

export default function AdminPaymentsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Payment & Revenue"
                description="Commissions, platform fees, and payouts"
                action={
                    <Button variant="secondary" size="sm">
                        Export
                    </Button>
                }
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    caption="76% of total"
                />
                <StatCard
                    label="Outstanding"
                    value="$42K"
                    caption="3 pending transactions"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Panel
                    title="Monthly Revenue"
                    description="Commission vs platform fees"
                    className="lg:col-span-2"
                    action={
                        <div className="flex items-center gap-3 text-xs">
                            <span className="text-text-secondary flex items-center gap-1.5">
                                <span className="bg-accent size-2 rounded-full" />
                                Commission
                            </span>
                            <span className="text-text-secondary flex items-center gap-1.5">
                                <span className="bg-info size-2 rounded-full" />
                                Fees
                            </span>
                        </div>
                    }
                >
                    <ul className="space-y-3.5">
                        {monthlyData.map((data) => {
                            const total = data.commission + data.fees;
                            return (
                                <li key={data.month}>
                                    <div className="mb-1.5 flex items-baseline justify-between">
                                        <span className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                                            {data.month}
                                        </span>
                                        <span className="text-text text-xs font-medium tabular-nums">
                                            {k(total)}
                                        </span>
                                    </div>
                                    <div className="bg-background-alt flex h-2 gap-0.5 overflow-hidden rounded-full">
                                        <div
                                            className="bg-accent ease-smooth transition-all duration-500"
                                            style={{
                                                width: `${(data.commission / maxRevenue) * 100}%`,
                                            }}
                                        />
                                        <div
                                            className="bg-info ease-smooth transition-all duration-500"
                                            style={{
                                                width: `${(data.fees / maxRevenue) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </Panel>

                <div className="space-y-4">
                    <Panel title="Revenue Breakdown">
                        <div className="space-y-4">
                            <div>
                                <SummaryRow
                                    label="Commission (2.5%)"
                                    value="76%"
                                    className="mb-1.5"
                                />
                                <ProgressBar value={76} tone="accent" />
                                <p className="text-text-muted mt-1 text-xs tabular-nums">
                                    $950K YTD
                                </p>
                            </div>
                            <div>
                                <SummaryRow
                                    label="Platform Fees"
                                    value="24%"
                                    className="mb-1.5"
                                />
                                <ProgressBar value={24} tone="info" />
                                <p className="text-text-muted mt-1 text-xs tabular-nums">
                                    $290K YTD
                                </p>
                            </div>
                        </div>
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
        </div>
    );
}
