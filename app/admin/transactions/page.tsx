import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { AdminTransactionLedger } from "@/components/sections/admin/admin-transaction-ledger";

export default function AdminTransactionsPage() {
    return (
        <div className="flex flex-col gap-3">
            <PageHeader
                title="Transactions"
                description="Deal flow, escrow, and commission across the marketplace"
                action={
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                            Filter
                        </Button>
                        <Button variant="secondary" size="sm">
                            Export
                        </Button>
                    </div>
                }
            />

            <AdminTransactionLedger />
        </div>
    );
}
