"use client";

import { TransactionLedgerRow } from "@/components/features/admin/transaction-ledger-row";
import {
    COMMISSION_RATE_LABEL,
    commissionOf,
} from "@/lib/data/admin-transactions";
import { formatMillions, formatThousands, sum } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

const TABLE_CAPTION =
    "Marketplace deals by property, buyer and agent, sale price, escrow milestones cleared, settlement status and age";
const ACTION_HEADING = "Open the deal";
const TOTAL_LABEL = "Total";
const DEALS_NOUN = "deals";

export interface TransactionLedgerTableProps {
    transactions: Transaction[];
    onOpen: (id: string) => void;
}

export function TransactionLedgerTable({
    transactions,
    onOpen,
}: TransactionLedgerTableProps) {
    const volume = sum(transactions.map((transaction) => transaction.price));
    const commission = sum(transactions.map(commissionOf));

    return (
        <table className="table-flush w-full min-w-4xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Deal
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Buyer
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Agent
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Sale price
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-24 pl-3 text-right"
                    >
                        Escrow
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Status
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Age
                    </th>
                    <th scope="col" className="w-10 pl-3">
                        <span className="sr-only">{ACTION_HEADING}</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {transactions.map((transaction) => (
                    <TransactionLedgerRow
                        key={transaction.id}
                        transaction={transaction}
                        onOpen={onOpen}
                    />
                ))}
            </tbody>
            <tfoot>
                <tr className="border-border h-9 border-t">
                    <td colSpan={3} className="micro-label py-0">
                        {TOTAL_LABEL} · {transactions.length} {DEALS_NOUN}
                    </td>
                    <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                        {formatMillions(volume, 2)}
                    </td>
                    <td colSpan={2} className="micro-label py-0 pl-3">
                        Commission at {COMMISSION_RATE_LABEL}
                    </td>
                    <td
                        colSpan={2}
                        className="text-accent py-0 pl-3 text-right text-xs font-semibold tabular-nums"
                    >
                        {formatThousands(commission)}
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

TransactionLedgerTable.displayName = "TransactionLedgerTable";
