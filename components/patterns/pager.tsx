"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EDGE_PAGES = 1;
const SIBLING_PAGES = 1;
const MAX_INLINE_PAGES = 7;

const pagerBase =
    "ease-smooth focus-visible:ring-accent inline-flex h-7 items-center justify-center rounded-md border text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40";

const pagerIdle =
    "border-border bg-background text-text-secondary hover:border-border-dark hover:text-text";

const pagerActive = "border-accent bg-accent text-text-inverse font-medium";

type PageSlot = number | "gap-start" | "gap-end";

function buildPageSlots(currentPage: number, pageCount: number): PageSlot[] {
    if (pageCount <= MAX_INLINE_PAGES) {
        return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const first = 1;
    const last = pageCount;
    const start = Math.max(first + EDGE_PAGES, currentPage - SIBLING_PAGES);
    const end = Math.min(last - EDGE_PAGES, currentPage + SIBLING_PAGES);

    const slots: PageSlot[] = [first];
    if (start > first + EDGE_PAGES) slots.push("gap-start");
    for (let page = start; page <= end; page += 1) slots.push(page);
    if (end < last - EDGE_PAGES) slots.push("gap-end");
    slots.push(last);

    return slots;
}

export interface PagerProps {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    visibleCount: number;
    totalCount: number;
    onPageChange: (next: number) => void;
    className?: string;
}

export function Pager({
    currentPage,
    pageCount,
    pageSize,
    visibleCount,
    totalCount,
    onPageChange,
    className,
}: PagerProps) {
    const firstIndex = (currentPage - 1) * pageSize + 1;
    const lastIndex = firstIndex + visibleCount - 1;

    return (
        <div
            className={cn(
                "flex flex-wrap items-center justify-between gap-2",
                className,
            )}
        >
            <p className="micro-label tabular-nums">
                Showing {firstIndex}&ndash;{lastIndex} of {totalCount}
            </p>

            <nav aria-label="Pagination" className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className={cn(pagerBase, pagerIdle, "size-7")}
                >
                    <ChevronLeft size={12} strokeWidth={1.5} />
                </button>

                {buildPageSlots(currentPage, pageCount).map((slot) =>
                    typeof slot === "number" ? (
                        <button
                            key={slot}
                            type="button"
                            onClick={() => onPageChange(slot)}
                            aria-current={
                                slot === currentPage ? "page" : undefined
                            }
                            className={cn(
                                pagerBase,
                                "min-w-7 px-1.5 tabular-nums",
                                slot === currentPage ? pagerActive : pagerIdle,
                            )}
                        >
                            {slot}
                        </button>
                    ) : (
                        <span
                            key={slot}
                            aria-hidden="true"
                            className="text-text-muted px-0.5 font-mono text-[10px]"
                        >
                            &hellip;
                        </span>
                    ),
                )}

                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    aria-label="Next page"
                    className={cn(pagerBase, pagerIdle, "size-7")}
                >
                    <ChevronRight size={12} strokeWidth={1.5} />
                </button>
            </nav>
        </div>
    );
}

Pager.displayName = "Pager";
