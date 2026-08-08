import { DashboardOverviewHeader } from "@/components/sections/dashboard/dashboard-overview-header";
import { DashboardOverviewStatBand } from "@/components/sections/dashboard/dashboard-overview-stat-band";
import { DashboardOverviewMain } from "@/components/sections/dashboard/dashboard-overview-main";
import { DashboardOverviewRail } from "@/components/sections/dashboard/dashboard-overview-rail";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <DashboardOverviewHeader />
            <DashboardOverviewStatBand />

            <div className="console-split gap-3">
                <DashboardOverviewMain />
                <DashboardOverviewRail />
            </div>
        </div>
    );
}
