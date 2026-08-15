import { LeadRow } from "@/components/features/agent/lead-row";
import type { Lead } from "@/lib/data/agent-leads";

const TABLE_CAPTION = "Prospects by stage, score, budget and fit";
const ADVANCE_HEADING = "Advance";

export interface LeadTableProps {
    leads: Lead[];
    onAdvance: (id: string) => void;
}

export function LeadTable({ leads, onAdvance }: LeadTableProps) {
    return (
        <table className="table-flush w-full min-w-4xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Prospect
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Stage
                    </th>
                    <th scope="col" className="micro-label w-14 pl-3 text-left">
                        Score
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Budget
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Fit
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Last touch
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Next
                    </th>
                    <th scope="col" className="w-9 pl-3">
                        <span className="sr-only">{ADVANCE_HEADING}</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {leads.map((lead) => (
                    <LeadRow key={lead.id} lead={lead} onAdvance={onAdvance} />
                ))}
            </tbody>
        </table>
    );
}

LeadTable.displayName = "LeadTable";
