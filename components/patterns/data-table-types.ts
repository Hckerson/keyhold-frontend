import { ArrowDown, ArrowUp } from "lucide-react";
import type { ColumnEmphasis } from "@/lib/types";

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

export const headCell = "h-9 px-3 py-0 micro-label leading-none";

export const footCell = "h-10 px-3 py-0 text-xs font-medium tabular-nums";

export const sortIcon = {
    asc: ArrowUp,
    desc: ArrowDown,
} as const;
