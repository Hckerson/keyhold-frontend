import { LeadRow } from "@/components/features/agent/lead-row";
import type { Lead } from "@/lib/types/lead";

const TABLE_CAPTION = "Enquiries by stage, property, value and activity";
const RESPOND_HEADING = "Respond";

export interface LeadTableProps {
    leads: Lead[];
    onRespond: (id: string, accept: boolean) => void;
}

export function LeadTable({ leads, onRespond }: LeadTableProps) {
    return (
        <table className="table-flush w-full min-w-3xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Prospect
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Stage
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
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Messages
                    </th>
                    <th scope="col" className="micro-label w-20 pl-3 text-left">
                        Last touch
                    </th>
                    <th scope="col" className="w-16 pl-3">
                        <span className="sr-only">{RESPOND_HEADING}</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {leads.map((lead) => (
                    <LeadRow key={lead.id} lead={lead} onRespond={onRespond} />
                ))}
            </tbody>
        </table>
    );
}

LeadTable.displayName = "LeadTable";
