import { ArrowDown, ArrowUp } from "lucide-react";
import type { ColumnEmphasis } from "@/lib/types";

export const alignClass = {
    left: "text-left",
    right: "text-right",
} as const;

export const emphasisClass: Record<ColumnEmphasis, string> = {
    focal: "text-text text-xs font-semibold tabular-nums",
    value: "text-text text-xs tabular-nums",
    identity: "text-xs font-medium",
    figure: "text-xs font-medium tabular-nums",
    field: "text-xs",
    muted: "text-xs text-text-secondary",
    meta: "micro-label tabular-nums",
};

export const WIDE_CELL = "data-table-wide";

export const headCell =
    "h-9 px-3 py-0 micro-label leading-none whitespace-nowrap";

export const groupCell =
    "h-9 px-3 py-0 text-xs tabular-nums text-text-secondary bg-background-alt";

export const footCell = "h-10 px-3 py-0 text-xs font-medium tabular-nums";

export const sortIcon = {
    asc: ArrowUp,
    desc: ArrowDown,
} as const;
