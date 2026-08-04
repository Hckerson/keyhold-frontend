import { ConciergeClientRow } from "@/components/features/agent/concierge-client-row";
import type { VIPClient } from "@/lib/data/agent-concierge";

const TABLE_CAPTION = "VIP relationships by tier, mandate and allocation";

export interface ConciergeClientTableProps {
    clients: VIPClient[];
}

export function ConciergeClientTable({ clients }: ConciergeClientTableProps) {
    return (
        <table className="w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Client
                    </th>
                    <th scope="col" className="micro-label w-16 pl-3 text-left">
                        Tier
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Status
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Mandate
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Allocated
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Closed
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Next
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {clients.map((client) => (
                    <ConciergeClientRow key={client.id} client={client} />
                ))}
            </tbody>
        </table>
    );
}

ConciergeClientTable.displayName = "ConciergeClientTable";
