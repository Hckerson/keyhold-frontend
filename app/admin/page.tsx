import { PageHeader } from "@/components/ui/page-header";
import { StatGrid } from "@/components/patterns/stat-grid";
import { AdminOverviewMain } from "@/components/sections/admin/admin-overview-main";
import { AdminOverviewRail } from "@/components/sections/admin/admin-overview-rail";
import { volumeMetrics } from "@/lib/data/admin-overview";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="Admin Dashboard"
                description="System health, volume, revenue, and content moderation"
            />

            <StatGrid stats={volumeMetrics} columns={4} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <AdminOverviewMain />
                <AdminOverviewRail />
            </div>
        </div>
    );
}
