"use client";

import { ViewingRow } from "@/components/features/dashboard/viewing-row";
import type { Viewing } from "@/lib/types";

const TABLE_CAPTION =
    "Scheduled viewings by status, property, asking price, slot, format, agent and time remaining";
const ACTION_HEADING = "Reschedule or cancel";

export interface ViewingTableProps {
    viewings: Viewing[];
    onReschedule: (id: string) => void;
    onCancel: (id: string) => void;
}

export function ViewingTable({
    viewings,
    onReschedule,
    onCancel,
}: ViewingTableProps) {
    return (
        <table className="table-flush w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-24 text-left">
                        Status
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Property
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Ask
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Slot
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Format
                    </th>
                    <th scope="col" className="micro-label w-32 pl-3 text-left">
                        Agent
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        In
                    </th>
                    <th scope="col" className="w-14 pl-3">
                        <span className="sr-only">{ACTION_HEADING}</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {viewings.map((viewing) => (
                    <ViewingRow
                        key={viewing.id}
                        viewing={viewing}
                        onReschedule={onReschedule}
                        onCancel={onCancel}
                    />
                ))}
            </tbody>
        </table>
    );
}

ViewingTable.displayName = "ViewingTable";
