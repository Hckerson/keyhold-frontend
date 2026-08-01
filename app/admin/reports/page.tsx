import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatGrid } from "@/components/patterns/stat-grid";
import { AdminMarketPanels } from "@/components/sections/admin/admin-market-panels";
import { REPORT_STATS } from "@/lib/data/admin-reports";

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

            <StatGrid stats={REPORT_STATS} columns={4} />

            <AdminMarketPanels />
        </div>
    );
}
