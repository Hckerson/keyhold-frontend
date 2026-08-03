import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { AdminReportMarket } from "@/components/sections/admin/admin-report-market";
import { AdminReportOverview } from "@/components/sections/admin/admin-report-overview";
import { AdminReportTrend } from "@/components/sections/admin/admin-report-trend";

export default function AdminReportsPage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="Analytics & Reports"
                description="Platform performance and market insights"
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                            Download
                        </Button>
                        <Button variant="primary" size="sm">
                            Generate Custom
                        </Button>
                    </div>
                }
            />

            <AdminReportOverview />

            <AdminReportTrend />

            <AdminReportMarket />
        </div>
    );
}
