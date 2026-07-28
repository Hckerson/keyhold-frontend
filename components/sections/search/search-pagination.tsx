"use client";

import {
    Pagination,
    PaginationList,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { SEARCH_PAGE_SIZE } from "@/lib/utils/search";

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
                    {Array.from(
                        { length: pageCount },
                        (_, index) => index + 1,
                    ).map((number) => (
                        <PaginationItem key={number}>
                            <PaginationLink
                                href="#results"
                                isActive={number === currentPage}
                                onClick={(event) => {
                                    event.preventDefault();
                                    onPageChange(number);
                                }}
                            >
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
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
