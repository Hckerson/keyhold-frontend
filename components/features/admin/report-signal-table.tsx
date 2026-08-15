import { ReportSignalRow } from "@/components/features/admin/report-signal-row";
import type { ReportSignal } from "@/lib/types";

const TABLE_CAPTION =
    "Platform signals by measure, context, current value and month over month change";

export interface ReportSignalTableProps {
    signals: ReportSignal[];
}

export function ReportSignalTable({ signals }: ReportSignalTableProps) {
    return (
        <table className="table-flush w-full min-w-sm table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Signal
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Context
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Value
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Change
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {signals.map((signal) => (
                    <ReportSignalRow key={signal.id} signal={signal} />
                ))}
            </tbody>
        </table>
    );
}

ReportSignalTable.displayName = "ReportSignalTable";
