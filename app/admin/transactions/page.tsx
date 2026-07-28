import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { TransactionTable } from "@/components/features/admin/transaction-table";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";

import type { Transaction } from "@/lib/types";
import { formatMillions } from "@/lib/utils";
const transactions: Transaction[] = [
    {
        id: "1",
        property: "456 Oak Avenue",
        buyer: "John Doe",
        agent: "Sarah Chen",
        price: 3200000,
        status: "escrow",
        initiatedDate: "2024-07-05",
    },
    {
        id: "2",
        property: "789 Sunset Blvd",
        buyer: "Sarah Johnson",
        agent: "Michael Rodriguez",
        price: 2950000,
        status: "pending",
        initiatedDate: "2024-07-10",
    },
    {
        id: "3",
        property: "234 Oak Street",
        buyer: "Michael Chen",
        agent: "Jennifer Martinez",
        price: 4500000,
        status: "completed",
        initiatedDate: "2024-06-28",
    },
    {
        id: "4",
        property: "567 Palm Drive",
        buyer: "Elizabeth Brown",
        agent: "David Williams",
        price: 3800000,
        status: "completed",
        initiatedDate: "2024-06-15",
    },
];

export default function AdminTransactionsPage() {
    const totalVolume = transactions.reduce((sum, t) => sum + t.price, 0);
    const totalCommission = totalVolume * DEFAULT_COMMISSION_RATE;
    const completed = transactions.filter(
        (t) => t.status === "completed",
    ).length;

    return (
        <div className="flex flex-col gap-6">
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <StatCard
                    label="Total Volume"
                    value={formatMillions(totalVolume, 2)}
                    caption={`${transactions.length} transactions`}
                    className="sm:col-span-2"
                    featured
                />
                <StatCard
                    label={`Commission (${DEFAULT_COMMISSION_RATE * 100}%)`}
                    value={`$${Math.round(totalCommission / 1000)}K`}
                    caption="platform revenue"
                />
                <StatCard
                    label="Completed"
                    value={completed}
                    caption={`of ${transactions.length} deals`}
                />
            </div>

            <TransactionTable transactions={transactions} />
        </div>
    );
}
