import { BusinessFigureRow } from "@/components/features/admin/business-figure-row";
import { cn } from "@/lib/utils";
import type { BusinessFigure } from "@/lib/types";

const TABLE_CAPTION =
    "Deals, listings and members: latest month, change on the prior month, monthly trend, total to date and its ratio";

const COLUMNS = [
    { id: "figure", label: "Figure", className: "w-28 text-left" },
    { id: "latest", label: "Latest month", className: "pl-3 text-left" },
    { id: "delta", label: "MoM", className: "w-16 pl-3 text-left" },
    { id: "trend", label: "Trend", className: "w-28 pl-3 text-left" },
    { id: "total", label: "To date", className: "w-20 pl-3 text-right" },
    { id: "ratio", label: "Ratio", className: "w-20 pl-3 text-right" },
];

export interface BusinessFigureTableProps {
    figures: BusinessFigure[];
}

export function BusinessFigureTable({ figures }: BusinessFigureTableProps) {
    return (
        <div className="scroll-x">
            <table className="table-flush w-full min-w-lg table-fixed">
                <caption className="sr-only">{TABLE_CAPTION}</caption>
                <thead>
                    <tr className="border-border-light h-9 border-b">
                        {COLUMNS.map((column) => (
                            <th
                                key={column.id}
                                scope="col"
                                className={cn("micro-label", column.className)}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {figures.map((figure) => (
                        <BusinessFigureRow key={figure.id} figure={figure} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

BusinessFigureTable.displayName = "BusinessFigureTable";
