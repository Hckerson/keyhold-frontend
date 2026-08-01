import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { ColumnChart } from "@/components/ui/charts/column-chart";
import { SystemAlertList } from "@/components/features/admin/system-alert-list";
import {
    alerts,
    revenueMonths,
    revenueSeries,
} from "@/lib/data/admin-overview";

const REVENUE_CHART_HEIGHT = 220;

export function AdminOverviewMain() {
    return (
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
                    height={REVENUE_CHART_HEIGHT}
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
    );
}

AdminOverviewMain.displayName = "AdminOverviewMain";
