import { Panel } from "@/components/ui/panel";
import { QuickActions } from "@/components/features/shared/quick-actions";
import { ModerationQueueList } from "@/components/features/admin/moderation-queue-list";
import { SystemHealthList } from "@/components/features/admin/system-health-list";
import { RevenueBreakdown } from "@/components/features/admin/revenue-breakdown";
import {
    moderationQueue,
    quickActions,
    revenueBreakdown,
    systems,
    OVERALL_ERROR_RATE,
    OVERALL_UPTIME,
} from "@/lib/data/admin-overview";

export function AdminOverviewRail() {
    return (
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
    );
}

AdminOverviewRail.displayName = "AdminOverviewRail";
