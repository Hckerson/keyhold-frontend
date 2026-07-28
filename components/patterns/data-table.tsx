"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
    ArrowDown,
    ArrowUp,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/forms/checkbox";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc";

export interface DataTableSort {
    id: string;
    direction: SortDirection;
}

export interface DataTableColumn<T> {
    id: string;
    label: string;
    align?: "left" | "right";
    width?: string;
    srOnlyLabel?: boolean;
    sortValue?: (row: T) => string | number;
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
    defaultSort?: DataTableSort;
    selectable?: boolean;
    onSelectionChange?: (rows: T[]) => void;
    bulkActions?: (rows: T[]) => ReactNode;
    pageSize?: number;
    className?: string;
}

const alignClass = {
    left: "text-left",
    right: "text-right",
} as const;

const headCell =
    "px-3 py-2 font-mono text-caption font-medium uppercase tracking-wide text-text-muted";

const sortIcon = {
    asc: ArrowUp,
    desc: ArrowDown,
} as const;

function compare(a: string | number, b: string | number) {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b));
}

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

export function DataTable<T>({
    columns,
    data,
    rowKey,
    caption,
    emptyMessage = "Nothing to show",
    rowClassName,
    defaultSort,
    selectable = false,
    onSelectionChange,
    bulkActions,
    pageSize,
    className,
}: DataTableProps<T>) {
    const [sort, setSort] = useState<DataTableSort | null>(defaultSort ?? null);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const hasFooter = columns.some((column) => column.footer);
    const columnCount = columns.length + (selectable ? 1 : 0);

    const sortedData = useMemo(() => {
        const column = columns.find((item) => item.id === sort?.id);
        const sortValue = column?.sortValue;
        if (!sort || !sortValue) return data;
        return [...data].sort((a, b) => {
            const result = compare(sortValue(a), sortValue(b));
            return sort.direction === "asc" ? result : -result;
        });
    }, [columns, data, sort]);

    const totalPages = pageSize
        ? Math.max(1, Math.ceil(sortedData.length / pageSize))
        : 1;
    const currentPage = Math.min(page, totalPages);
    const firstIndex = pageSize ? (currentPage - 1) * pageSize : 0;
    const pageRows = pageSize
        ? sortedData.slice(firstIndex, firstIndex + pageSize)
        : sortedData;

    const selectedRows = sortedData.filter((row) =>
        selectedKeys.includes(rowKey(row)),
    );
    const allOnPageSelected =
        pageRows.length > 0 &&
        pageRows.every((row) => selectedKeys.includes(rowKey(row)));

    const applySelection = (keys: string[]) => {
        setSelectedKeys(keys);
        onSelectionChange?.(
            sortedData.filter((row) => keys.includes(rowKey(row))),
        );
    };

    const toggleSort = (id: string) => {
        setSort((current) =>
            current?.id === id
                ? {
                      id,
                      direction: current.direction === "asc" ? "desc" : "asc",
                  }
                : { id, direction: "asc" },
        );
        setPage(1);
    };

    const toggleRow = (key: string) => {
        applySelection(
            selectedKeys.includes(key)
                ? selectedKeys.filter((item) => item !== key)
                : [...selectedKeys, key],
        );
    };

    const togglePage = () => {
        const pageKeys = pageRows.map(rowKey);
        applySelection(
            allOnPageSelected
                ? selectedKeys.filter((key) => !pageKeys.includes(key))
                : [...new Set([...selectedKeys, ...pageKeys])],
        );
    };

    return (
        <div
            className={cn(
                "bg-background-muted border-border-dark overflow-hidden rounded-xl border shadow-sm",
                className,
            )}
        >
            {selectable && selectedRows.length > 0 && (
                <div className="border-border-dark bg-background-alt flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
                    <p
                        aria-live="polite"
                        className="text-text text-xs font-medium tabular-nums"
                    >
                        {selectedRows.length} selected
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                        {bulkActions?.(selectedRows)}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => applySelection([])}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <caption className="sr-only">{caption}</caption>

                    <thead className="bg-background/80 border-border-dark sticky top-0 z-10 border-b backdrop-blur-md">
                        <tr>
                            {selectable && (
                                <th
                                    scope="col"
                                    className={cn(headCell, "w-10")}
                                >
                                    <Checkbox
                                        aria-label="Select all rows on this page"
                                        checked={allOnPageSelected}
                                        onChange={togglePage}
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <HeadCell
                                    key={column.id}
                                    column={column}
                                    sort={sort}
                                    onSort={toggleSort}
                                />
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-border divide-y">
                        {pageRows.map((row) => {
                            const key = rowKey(row);
                            return (
                                <tr
                                    key={key}
                                    className={cn(
                                        "hover:bg-background-alt/60 ease-smooth transition-colors duration-200",
                                        rowClassName?.(row),
                                    )}
                                >
                                    {selectable && (
                                        <td className="px-3 py-2">
                                            <Checkbox
                                                aria-label={`Select row ${key}`}
                                                checked={selectedKeys.includes(
                                                    key,
                                                )}
                                                onChange={() => toggleRow(key)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td
                                            key={column.id}
                                            className={cn(
                                                "px-3 py-2",
                                                alignClass[
                                                    column.align ?? "left"
                                                ],
                                            )}
                                        >
                                            {column.render(row)}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}

                        {sortedData.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columnCount}
                                    className="text-text-muted px-3 py-10 text-center text-sm"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>

                    {hasFooter && sortedData.length > 0 && (
                        <tfoot className="bg-background/60 border-border-dark border-t backdrop-blur-md">
                            <tr>
                                {selectable && <td className="px-3 py-2" />}
                                {columns.map((column) => (
                                    <td
                                        key={column.id}
                                        className={cn(
                                            "px-3 py-2",
                                            alignClass[column.align ?? "left"],
                                        )}
                                    >
                                        {column.footer?.(sortedData)}
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>

            {pageSize && sortedData.length > pageSize && (
                <nav
                    aria-label="Table pagination"
                    className="border-border-dark flex items-center justify-between gap-3 border-t px-3 py-2"
                >
                    <p className="text-text-muted text-xs tabular-nums">
                        {firstIndex + 1}–{firstIndex + pageRows.length} of{" "}
                        {sortedData.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            aria-label="Previous page"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setPage((current) => Math.max(1, current - 1))
                            }
                        >
                            <ChevronLeft size={12} strokeWidth={1.5} />
                        </Button>
                        <span className="text-text-secondary text-xs tabular-nums">
                            {currentPage} / {totalPages}
                        </span>
                        <Button
                            variant="secondary"
                            size="sm"
                            aria-label="Next page"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setPage((current) =>
                                    Math.min(totalPages, current + 1),
                                )
                            }
                        >
                            <ChevronRight size={12} strokeWidth={1.5} />
                        </Button>
                    </div>
                </nav>
            )}
        </div>
    );
}

DataTable.displayName = "DataTable";
