import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatGrid } from "@/components/patterns/stat-grid";
import { AdminRevenuePanels } from "@/components/sections/admin/admin-revenue-panels";
import { REVENUE_STATS } from "@/lib/data/admin-payments";

export default function AdminPaymentsPage() {
    return (
        <div className="space-y-3">
            <PageHeader
                title="Payment & Revenue"
                description="Commissions, platform fees, and payouts"
                action={
                    <Button variant="secondary" size="sm">
                        Export
                    </Button>
                }
            />

            <StatGrid stats={REVENUE_STATS} columns={4} />

            <AdminRevenuePanels />
        </div>
    );
}
