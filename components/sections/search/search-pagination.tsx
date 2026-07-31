"use client";

import {
    Pagination,
    PaginationList,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { SEARCH_PAGE_SIZE } from "@/lib/utils/search";

const EDGE_PAGES = 1;
const SIBLING_PAGES = 1;
const MAX_INLINE_PAGES = 7;

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

interface SearchPaginationProps {
    currentPage: number;
    pageCount: number;
    visibleCount: number;
    resultCount: number;
    onPageChange: (next: number) => void;
}

export function SearchPagination({
    currentPage,
    pageCount,
    visibleCount,
    resultCount,
    onPageChange,
}: SearchPaginationProps) {
    const firstIndex = (currentPage - 1) * SEARCH_PAGE_SIZE + 1;

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-text-muted text-xs tabular-nums">
                Showing {firstIndex}–{firstIndex + visibleCount - 1} of{" "}
                {resultCount}
            </p>

            <Pagination>
                <PaginationList>
                    <PaginationItem>
                        <PaginationLink
                            href="#results"
                            aria-disabled={currentPage === 1}
                            onClick={(event) => {
                                event.preventDefault();
                                onPageChange(currentPage - 1);
                            }}
                        >
                            Previous
                        </PaginationLink>
                    </PaginationItem>
                    {buildPageSlots(currentPage, pageCount).map((slot) =>
                        typeof slot === "number" ? (
                            <PaginationItem key={slot}>
                                <PaginationLink
                                    href="#results"
                                    isActive={slot === currentPage}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onPageChange(slot);
                                    }}
                                >
                                    {slot}
                                </PaginationLink>
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={slot}>
                                <span
                                    aria-hidden="true"
                                    className="text-text-muted px-2 text-xs"
                                >
                                    &hellip;
                                </span>
                            </PaginationItem>
                        ),
                    )}
                    <PaginationItem>
                        <PaginationLink
                            href="#results"
                            aria-disabled={currentPage === pageCount}
                            onClick={(event) => {
                                event.preventDefault();
                                onPageChange(currentPage + 1);
                            }}
                        >
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </PaginationList>
            </Pagination>
        </div>
    );
}

SearchPagination.displayName = "SearchPagination";
