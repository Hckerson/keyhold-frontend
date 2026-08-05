import { WalkedViewingRow } from "@/components/features/dashboard/walked-viewing-row";
import type { Viewing } from "@/lib/types";

const TABLE_CAPTION =
    "Viewings already walked, with the date, agent, your rating and where you landed";

export interface WalkedViewingTableProps {
    viewings: Viewing[];
}

export function WalkedViewingTable({ viewings }: WalkedViewingTableProps) {
    return (
        <table className="table-flush w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-64 text-left">
                        Property
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Walked
                    </th>
                    <th scope="col" className="micro-label w-32 pl-3 text-left">
                        Agent
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Rating
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Standing
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {viewings.map((viewing) => (
                    <WalkedViewingRow key={viewing.id} viewing={viewing} />
                ))}
            </tbody>
        </table>
    );
}

WalkedViewingTable.displayName = "WalkedViewingTable";
