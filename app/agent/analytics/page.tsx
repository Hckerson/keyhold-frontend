import { PageHeader } from "@/components/ui/page-header";
import { StatGrid } from "@/components/patterns/stat-grid";
import { AnalyticsMonthlyPanel } from "@/components/features/agent/analytics-monthly-panel";
import { AnalyticsComparisonPanel } from "@/components/features/agent/analytics-comparison-panel";
import { AnalyticsQuarterlyPanel } from "@/components/features/agent/analytics-quarterly-panel";
import {
    advantages,
    analyticsMetrics,
    comparison,
    monthlyData,
    quarters,
} from "@/lib/data/agent-analytics";

export default function AgentAnalyticsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Performance Analytics"
                description="Track your sales performance and market insights"
            />

            <StatGrid stats={analyticsMetrics} columns={4} gap="md" />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <AnalyticsMonthlyPanel data={monthlyData} />
                <AnalyticsComparisonPanel
                    bars={comparison}
                    advantages={advantages}
                />
            </div>

            <AnalyticsQuarterlyPanel quarters={quarters} />
        </div>
    );
}
