import { RevenueStreamRow } from "@/components/features/admin/revenue-stream-row";
import type { RevenueStream } from "@/lib/types";

const TABLE_CAPTION =
    "Revenue streams by share of the year to date, value earned and month-over-month move";

export interface RevenueStreamTableProps {
    streams: RevenueStream[];
}

export function RevenueStreamTable({ streams }: RevenueStreamTableProps) {
    return (
        <table className="table-flush w-full min-w-md table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Stream
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Share
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Year to date
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Month
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {streams.map((stream) => (
                    <RevenueStreamRow key={stream.id} stream={stream} />
                ))}
            </tbody>
        </table>
    );
}

RevenueStreamTable.displayName = "RevenueStreamTable";
