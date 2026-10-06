"use client";

import { Checkbox } from "@/components/ui/forms/checkbox";
import { DataTableHeadCell } from "@/components/patterns/data-table-head-cell";
import { headCell } from "@/components/patterns/data-table-types";
import { cn } from "@/lib/utils";
import type { DataTableColumn, DataTableSort } from "@/lib/types";

export interface DataTableHeadProps<T> {
    columns: DataTableColumn<T>[];
    sort: DataTableSort | null;
    onSort: (id: string) => void;
    bare: boolean;
    selectable: boolean;
    revealing: boolean;
    allOnPageSelected: boolean;
    onTogglePage: () => void;
}

export function DataTableHead<T>({
    columns,
    sort,
    onSort,
    bare,
    selectable,
    revealing,
    allOnPageSelected,
    onTogglePage,
}: DataTableHeadProps<T>) {
    return (
        <thead
            className={cn(
                bare
                    ? "border-border-light border-b"
                    : "border-border-dark border-b",
                bare
                    ? "bg-transparent"
                    : "bg-background/80 sticky top-0 z-10 backdrop-blur-md",
            )}
        >
            <tr>
                {selectable && (
                    <th scope="col" className={cn(headCell, "w-10")}>
                        <Checkbox
                            aria-label="Select all rows on this page"
                            checked={allOnPageSelected}
                            onChange={onTogglePage}
                        />
                    </th>
                )}
                {columns.map((column) => (
                    <DataTableHeadCell
                        key={column.id}
                        column={column}
                        sort={sort}
                        onSort={onSort}
                    />
                ))}
                {revealing && (
                    <th scope="col" className={cn(headCell, "w-9")}>
                        <span className="sr-only">Details</span>
                    </th>
                )}
            </tr>
        </thead>
    );
}

DataTableHead.displayName = "DataTableHead";
