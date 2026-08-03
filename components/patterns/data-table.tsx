"use client";

import {
    Fragment,
    useCallback,
    useId,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent,
    type MouseEvent,
    type ReactNode,
} from "react";
import {
    ArrowDown,
    ArrowUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/forms/checkbox";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc";
export type RevealMode = "inline" | "panel";
export type ColumnEmphasis =
    | "focal"
    | "identity"
    | "figure"
    | "field"
    | "muted"
    | "meta";

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
    emphasis?: ColumnEmphasis;
    sortValue?: (row: T) => string | number;
    render: (row: T) => ReactNode;
    footer?: (rows: T[]) => ReactNode;
}

export interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    rowKey: (row: T) => string;
    caption: string;
    variant?: "card" | "bare";
    emptyMessage?: string;
    rowClassName?: (row: T) => string | undefined;
    defaultSort?: DataTableSort;
    selectable?: boolean;
    selectedKeys?: string[];
    onSelectedKeysChange?: (keys: string[]) => void;
    bulkActions?: (rows: T[]) => ReactNode;
    pageSize?: number;
    reveal?: RevealMode;
    renderDetail?: (row: T) => ReactNode;
    rowLabel?: (row: T) => string;
    panelTitle?: (row: T) => ReactNode;
    panelFooter?: (row: T) => ReactNode;
    panelSize?: "sm" | "md" | "lg";
    openKey?: string | null;
    onOpenChange?: (key: string | null) => void;
    className?: string;
}

export type DataTableConfig<T> = Omit<DataTableProps<T>, "data">;

const alignClass = {
    left: "text-left",
    right: "text-right",
} as const;

const emphasisClass: Record<ColumnEmphasis, string> = {
    focal: "font-display text-lg leading-none font-light tabular-nums",
    identity: "text-xs font-medium",
    figure: "text-xs font-medium tabular-nums",
    field: "text-xs",
    muted: "text-xs text-text-secondary",
    meta: "micro-label tabular-nums",
};

const headCell = "px-3 py-2.5 micro-label leading-none";

const footCell = "px-3 py-2.5 text-xs font-medium tabular-nums";

const sortIcon = {
    asc: ArrowUp,
    desc: ArrowDown,
} as const;

const INTERACTIVE = "a, button, input, label, select, textarea";

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
    variant = "card",
    emptyMessage = "Nothing to show",
    rowClassName,
    defaultSort,
    selectable = false,
    selectedKeys,
    onSelectedKeysChange,
    bulkActions,
    pageSize,
    reveal,
    renderDetail,
    rowLabel,
    panelTitle,
    panelFooter,
    panelSize = "lg",
    openKey,
    onOpenChange,
    className,
}: DataTableProps<T>) {
    const baseId = useId();
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [sort, setSort] = useState<DataTableSort | null>(defaultSort ?? null);
    const [internalKeys, setInternalKeys] = useState<string[]>([]);
    const [internalOpen, setInternalOpen] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const controlledSelection = selectedKeys !== undefined;
    const currentKeys = controlledSelection ? selectedKeys : internalKeys;

    const controlledOpen = openKey !== undefined;
    const currentOpen = controlledOpen ? openKey : internalOpen;

    const revealing = reveal !== undefined && renderDetail !== undefined;
    const bare = variant === "bare";
    const fixed = columns.some((column) => column.width);
    const hasFooter = columns.some((column) => column.footer);
    const columnCount =
        columns.length + (selectable ? 1 : 0) + (revealing ? 1 : 0);

    const focalColumnId = columns.find(
        (column) => column.emphasis === "focal",
    )?.id;

    const columnEmphasis = (column: DataTableColumn<T>): ColumnEmphasis => {
        const declared = column.emphasis ?? "field";
        if (declared === "focal" && column.id !== focalColumnId) return "figure";
        return declared;
    };

    const setOpen = useCallback(
        (next: string | null) => {
            if (!controlledOpen) setInternalOpen(next);
            onOpenChange?.(next);
        },
        [controlledOpen, onOpenChange],
    );

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
        currentKeys.includes(rowKey(row)),
    );
    const allOnPageSelected =
        pageRows.length > 0 &&
        pageRows.every((row) => currentKeys.includes(rowKey(row)));

    const openRow =
        sortedData.find((row) => rowKey(row) === currentOpen) ?? null;

    const applySelection = (keys: string[]) => {
        if (!controlledSelection) setInternalKeys(keys);
        onSelectedKeysChange?.(keys);
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
            currentKeys.includes(key)
                ? currentKeys.filter((item) => item !== key)
                : [...currentKeys, key],
        );
    };

    const togglePage = () => {
        const pageKeys = pageRows.map(rowKey);
        applySelection(
            allOnPageSelected
                ? currentKeys.filter((key) => !pageKeys.includes(key))
                : [...new Set([...currentKeys, ...pageKeys])],
        );
    };

    const toggleOpen = (key: string) =>
        setOpen(currentOpen === key ? null : key);

    const onRowClick = (
        event: MouseEvent<HTMLTableRowElement>,
        key: string,
    ) => {
        if (!revealing) return;
        const target = event.target;
        if (target instanceof Element && target.closest(INTERACTIVE)) return;
        toggleOpen(key);
    };

    const onTableKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
        if (!revealing) return;

        if (event.key === "Escape" && currentOpen !== null) {
            setOpen(null);
            return;
        }
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

        const table = tableRef.current;
        const active = document.activeElement;
        if (!table || !(active instanceof HTMLButtonElement)) return;

        const triggers = Array.from(
            table.querySelectorAll<HTMLButtonElement>("[data-reveal-row]"),
        );
        const index = triggers.indexOf(active);
        if (index === -1) return;

        event.preventDefault();
        const next =
            event.key === "ArrowDown"
                ? Math.min(index + 1, triggers.length - 1)
                : Math.max(index - 1, 0);
        triggers[next]?.focus();
    };

    return (
        <>
            <div
                className={cn(
                    bare
                        ? "overflow-hidden"
                        : "bg-background-muted border-border-dark overflow-hidden rounded-xl border shadow-sm",
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
                    <table
                        ref={tableRef}
                        onKeyDown={onTableKeyDown}
                        className={cn(
                            "w-full text-xs leading-tight",
                            fixed && "table-fixed",
                        )}
                    >
                        <caption className="sr-only">{caption}</caption>

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
                                {revealing && (
                                    <th
                                        scope="col"
                                        className={cn(headCell, "w-9")}
                                    >
                                        <span className="sr-only">Details</span>
                                    </th>
                                )}
                            </tr>
                        </thead>

                        <tbody className="divide-border divide-y">
                            {pageRows.map((row) => {
                                const key = rowKey(row);
                                const open = revealing && key === currentOpen;
                                const detailId = `${baseId}-${key}`;

                                return (
                                    <Fragment key={key}>
                                        <tr
                                            onClick={(event) =>
                                                onRowClick(event, key)
                                            }
                                            className={cn(
                                                "ease-smooth transition-colors duration-200",
                                                revealing && "cursor-pointer",
                                                open
                                                    ? "bg-background-alt"
                                                    : "hover:bg-background-alt/60",
                                                rowClassName?.(row),
                                            )}
                                        >
                                            {selectable && (
                                                <td className="px-3 py-2">
                                                    <Checkbox
                                                        aria-label={`Select row ${key}`}
                                                        checked={currentKeys.includes(
                                                            key,
                                                        )}
                                                        onChange={() =>
                                                            toggleRow(key)
                                                        }
                                                    />
                                                </td>
                                            )}

                                            {columns.map((column) => (
                                                <td
                                                    key={column.id}
                                                    className={cn(
                                                        "px-3 py-2",
                                                        emphasisClass[
                                                            columnEmphasis(
                                                                column,
                                                            )
                                                        ],
                                                        alignClass[
                                                            column.align ??
                                                                "left"
                                                        ],
                                                    )}
                                                >
                                                    {column.render(row)}
                                                </td>
                                            ))}

                                            {revealing && (
                                                <td className="px-3 py-2 text-right">
                                                    <button
                                                        type="button"
                                                        data-reveal-row=""
                                                        onClick={() =>
                                                            toggleOpen(key)
                                                        }
                                                        aria-expanded={
                                                            reveal === "inline"
                                                                ? open
                                                                : undefined
                                                        }
                                                        aria-controls={
                                                            reveal === "inline"
                                                                ? detailId
                                                                : undefined
                                                        }
                                                        aria-haspopup={
                                                            reveal === "panel"
                                                                ? "dialog"
                                                                : undefined
                                                        }
                                                        aria-label={
                                                            rowLabel
                                                                ? `Details for ${rowLabel(row)}`
                                                                : "Show details"
                                                        }
                                                        className="text-text-muted hover:text-text focus-visible:ring-accent ease-smooth grid size-5 place-items-center rounded-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                                                    >
                                                        {reveal === "inline" ? (
                                                            <ChevronDown
                                                                size={12}
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                aria-hidden="true"
                                                                className={cn(
                                                                    "ease-smooth transition-transform duration-200",
                                                                    open &&
                                                                        "rotate-180",
                                                                )}
                                                            />
                                                        ) : (
                                                            <ChevronRight
                                                                size={12}
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </button>
                                                </td>
                                            )}
                                        </tr>

                                        {open && reveal === "inline" && (
                                            <tr
                                                id={detailId}
                                                className="bg-background-alt"
                                            >
                                                <td
                                                    colSpan={columnCount}
                                                    className="px-3 py-3 leading-normal"
                                                >
                                                    {renderDetail?.(row)}
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                );
                            })}

                            {sortedData.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={columnCount}
                                        className="text-text-muted px-3 py-10 text-center text-xs leading-normal"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}
                        </tbody>

                        {hasFooter && sortedData.length > 0 && (
                            <tfoot
                                className={cn(
                                    "border-border-dark border-t",
                                    bare
                                        ? "bg-transparent"
                                        : "bg-background/60 backdrop-blur-md",
                                )}
                            >
                                <tr>
                                    {selectable && <td className={footCell} />}
                                    {columns.map((column) => (
                                        <td
                                            key={column.id}
                                            className={cn(
                                                footCell,
                                                alignClass[
                                                    column.align ?? "left"
                                                ],
                                            )}
                                        >
                                            {column.footer?.(sortedData)}
                                        </td>
                                    ))}
                                    {revealing && <td className={footCell} />}
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
                        <p className="micro-label tabular-nums">
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
                                    setPage((current) =>
                                        Math.max(1, current - 1),
                                    )
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

            {revealing && reveal === "panel" && (
                <Drawer
                    open={openRow !== null}
                    onOpenChange={(next) => {
                        if (!next) setOpen(null);
                    }}
                    size={panelSize}
                    label={
                        openRow && rowLabel ? rowLabel(openRow) : "Row details"
                    }
                >
                    {openRow && (
                        <>
                            <DrawerHeader>
                                <DrawerTitle>
                                    {panelTitle
                                        ? panelTitle(openRow)
                                        : rowLabel?.(openRow)}
                                </DrawerTitle>
                            </DrawerHeader>

                            <DrawerBody>{renderDetail?.(openRow)}</DrawerBody>

                            {panelFooter && (
                                <DrawerFooter>
                                    {panelFooter(openRow)}
                                </DrawerFooter>
                            )}
                        </>
                    )}
                </Drawer>
            )}
        </>
    );
}

DataTable.displayName = "DataTable";
