"use client";

import { alignClass, footCell } from "@/components/patterns/data-table-types";
import { cn } from "@/lib/utils";
import type { DataTableColumn } from "@/lib/types";

export interface DataTableFootProps<T> {
    columns: DataTableColumn<T>[];
    rows: T[];
    bare: boolean;
    selectable: boolean;
    revealing: boolean;
}

export function DataTableFoot<T>({
    columns,
    rows,
    bare,
    selectable,
    revealing,
}: DataTableFootProps<T>) {
    return (
        <tfoot
            className={cn(
                bare
                    ? "border-border-light border-t bg-transparent"
                    : "border-border-dark bg-background/60 border-t backdrop-blur-md",
            )}
        >
            <tr>
                {selectable && <td className={footCell} />}
                {columns.map((column) => (
                    <td
                        key={column.id}
                        className={cn(
                            footCell,
                            alignClass[column.align ?? "left"],
                        )}
                    >
                        {column.footer?.(rows)}
                    </td>
                ))}
                {revealing && <td className={footCell} />}
            </tr>
        </tfoot>
    );
}

DataTableFoot.displayName = "DataTableFoot";
