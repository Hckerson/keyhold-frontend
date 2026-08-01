"use client";

import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/patterns/data-table";
import { buildTransactionTableConfig } from "@/components/features/admin/transaction-table-columns";
import { ADMIN_TRANSACTIONS } from "@/lib/data/admin-transactions";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import { formatMillions, formatThousands } from "@/lib/utils";
import type { StatItem } from "@/lib/types";

const totalVolume = ADMIN_TRANSACTIONS.reduce(
    (sum, transaction) => sum + transaction.price,
    0,
);
const totalCommission = totalVolume * DEFAULT_COMMISSION_RATE;
const completed = ADMIN_TRANSACTIONS.filter(
    (transaction) => transaction.status === "completed",
).length;

const VOLUME_STAT: StatItem = {
    label: "Total Volume",
    value: formatMillions(totalVolume, 2),
    caption: `${ADMIN_TRANSACTIONS.length} transactions`,
    featured: true,
};

const LEDGER_STATS: StatItem[] = [
    {
        label: `Commission (${DEFAULT_COMMISSION_RATE * 100}%)`,
        value: formatThousands(totalCommission),
        caption: "platform revenue",
    },
    {
        label: "Completed",
        value: completed,
        caption: `of ${ADMIN_TRANSACTIONS.length} deals`,
    },
];

export function AdminTransactionLedger() {
    return (
        <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <StatCard {...VOLUME_STAT} className="sm:col-span-2" />
                {LEDGER_STATS.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <DataTable
                {...buildTransactionTableConfig()}
                data={ADMIN_TRANSACTIONS}
            />
        </>
    );
}

AdminTransactionLedger.displayName = "AdminTransactionLedger";
