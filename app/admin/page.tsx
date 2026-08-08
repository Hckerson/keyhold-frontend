import { AdminOverviewHeader } from "@/components/sections/admin/admin-overview-header";
import { AdminOverviewMain } from "@/components/sections/admin/admin-overview-main";
import { AdminOverviewRail } from "@/components/sections/admin/admin-overview-rail";
import { AdminOverviewStatBand } from "@/components/sections/admin/admin-overview-stat-band";
import { OVERVIEW_SUMMARY, PLATFORM_STATS } from "@/lib/data/admin-overview";

export default function AdminDashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <AdminOverviewHeader summary={OVERVIEW_SUMMARY} />

            <AdminOverviewStatBand stats={PLATFORM_STATS} />

            <div className="console-split gap-3">
                <AdminOverviewMain />
                <AdminOverviewRail />
            </div>
        </div>
    );
}
