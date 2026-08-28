"use client";

import { useId } from "react";
import { DataTableBody } from "@/components/patterns/data-table-body";
import { DataTableFoot } from "@/components/patterns/data-table-foot";
import { DataTableHead } from "@/components/patterns/data-table-head";
import { DataTablePager } from "@/components/patterns/data-table-pager";
import { DataTablePanel } from "@/components/patterns/data-table-panel";
import { DataTableSelectionBar } from "@/components/patterns/data-table-selection-bar";
import type {
    ColumnEmphasis,
    DataTableColumn,
    DataTableProps,
} from "@/components/patterns/data-table-types";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { cn } from "@/lib/utils";

export type {
    ColumnEmphasis,
    DataTableColumn,
    DataTableConfig,
    DataTableProps,
    DataTableSort,
    RevealMode,
    SortDirection,
} from "@/components/patterns/data-table-types";

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
    const revealing = reveal !== undefined && renderDetail !== undefined;

    const table = useDataTable({
        columns,
        data,
        rowKey,
        defaultSort,
        pageSize,
        selectedKeys,
        onSelectedKeysChange,
        openKey,
        onOpenChange,
        revealing,
    });

    const bare = variant === "bare";
    const fixed = columns.some((column) => column.width);
    const hasFooter = columns.some((column) => column.footer);
    const columnCount =
        columns.length + (selectable ? 1 : 0) + (revealing ? 1 : 0);

    const focalColumnId = columns.find(
        (column) => column.emphasis === "focal",
    )?.id;

    const emphasisOf = (column: DataTableColumn<T>): ColumnEmphasis => {
        const declared = column.emphasis ?? "field";
        if (declared === "focal" && column.id !== focalColumnId)
            return "figure";
        return declared;
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
                {selectable && table.selectedRows.length > 0 && (
                    <DataTableSelectionBar
                        count={table.selectedRows.length}
                        actions={bulkActions?.(table.selectedRows)}
                        onClear={() => table.applySelection([])}
                    />
                )}

                <div className="scroll-x">
                    <table
                        ref={table.tableRef}
                        onKeyDown={table.onTableKeyDown}
                        className={cn(
                            "w-full text-xs leading-tight",
                            fixed && "table-fixed",
                        )}
                    >
                        <caption className="sr-only">{caption}</caption>

                        <DataTableHead
                            columns={columns}
                            sort={table.sort}
                            onSort={table.toggleSort}
                            bare={bare}
                            selectable={selectable}
                            revealing={revealing}
                            allOnPageSelected={table.allOnPageSelected}
                            onTogglePage={table.togglePage}
                        />

                        <DataTableBody
                            rows={table.pageRows}
                            isEmpty={table.sortedData.length === 0}
                            emptyMessage={emptyMessage}
                            baseId={baseId}
                            rowKey={rowKey}
                            columns={columns}
                            columnCount={columnCount}
                            emphasisOf={emphasisOf}
                            selectable={selectable}
                            selectedKeys={table.currentKeys}
                            onToggleSelect={table.toggleRow}
                            revealing={revealing}
                            reveal={reveal}
                            openKey={table.currentOpen}
                            onToggleOpen={table.toggleOpen}
                            onRowClick={table.onRowClick}
                            rowLabel={rowLabel}
                            renderDetail={renderDetail}
                            rowClassName={rowClassName}
                        />

                        {hasFooter && table.sortedData.length > 0 && (
                            <DataTableFoot
                                columns={columns}
                                rows={table.sortedData}
                                bare={bare}
                                selectable={selectable}
                                revealing={revealing}
                            />
                        )}
                    </table>
                </div>

                {pageSize && table.sortedData.length > pageSize && (
                    <DataTablePager
                        firstIndex={table.firstIndex}
                        shownCount={table.pageRows.length}
                        totalCount={table.sortedData.length}
                        currentPage={table.currentPage}
                        totalPages={table.totalPages}
                        onPageChange={table.setPage}
                    />
                )}
            </div>

            {revealing && reveal === "panel" && (
                <DataTablePanel
                    row={table.openRow}
                    size={panelSize}
                    onClose={() => table.setOpen(null)}
                    rowLabel={rowLabel}
                    panelTitle={panelTitle}
                    panelFooter={panelFooter}
                    renderDetail={renderDetail}
                />
            )}
        </>
    );
}

DataTable.displayName = "DataTable";
