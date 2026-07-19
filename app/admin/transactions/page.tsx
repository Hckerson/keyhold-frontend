import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { BadgeTone } from "@/components/dashboard/contact-row";
import { cn } from "@/lib/utils";

type Status = "pending" | "escrow" | "completed" | "failed";

interface Transaction {
    id: string;
    property: string;
    buyer: string;
    agent: string;
    price: number;
    status: Status;
    initiatedDate: string;
}

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

const statusMeta: Record<Status, { tone: BadgeTone; label: string }> = {
    pending: { tone: "info", label: "Pending" },
    escrow: { tone: "warning", label: "Escrow" },
    completed: { tone: "success", label: "Completed" },
    failed: { tone: "error", label: "Failed" },
};

const th =
    "px-4 py-2.5 text-left font-mono text-[10px] font-medium uppercase tracking-wide text-text-muted";

export default function AdminTransactionsPage() {
    const totalVolume = transactions.reduce((s, t) => s + t.price, 0);
    const totalCommission = totalVolume * 0.025;
    const completed = transactions.filter(
        (t) => t.status === "completed",
    ).length;

    return (
        <div className="space-y-6">
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                    label="Total Volume"
                    value={`$${(totalVolume / 1_000_000).toFixed(2)}M`}
                    caption={`${transactions.length} transactions`}
                    featured
                />
                <StatCard
                    label="Commission (2.5%)"
                    value={`$${Math.round(totalCommission / 1000)}K`}
                    caption="platform revenue"
                />
                <StatCard
                    label="Completed"
                    value={completed}
                    caption={`of ${transactions.length} deals`}
                />
            </div>

            <div className="bg-background-muted border-border-light overflow-hidden rounded-xl border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-border-light border-b">
                                <th className={th}>Property</th>
                                <th className={cn(th, "text-right")}>
                                    Sale Price
                                </th>
                                <th className={cn(th, "text-right")}>
                                    Commission
                                </th>
                                <th className={th}>Initiated</th>
                                <th className={th}>Status</th>
                                <th className={cn(th, "text-right")}>
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-border-light divide-y">
                            {transactions.map((t) => {
                                const inProgress =
                                    t.status !== "completed" &&
                                    t.status !== "failed";
                                return (
                                    <tr
                                        key={t.id}
                                        className="hover:bg-background-alt ease-smooth transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <p className="text-text font-medium">
                                                {t.property}
                                            </p>
                                            <p className="text-text-muted truncate text-xs">
                                                {t.buyer} → {t.agent}
                                            </p>
                                        </td>
                                        <td className="text-text px-4 py-3 text-right font-medium whitespace-nowrap tabular-nums">
                                            ${(t.price / 1_000_000).toFixed(2)}M
                                        </td>
                                        <td className="text-accent px-4 py-3 text-right font-medium whitespace-nowrap tabular-nums">
                                            $
                                            {Math.round(
                                                (t.price * 0.025) / 1000,
                                            )}
                                            K
                                        </td>
                                        <td className="text-text-secondary px-4 py-3 whitespace-nowrap tabular-nums">
                                            {t.initiatedDate}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                tone={statusMeta[t.status].tone}
                                            >
                                                {statusMeta[t.status].label}
                                            </StatusBadge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                                {inProgress && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        Monitor
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
