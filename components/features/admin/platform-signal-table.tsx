import { PlatformSignalRow } from "@/components/features/admin/platform-signal-row";
import type { PlatformSignal } from "@/lib/types";

const TABLE_CAPTION =
    "Open platform signals by severity, subject, domain, exposed value and age";
const ACTION_HEADING = "Open the signal";

export interface PlatformSignalTableProps {
    signals: PlatformSignal[];
}

export function PlatformSignalTable({ signals }: PlatformSignalTableProps) {
    return (
        <table className="table-flush w-full min-w-2xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-24 text-left">
                        Severity
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Signal
                    </th>
                    <th scope="col" className="micro-label w-36 pl-3 text-left">
                        Subject
                    </th>
                    <th scope="col" className="micro-label w-32 pl-3 text-left">
                        Domain
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Exposed
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
                {signals.map((signal) => (
                    <PlatformSignalRow key={signal.id} signal={signal} />
                ))}
            </tbody>
        </table>
    );
}

PlatformSignalTable.displayName = "PlatformSignalTable";
