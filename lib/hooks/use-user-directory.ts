"use client";

import { useMemo, useState } from "react";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import { matchesUserFilters, sortUsers } from "@/lib/data/admin-users";
import type {
    ManagedUser,
    UserDirectoryFilters,
    UserSortKey,
} from "@/lib/types";

const FIRST_PAGE = 1;

const EVERY_ACCOUNT: UserDirectoryFilters = {
    query: "",
    status: "all",
    role: "all",
};

const DEFAULT_SORT: UserSortKey = "priority";

export function useUserDirectory(users: ManagedUser[]) {
    const [filters, setFilters] = useState(EVERY_ACCOUNT);
    const [sort, setSort] = useState(DEFAULT_SORT);
    const [page, setPage] = useState(FIRST_PAGE);

    const visible = useMemo(
        () =>
            sortUsers(
                users.filter((user) => matchesUserFilters(user, filters)),
                sort,
            ),
        [users, filters, sort],
    );

    const pageCount = Math.max(
        FIRST_PAGE,
        Math.ceil(visible.length / TABLE_PAGE_SIZE),
    );
    const currentPage = Math.min(page, pageCount);

    const rows = useMemo(
        () =>
            visible.slice(
                (currentPage - FIRST_PAGE) * TABLE_PAGE_SIZE,
                currentPage * TABLE_PAGE_SIZE,
            ),
        [visible, currentPage],
    );

    const filter = (change: Partial<UserDirectoryFilters>) => {
        setFilters((current) => ({ ...current, ...change }));
        setPage(FIRST_PAGE);
    };

    const changeSort = (next: UserSortKey) => {
        setSort(next);
        setPage(FIRST_PAGE);
    };

    return {
        ...filters,
        sort,
        rows,
        total: visible.length,
        page: currentPage,
        pageCount,
        filter,
        changeSort,
        setPage,
    };
}
