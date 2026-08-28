"use client";

import { AnimatePresence } from "motion/react";
import { AlertRow } from "@/components/features/dashboard/alert-row";
import type { Alert } from "@/lib/types";

const TABLE_CAPTION =
    "Saved-property alerts by signal, value, delivery channel and age";

export interface AlertTableProps {
    alerts: Alert[];
    onMarkRead: (id: string) => void;
}

export function AlertTable({ alerts, onMarkRead }: AlertTableProps) {
    return (
        <table className="table-flush w-full min-w-3xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-32 text-left">
                        Signal
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Property
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Value
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Channel
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Age
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-24 pl-3 text-right"
                    >
                        State
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                <AnimatePresence initial={false}>
                    {alerts.map((alert) => (
                        <AlertRow
                            key={alert.id}
                            alert={alert}
                            onMarkRead={onMarkRead}
                        />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    );
}

AlertTable.displayName = "AlertTable";
