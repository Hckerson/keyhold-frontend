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

    const {
        allOnPageSelected,
        applySelection,
        currentKeys,
        currentOpen,
        currentPage,
        firstIndex,
        onRowClick,
        onTableKeyDown,
        openRow,
        pageRows,
        selectedRows,
        setOpen,
        setPage,
        sort,
        sortedData,
        tableRef,
        toggleOpen,
        togglePage,
        toggleRow,
        toggleSort,
        totalPages,
    } = useDataTable({
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
                {selectable && selectedRows.length > 0 && (
                    <DataTableSelectionBar
                        count={selectedRows.length}
                        actions={bulkActions?.(selectedRows)}
                        onClear={() => applySelection([])}
                    />
                )}

                <div className="scroll-x">
                    <table
                        ref={tableRef}
                        onKeyDown={onTableKeyDown}
                        className={cn(
                            "w-full text-xs leading-tight",
                            fixed && "table-fixed",
                        )}
                    >
                        <caption className="sr-only">{caption}</caption>

                        <DataTableHead
                            columns={columns}
                            sort={sort}
                            onSort={toggleSort}
                            bare={bare}
                            selectable={selectable}
                            revealing={revealing}
                            allOnPageSelected={allOnPageSelected}
                            onTogglePage={togglePage}
                        />

                        <DataTableBody
                            rows={pageRows}
                            isEmpty={sortedData.length === 0}
                            emptyMessage={emptyMessage}
                            baseId={baseId}
                            rowKey={rowKey}
                            columns={columns}
                            columnCount={columnCount}
                            emphasisOf={emphasisOf}
                            selectable={selectable}
                            selectedKeys={currentKeys}
                            onToggleSelect={toggleRow}
                            revealing={revealing}
                            reveal={reveal}
                            openKey={currentOpen}
                            onToggleOpen={toggleOpen}
                            onRowClick={onRowClick}
                            rowLabel={rowLabel}
                            renderDetail={renderDetail}
                            rowClassName={rowClassName}
                        />

                        {hasFooter && sortedData.length > 0 && (
                            <DataTableFoot
                                columns={columns}
                                rows={sortedData}
                                bare={bare}
                                selectable={selectable}
                                revealing={revealing}
                            />
                        )}
                    </table>
                </div>

                {pageSize && sortedData.length > pageSize && (
                    <DataTablePager
                        firstIndex={firstIndex}
                        shownCount={pageRows.length}
                        totalCount={sortedData.length}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>

            {revealing && reveal === "panel" && (
                <DataTablePanel
                    row={openRow}
                    size={panelSize}
                    onClose={() => setOpen(null)}
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
