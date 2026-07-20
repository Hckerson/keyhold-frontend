import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* --------------------------------- Types --------------------------------- */

export interface DataTableColumn<T> {
    id: string;
    label: string;
    align?: "left" | "right";
    width?: string;
    srOnlyLabel?: boolean;
    render: (row: T) => ReactNode;
    footer?: (rows: T[]) => ReactNode;
}

export interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    rowKey: (row: T) => string;
    caption: string;
    emptyMessage?: string;
    rowClassName?: (row: T) => string | undefined;
    className?: string;
}

const alignClass = {
    left: "text-left",
    right: "text-right",
} as const;

const headCell =
    "px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-wide text-text-muted";

/* -------------------------------- Table ---------------------------------- */

export function DataTable<T>({
    columns,
    data,
    rowKey,
    caption,
    emptyMessage = "Nothing to show",
    rowClassName,
    className,
}: DataTableProps<T>) {
    const hasFooter = columns.some((column) => column.footer);

    return (
        <div
            className={cn(
                "bg-background-muted border-border-dark overflow-hidden rounded-xl border shadow-sm",
                className,
            )}
        >
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <caption className="sr-only">{caption}</caption>

                    <thead className="bg-background/80 border-border-dark sticky top-0 z-10 border-b backdrop-blur-md">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    scope="col"
                                    style={{ width: column.width }}
                                    className={cn(
                                        headCell,
                                        alignClass[column.align ?? "left"],
                                    )}
                                >
                                    <span
                                        className={cn(
                                            column.srOnlyLabel && "sr-only",
                                        )}
                                    >
                                        {column.label}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-border divide-y">
                        {data.map((row) => (
                            <tr
                                key={rowKey(row)}
                                className={cn(
                                    "hover:bg-background-alt/60 ease-smooth transition-colors duration-200",
                                    rowClassName?.(row),
                                )}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.id}
                                        className={cn(
                                            "px-3 py-2",
                                            alignClass[column.align ?? "left"],
                                        )}
                                    >
                                        {column.render(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-text-muted px-3 py-10 text-center text-sm"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>

                    {hasFooter && data.length > 0 && (
                        <tfoot className="bg-background/60 border-border-dark border-t backdrop-blur-md">
                            <tr>
                                {columns.map((column) => (
                                    <td
                                        key={column.id}
                                        className={cn(
                                            "px-3 py-2",
                                            alignClass[column.align ?? "left"],
                                        )}
                                    >
                                        {column.footer?.(data)}
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    );
}

DataTable.displayName = "DataTable";
