import { AdminReportsHeader } from "@/components/sections/admin/admin-reports-header";
import { AdminReportsMain } from "@/components/sections/admin/admin-reports-main";
import { AdminReportsRail } from "@/components/sections/admin/admin-reports-rail";
import { AdminReportsStatBand } from "@/components/sections/admin/admin-reports-stat-band";
import { REPORT_PERIOD_LABEL } from "@/lib/data/admin-report-trend";
import { REPORT_STATS } from "@/lib/data/admin-reports";

export default function AdminReportsPage() {
    return (
        <div className="flex flex-col gap-4">
            <AdminReportsHeader period={REPORT_PERIOD_LABEL} />

            <AdminReportsStatBand stats={REPORT_STATS} />

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                <AdminReportsMain />
                <AdminReportsRail />
            </div>
        </div>
    );
}
