"use client";

import { ChevronRight } from "lucide-react";
import { alignClass, groupCell } from "@/components/patterns/data-table-types";
import { cn } from "@/lib/utils";
import type { DataTableColumn, DataTableGroupDef } from "@/lib/types";

export interface DataTableGroupRowProps<T> {
    group: DataTableGroupDef;
    rows: T[];
    columns: DataTableColumn<T>[];
    open: boolean;
    selectable: boolean;
    revealing: boolean;
    onToggle: () => void;
}

export function DataTableGroupRow<T>({
    group,
    rows,
    columns,
    open,
    selectable,
    revealing,
    onToggle,
}: DataTableGroupRowProps<T>) {
    const firstSummary = columns.findIndex((column) => column.summary);
    const leading = firstSummary === -1 ? columns.length : firstSummary;

    return (
        <tr>
            <th
                scope="rowgroup"
                colSpan={leading + (selectable ? 1 : 0)}
                className={cn(groupCell, "text-left font-normal")}
            >
                <button
                    type="button"
                    aria-expanded={open}
                    onClick={onToggle}
                    className="group focus-visible:ring-accent flex items-center gap-2 rounded-xs whitespace-nowrap focus-visible:ring-2 focus-visible:outline-none"
                >
                    <ChevronRight
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn(
                            "text-text-muted ease-smooth size-3 transition-transform duration-200",
                            open && "rotate-90",
                        )}
                    />
                    <span className="micro-label group-hover:text-text ease-smooth transition-colors">
                        {group.label}
                    </span>
                    <span className="text-text-muted">
                        {group.caption ?? rows.length}
                    </span>
                </button>
            </th>
            {columns.slice(leading).map((column) => (
                <td
                    key={column.id}
                    className={cn(
                        groupCell,
                        alignClass[column.align ?? "left"],
                    )}
                >
                    {column.summary?.(rows)}
                </td>
            ))}
            {revealing && <td className={groupCell} />}
        </tr>
    );
}

DataTableGroupRow.displayName = "DataTableGroupRow";
