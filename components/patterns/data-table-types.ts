import type { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

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

export const alignClass = {
    left: "text-left",
    right: "text-right",
} as const;

export const emphasisClass: Record<ColumnEmphasis, string> = {
    focal: "text-text text-xs font-semibold tabular-nums",
    identity: "text-xs font-medium",
    figure: "text-xs font-medium tabular-nums",
    field: "text-xs",
    muted: "text-xs text-text-secondary",
    meta: "micro-label tabular-nums",
};

export const headCell = "px-3 py-2.5 micro-label leading-none";

export const footCell = "px-3 py-2.5 text-xs font-medium tabular-nums";

export const sortIcon = {
    asc: ArrowUp,
    desc: ArrowDown,
} as const;

export const INTERACTIVE = "a, button, input, label, select, textarea";
