"use client";

import { AnimatePresence } from "motion/react";
import { PurchaseRow } from "@/components/features/dashboard/purchase-row";
import type { Purchase } from "@/lib/types";

const TABLE_CAPTION =
    "Your purchases by price, transaction state, escrow state and inspection window";

export interface PurchaseTableProps {
    purchases: Purchase[];
    releasingId: string | null;
    onRelease: (escrowId: string) => void;
}

export function PurchaseTable({
    purchases,
    releasingId,
    onRelease,
}: PurchaseTableProps) {
    return (
        <table className="table-flush w-full min-w-3xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Property
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-24 pl-3 text-right"
                    >
                        Price
                    </th>
                    <th scope="col" className="micro-label w-36 pl-3 text-left">
                        Transaction
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Escrow
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Inspection
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-32 pl-3 text-right"
                    >
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                <AnimatePresence initial={false}>
                    {purchases.map((purchase) => (
                        <PurchaseRow
                            key={purchase.id}
                            purchase={purchase}
                            releasing={releasingId === purchase.escrowId}
                            onRelease={onRelease}
                        />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    );
}

PurchaseTable.displayName = "PurchaseTable";
