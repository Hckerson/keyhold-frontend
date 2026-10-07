"use client";

import { useId } from "react";
import { DataTableGrid } from "@/components/patterns/data-table-grid";
import { DataTablePager } from "@/components/patterns/data-table-pager";
import { DataTablePanel } from "@/components/patterns/data-table-panel";
import { DataTableSelectionBar } from "@/components/patterns/data-table-selection-bar";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { cn } from "@/lib/utils";
import { tableLayout } from "@/lib/utils/table-layout";
import type { DataTableProps } from "@/lib/types";

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
    minWidth,
    grouping,
    className,
}: DataTableProps<T>) {
    const baseId = useId();
    const revealing = reveal !== undefined && renderDetail !== undefined;

    const { tableRef, ...table } = useDataTable({
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
    const layout = tableLayout({ columns, selectable, revealing });
    const body = {
        emptyMessage,
        baseId,
        rowKey,
        columns,
        columnCount: layout.columnCount,
        emphasisOf: layout.emphasisOf,
        selectable,
        selectedKeys: table.currentKeys,
        onToggleSelect: table.toggleRow,
        revealing,
        reveal,
        openKey: table.currentOpen,
        onToggleOpen: table.toggleOpen,
        onRowClick: table.onRowClick,
        rowLabel,
        renderDetail,
        rowClassName,
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

                <DataTableGrid
                    body={body}
                    caption={caption}
                    bare={bare}
                    fixed={layout.fixed}
                    hasFooter={layout.hasFooter}
                    minWidth={minWidth}
                    grouping={grouping}
                    sortedRows={table.sortedData}
                    pageRows={table.pageRows}
                    sort={table.sort}
                    allOnPageSelected={table.allOnPageSelected}
                    tableRef={tableRef}
                    onSort={table.toggleSort}
                    onTogglePage={table.togglePage}
                    onKeyDown={table.onTableKeyDown}
                />

                {!grouping &&
                    pageSize &&
                    table.sortedData.length > pageSize && (
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
