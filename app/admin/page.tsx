import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { StatGrid } from "@/components/patterns/stat-grid";
import { QuickActions } from "@/components/features/shared/quick-actions";
import { SystemAlertList } from "@/components/features/admin/system-alert-list";
import { ModerationQueueList } from "@/components/features/admin/moderation-queue-list";
import { SystemHealthList } from "@/components/features/admin/system-health-list";
import { RevenueBreakdown } from "@/components/features/admin/revenue-breakdown";
import {
    alerts,
    moderationQueue,
    quickActions,
    revenueBreakdown,
    revenueMonths,
    revenueSeries,
    systems,
    volumeMetrics,
    OVERALL_ERROR_RATE,
    OVERALL_UPTIME,
} from "@/lib/data/admin-overview";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="Admin Dashboard"
                description="System health, volume, revenue, and content moderation"
            />

            <StatGrid stats={volumeMetrics} columns={4} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                    <Panel
                        title="Revenue"
                        description="Gross merchandise value and platform commissions"
                        action={
                            <Link href="/admin/payments">
                                <Button variant="secondary" size="sm">
                                    Payments
                                </Button>
                            </Link>
                        }
                    >
                        <ColumnChart
                            data={revenueMonths}
                            xKey="month"
                            series={revenueSeries}
                            divideBy={1_000_000}
                            valuePrefix="$"
                            valueSuffix="M"
                            height={220}
                        />
                    </Panel>

                    <Panel
                        title="System Alerts"
                        description="Recent notifications requiring attention"
                        count={alerts.length}
                    >
                        <SystemAlertList alerts={alerts} />
                    </Panel>
                </div>

                <div className="space-y-3">
                    <Panel title="Revenue Breakdown">
                        <RevenueBreakdown data={revenueBreakdown} />
                    </Panel>

                    <Panel title="Moderation Queue">
                        <ModerationQueueList items={moderationQueue} />
                    </Panel>

                    <Panel title="Quick Actions">
                        <QuickActions actions={quickActions} />
                    </Panel>

                    <Panel
                        title="System Health"
                        description={`Uptime ${OVERALL_UPTIME} · Error rate ${OVERALL_ERROR_RATE} (24h)`}
                    >
                        <SystemHealthList systems={systems} />
                    </Panel>
                </div>
            </div>
        </div>
    );
}
