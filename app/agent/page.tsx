import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { SummaryRow } from "@/components/ui/summary-row";
import { StatGrid } from "@/components/patterns/stat-grid";
import { ActivityFeed } from "@/components/features/shared/activity-feed";
import { QuickActions } from "@/components/features/shared/quick-actions";
import { PanelLink } from "@/components/features/shared/panel-link";
import { OverviewPipelineStages } from "@/components/features/agent/overview-pipeline-stages";
import { OverviewTopPerformers } from "@/components/features/agent/overview-top-performers";
import { OverviewUpcomingShowings } from "@/components/features/agent/overview-upcoming-showings";
import { OverviewRecentLeads } from "@/components/features/agent/overview-recent-leads";
import {
    monthlySummary,
    pipelineStages,
    quickActions,
    recentActivity,
    recentLeads,
    stats,
    topPerformers,
    upcomingShowings,
} from "@/lib/data/agent-overview";

export default function AgentDashboardPage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="Welcome back, Sarah"
                description="Your sales pipeline and performance overview"
            />

            <StatGrid stats={stats} columns={5} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                    <Panel
                        title="Sales Pipeline"
                        description="Current deals by stage"
                        action={
                            <PanelLink
                                href="/agent/pipeline"
                                label="Open CRM"
                            />
                        }
                    >
                        <OverviewPipelineStages stages={pipelineStages} />
                    </Panel>

                    <Panel
                        title="Top Performers"
                        description="Recent closed sales and comps"
                        action={
                            <PanelLink
                                href="/agent/analytics"
                                label="View comps"
                            />
                        }
                    >
                        <OverviewTopPerformers sales={topPerformers} />
                    </Panel>

                    <Panel
                        title="Recent Activity"
                        count={recentActivity.length}
                    >
                        <ActivityFeed entries={recentActivity} />
                    </Panel>
                </div>

                <div className="space-y-3">
                    <Panel title="Quick Actions">
                        <QuickActions actions={quickActions} />
                    </Panel>

                    <Panel
                        title="Upcoming Showings"
                        count={upcomingShowings.length}
                        action={
                            <PanelLink
                                href="/agent/calendar"
                                label="Calendar"
                            />
                        }
                    >
                        <OverviewUpcomingShowings showings={upcomingShowings} />
                    </Panel>

                    <Panel
                        title="Recent Leads"
                        count={recentLeads.length}
                        action={
                            <PanelLink href="/agent/leads" label="All leads" />
                        }
                    >
                        <OverviewRecentLeads leads={recentLeads} />
                    </Panel>

                    <Panel title="This Month">
                        <div className="space-y-3">
                            {monthlySummary.map((item) => (
                                <SummaryRow
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                />
                            ))}
                        </div>
                    </Panel>
                </div>
            </div>
        </div>
    );
}
