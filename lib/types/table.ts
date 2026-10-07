import type { ReactNode } from "react";

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
    summary?: (rows: T[]) => ReactNode;
}

export interface DataTableGroupDef {
    id: string;
    label: string;
    caption?: string;
    collapsed?: boolean;
}

export interface DataTableGrouping<T> {
    groups: DataTableGroupDef[];
    of: (row: T) => string;
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
    minWidth?: string;
    grouping?: DataTableGrouping<T>;
    className?: string;
}

export type DataTableConfig<T> = Omit<DataTableProps<T>, "data">;
