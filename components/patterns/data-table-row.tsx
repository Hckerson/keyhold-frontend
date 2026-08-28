"use client";

import { Fragment, type MouseEvent, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/forms/checkbox";
import {
    alignClass,
    emphasisClass,
    type ColumnEmphasis,
    type DataTableColumn,
    type RevealMode,
} from "@/components/patterns/data-table-types";
import { cn } from "@/lib/utils";

export interface DataTableRowProps<T> {
    row: T;
    rowId: string;
    detailId: string;
    columns: DataTableColumn<T>[];
    columnCount: number;
    emphasisOf: (column: DataTableColumn<T>) => ColumnEmphasis;
    selectable: boolean;
    selected: boolean;
    onToggleSelect: (key: string) => void;
    revealing: boolean;
    reveal?: RevealMode;
    open: boolean;
    onToggleOpen: (key: string) => void;
    onRowClick: (event: MouseEvent<HTMLTableRowElement>, key: string) => void;
    rowLabel?: (row: T) => string;
    renderDetail?: (row: T) => ReactNode;
    rowClassName?: (row: T) => string | undefined;
}

export function DataTableRow<T>({
    row,
    rowId,
    detailId,
    columns,
    columnCount,
    emphasisOf,
    selectable,
    selected,
    onToggleSelect,
    revealing,
    reveal,
    open,
    onToggleOpen,
    onRowClick,
    rowLabel,
    renderDetail,
    rowClassName,
}: DataTableRowProps<T>) {
    return (
        <Fragment>
            <tr
                onClick={(event) => onRowClick(event, rowId)}
                className={cn(
                    "ease-smooth transition-colors duration-200",
                    revealing && "cursor-pointer",
                    open ? "bg-background-alt" : "hover:bg-background-alt/60",
                    rowClassName?.(row),
                )}
            >
                {selectable && (
                    <td className="px-3 py-2">
                        <Checkbox
                            aria-label={`Select row ${rowId}`}
                            checked={selected}
                            onChange={() => onToggleSelect(rowId)}
                        />
                    </td>
                )}

                {columns.map((column) => (
                    <td
                        key={column.id}
                        className={cn(
                            "px-3 py-2",
                            emphasisClass[emphasisOf(column)],
                            alignClass[column.align ?? "left"],
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
                            onClick={() => onToggleOpen(rowId)}
                            aria-expanded={
                                reveal === "inline" ? open : undefined
                            }
                            aria-controls={
                                reveal === "inline" ? detailId : undefined
                            }
                            aria-haspopup={
                                reveal === "panel" ? "dialog" : undefined
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
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                    className={cn(
                                        "ease-smooth transition-transform duration-200",
                                        open && "rotate-180",
                                    )}
                                />
                            ) : (
                                <ChevronRight
                                    size={12}
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </td>
                )}
            </tr>

            {open && reveal === "inline" && (
                <tr id={detailId} className="bg-background-alt">
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
}

DataTableRow.displayName = "DataTableRow";
