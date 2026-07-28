"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BulkToolbarProps {
    selectedCount: number;
    allSelected: boolean;
    onToggleAll: () => void;
    children: ReactNode;
    className?: string;
}

export function BulkToolbar({
    selectedCount,
    allSelected,
    onToggleAll,
    children,
    className,
}: BulkToolbarProps) {
    return (
        <div
            className={cn(
                "bg-background-muted border-border-light flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3",
                className,
            )}
        >
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onToggleAll}
                    className="text-text-secondary hover:text-accent ease-smooth text-xs font-medium transition-colors duration-200"
                >
                    {allSelected ? "Clear all" : "Select all"}
                </button>
                <span className="text-text-muted text-xs tabular-nums">
                    {selectedCount} selected
                </span>
            </div>
            <div className="flex flex-wrap gap-2">{children}</div>
        </div>
    );
}
