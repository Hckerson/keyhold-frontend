import { ChevronsUpDown } from "lucide-react";
import {
    alignClass,
    headCell,
    sortIcon,
} from "@/components/patterns/data-table-types";
import { cn } from "@/lib/utils";
import type { DataTableColumn, DataTableSort } from "@/lib/types";

export interface DataTableHeadCellProps<T> {
    column: DataTableColumn<T>;
    sort: DataTableSort | null;
    onSort: (id: string) => void;
}

export function DataTableHeadCell<T>({
    column,
    sort,
    onSort,
}: DataTableHeadCellProps<T>) {
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
                        "group hover:text-text focus-visible:ring-accent ease-smooth inline-flex items-center gap-1 rounded-xs tracking-wide uppercase transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                        column.align === "right" && "flex-row-reverse",
                    )}
                >
                    {label}
                    <Icon
                        size={12}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className={cn(
                            "ease-smooth transition-opacity duration-200",
                            active
                                ? "text-accent"
                                : "text-text-muted opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                        )}
                    />
                </button>
            ) : (
                label
            )}
        </th>
    );
}
