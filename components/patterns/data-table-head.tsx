"use client";

import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/forms/checkbox";
import {
    alignClass,
    headCell,
    sortIcon,
    type DataTableColumn,
    type DataTableSort,
} from "@/components/patterns/data-table-types";
import { cn } from "@/lib/utils";

function HeadCell<T>({
    column,
    sort,
    onSort,
}: {
    column: DataTableColumn<T>;
    sort: DataTableSort | null;
    onSort: (id: string) => void;
}) {
    const active = sort?.id === column.id;
    const Icon = active && sort ? sortIcon[sort.direction] : ChevronsUpDown;
    const label = (
        <span className={cn(column.srOnlyLabel && "sr-only")}>
            {column.label}
        </span>
    );

    return (
        <th
            scope="col"
            style={{ width: column.width }}
            aria-sort={
                column.sortValue
                    ? active && sort
                        ? sort.direction === "asc"
                            ? "ascending"
                            : "descending"
                        : "none"
                    : undefined
            }
            className={cn(headCell, alignClass[column.align ?? "left"])}
        >
            {column.sortValue ? (
                <button
                    type="button"
                    onClick={() => onSort(column.id)}
                    className={cn(
                        "hover:text-text focus-visible:ring-accent ease-smooth inline-flex items-center gap-1 rounded-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                        column.align === "right" && "flex-row-reverse",
                    )}
                >
                    {label}
                    <Icon
                        size={12}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className={active ? "text-accent" : "text-text-muted"}
                    />
                </button>
            ) : (
                label
            )}
        </th>
    );
}

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
                "border-border-dark border-b",
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
                    <HeadCell
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
