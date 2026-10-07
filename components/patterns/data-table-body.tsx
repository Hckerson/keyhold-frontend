"use client";

import type { MouseEvent, ReactNode } from "react";
import { DataTableRow } from "@/components/patterns/data-table-row";
import type { ColumnEmphasis, DataTableColumn, RevealMode } from "@/lib/types";

export interface DataTableBodyProps<T> {
    rows: T[];
    isEmpty: boolean;
    emptyMessage: string;
    baseId: string;
    rowKey: (row: T) => string;
    columns: DataTableColumn<T>[];
    columnCount: number;
    emphasisOf: (column: DataTableColumn<T>) => ColumnEmphasis;
    selectable: boolean;
    selectedKeys: string[];
    onToggleSelect: (key: string) => void;
    revealing: boolean;
    reveal?: RevealMode;
    openKey: string | null;
    onToggleOpen: (key: string) => void;
    onRowClick: (event: MouseEvent<HTMLTableRowElement>, key: string) => void;
    rowLabel?: (row: T) => string;
    renderDetail?: (row: T) => ReactNode;
    rowClassName?: (row: T) => string | undefined;
    header?: ReactNode;
}

export function DataTableBody<T>({
    rows,
    isEmpty,
    emptyMessage,
    baseId,
    rowKey,
    columns,
    columnCount,
    emphasisOf,
    selectable,
    selectedKeys,
    onToggleSelect,
    revealing,
    reveal,
    openKey,
    onToggleOpen,
    onRowClick,
    rowLabel,
    renderDetail,
    rowClassName,
    header,
}: DataTableBodyProps<T>) {
    return (
        <tbody className="divide-border-light divide-y">
            {header}
            {rows.map((row) => {
                const key = rowKey(row);

                return (
                    <DataTableRow
                        key={key}
                        row={row}
                        rowId={key}
                        detailId={`${baseId}-${key}`}
                        columns={columns}
                        columnCount={columnCount}
                        emphasisOf={emphasisOf}
                        selectable={selectable}
                        selected={selectedKeys.includes(key)}
                        onToggleSelect={onToggleSelect}
                        revealing={revealing}
                        reveal={reveal}
                        open={revealing && key === openKey}
                        onToggleOpen={onToggleOpen}
                        onRowClick={onRowClick}
                        rowLabel={rowLabel}
                        renderDetail={renderDetail}
                        rowClassName={rowClassName}
                    />
                );
            })}

            {isEmpty && (
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
    );
}

DataTableBody.displayName = "DataTableBody";
