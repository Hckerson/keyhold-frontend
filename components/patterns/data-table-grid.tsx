"use client";

import type { KeyboardEvent, RefObject } from "react";
import {
    DataTableBody,
    type DataTableBodyProps,
} from "@/components/patterns/data-table-body";
import { DataTableFoot } from "@/components/patterns/data-table-foot";
import { DataTableGroups } from "@/components/patterns/data-table-groups";
import { DataTableHead } from "@/components/patterns/data-table-head";
import { cn } from "@/lib/utils";
import type { DataTableGrouping, DataTableSort } from "@/lib/types";

export interface DataTableGridProps<T> {
    body: Omit<DataTableBodyProps<T>, "rows" | "isEmpty" | "header">;
    caption: string;
    bare: boolean;
    fixed: boolean;
    hasFooter: boolean;
    minWidth?: string;
    grouping?: DataTableGrouping<T>;
    sortedRows: T[];
    pageRows: T[];
    sort: DataTableSort | null;
    allOnPageSelected: boolean;
    tableRef: RefObject<HTMLTableElement | null>;
    onSort: (id: string) => void;
    onTogglePage: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLTableElement>) => void;
}

export function DataTableGrid<T>({
    body,
    caption,
    bare,
    fixed,
    hasFooter,
    minWidth,
    grouping,
    sortedRows,
    pageRows,
    sort,
    allOnPageSelected,
    tableRef,
    onSort,
    onTogglePage,
    onKeyDown,
}: DataTableGridProps<T>) {
    return (
        <div className="scroll-x">
            <table
                ref={tableRef}
                onKeyDown={onKeyDown}
                style={{ minWidth }}
                className={cn(
                    "w-full text-xs leading-tight",
                    fixed && "table-fixed",
                )}
            >
                <caption className="sr-only">{caption}</caption>

                <DataTableHead
                    columns={body.columns}
                    sort={sort}
                    onSort={onSort}
                    bare={bare}
                    selectable={body.selectable}
                    revealing={body.revealing}
                    allOnPageSelected={allOnPageSelected}
                    onTogglePage={onTogglePage}
                />

                {grouping ? (
                    <DataTableGroups
                        {...body}
                        rows={sortedRows}
                        grouping={grouping}
                    />
                ) : (
                    <DataTableBody
                        {...body}
                        rows={pageRows}
                        isEmpty={sortedRows.length === 0}
                    />
                )}

                {hasFooter && sortedRows.length > 0 && (
                    <DataTableFoot
                        columns={body.columns}
                        rows={sortedRows}
                        bare={bare}
                        selectable={body.selectable}
                        revealing={body.revealing}
                    />
                )}
            </table>
        </div>
    );
}

DataTableGrid.displayName = "DataTableGrid";
