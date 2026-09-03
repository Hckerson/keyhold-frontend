"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export interface DataTableSelectionBarProps {
    count: number;
    actions?: ReactNode;
    onClear: () => void;
}

export function DataTableSelectionBar({
    count,
    actions,
    onClear,
}: DataTableSelectionBarProps) {
    return (
        <div className="border-border-dark bg-background-alt flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
            <p
                aria-live="polite"
                className="text-text text-xs font-medium tabular-nums"
            >
                {count} selected
            </p>
            <div className="flex flex-wrap items-center gap-2">
                {actions}
                <Button variant="ghost" size="sm" onClick={onClear}>
                    Clear
                </Button>
            </div>
        </div>
    );
}

DataTableSelectionBar.displayName = "DataTableSelectionBar";
