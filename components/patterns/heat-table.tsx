import { HeatTableRow } from "@/components/patterns/heat-table-row";
import type { HeatTable as HeatTableData } from "@/lib/types";

export interface HeatTableProps {
    label: string;
    summaryLabel: string;
    table: HeatTableData;
}

export function HeatTable({ label, summaryLabel, table }: HeatTableProps) {
    return (
        <div className="border-border bg-background scroll-x rounded-xl border px-3 shadow-sm">
            <table className="table-flush w-full min-w-lg table-fixed">
                <caption className="sr-only">{label}</caption>
                <thead>
                    <tr className="border-border-light h-9 border-b">
                        <th scope="col" className="micro-label w-28 text-left">
                            {label}
                        </th>
                        {table.columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                                className="micro-label px-2 text-right"
                            >
                                {column.label}
                            </th>
                        ))}
                        <th
                            scope="col"
                            className="micro-label w-28 pl-3 text-right"
                        >
                            {summaryLabel}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {table.rows.map((row) => (
                        <HeatTableRow key={row.id} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

HeatTable.displayName = "HeatTable";
