"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DataTablePagerProps {
    firstIndex: number;
    shownCount: number;
    totalCount: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (next: number) => void;
}

export function DataTablePager({
    firstIndex,
    shownCount,
    totalCount,
    currentPage,
    totalPages,
    onPageChange,
}: DataTablePagerProps) {
    return (
        <nav
            aria-label="Table pagination"
            className="border-border-dark flex items-center justify-between gap-3 border-t px-3 py-2"
        >
            <p className="micro-label tabular-nums">
                {firstIndex + 1}–{firstIndex + shownCount} of {totalCount}
            </p>
            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    iconOnly
                    aria-label="Previous page"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                >
                    <ChevronLeft size={12} strokeWidth={1.5} />
                </Button>
                <span className="text-text-secondary text-xs tabular-nums">
                    {currentPage} / {totalPages}
                </span>
                <Button
                    variant="secondary"
                    size="sm"
                    iconOnly
                    aria-label="Next page"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                >
                    <ChevronRight size={12} strokeWidth={1.5} />
                </Button>
            </div>
        </nav>
    );
}

DataTablePager.displayName = "DataTablePager";
