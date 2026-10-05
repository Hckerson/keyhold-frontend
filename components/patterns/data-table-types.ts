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

export const headCell = "px-3 py-2.5 micro-label leading-none";

export const footCell = "px-3 py-2.5 text-xs font-medium tabular-nums";

export const sortIcon = {
    asc: ArrowUp,
    desc: ArrowDown,
} as const;
