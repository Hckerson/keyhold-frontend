import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { StatGrid } from "@/components/patterns/stat-grid";
import { ActivityFeed } from "@/components/features/shared/activity-feed";
import { QuickActions } from "@/components/features/shared/quick-actions";
import { ViewAllLink } from "@/components/features/shared/view-all-link";
import { UpcomingViewings } from "@/components/features/dashboard/upcoming-viewings";
import { AlertList } from "@/components/features/dashboard/alert-list";
import {
    priceAlerts,
    quickActions,
    recentActivity,
    stats,
    upcomingViewings,
} from "@/lib/data/dashboard-overview";

export default function DashboardPage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="Welcome back, John"
                description="Here's what's happening with your property journey"
                action={
                    <Link href="/search">
                        <Button variant="primary" size="sm">
                            Browse Properties
                        </Button>
                    </Link>
                }
            />

            <StatGrid stats={stats} columns={4} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                    <Panel
                        title="Upcoming Viewings"
                        count={upcomingViewings.length}
                        action={<ViewAllLink href="/dashboard/viewings" />}
                    >
                        <UpcomingViewings initialViewings={upcomingViewings} />
                    </Panel>

                    <Panel
                        title="Recent Activity"
                        count={recentActivity.length}
                    >
                        <ActivityFeed entries={recentActivity} />
                    </Panel>
                </div>

                <div className="space-y-3">
                    <Panel title="Quick Links">
                        <QuickActions actions={quickActions} />
                    </Panel>

                    <Panel
                        title="New Alerts"
                        count={priceAlerts.length}
                        action={<ViewAllLink href="/dashboard/alerts" />}
                    >
                        <AlertList alerts={priceAlerts} />
                    </Panel>
                </div>
            </div>
        </div>
    );
}
