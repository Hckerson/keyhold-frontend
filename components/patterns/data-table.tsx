import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Column<T> {
    key: keyof T;
    label: string;
    width?: string;
    render?: (value: any, row: T) => ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    className?: string;
    rowClassName?: string;
}

export type { DataTableProps };

export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    className,
    rowClassName,
}: DataTableProps<T>) {
    return (
        <div className={cn("w-full overflow-x-auto", className)}>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-border bg-background-muted border-b">
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className="text-text-secondary px-6 py-4 text-left text-sm font-semibold"
                                style={{ width: column.width }}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={cn(
                                "border-border hover:bg-background-muted border-b transition-colors",
                                rowClassName,
                            )}
                        >
                            {columns.map((column) => (
                                <td
                                    key={String(column.key)}
                                    className="text-text px-6 py-4 text-sm"
                                    style={{ width: column.width }}
                                >
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.length === 0 && (
                <div className="text-text-muted py-8 text-center">
                    No data available
                </div>
            )}
        </div>
    );
}
