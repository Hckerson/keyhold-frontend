"use client";

import { useCallback, useMemo, useState } from "react";
import { useRevealNavigation } from "@/lib/hooks/use-reveal-navigation";
import type { DataTableColumn, DataTableSort } from "@/lib/types";

function compare(a: string | number, b: string | number) {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b));
}

interface DataTableStateInput<T> {
    columns: DataTableColumn<T>[];
    data: T[];
    rowKey: (row: T) => string;
    defaultSort?: DataTableSort;
    pageSize?: number;
    selectedKeys?: string[];
    onSelectedKeysChange?: (keys: string[]) => void;
    openKey?: string | null;
    onOpenChange?: (key: string | null) => void;
    revealing: boolean;
}

export function useDataTable<T>({
    columns,
    data,
    rowKey,
    defaultSort,
    pageSize,
    selectedKeys,
    onSelectedKeysChange,
    openKey,
    onOpenChange,
    revealing,
}: DataTableStateInput<T>) {
    const [sort, setSort] = useState<DataTableSort | null>(defaultSort ?? null);
    const [internalKeys, setInternalKeys] = useState<string[]>([]);
    const [internalOpen, setInternalOpen] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const controlledSelection = selectedKeys !== undefined;
    const currentKeys = controlledSelection ? selectedKeys : internalKeys;

    const controlledOpen = openKey !== undefined;
    const currentOpen = controlledOpen ? openKey : internalOpen;

    const setOpen = useCallback(
        (next: string | null) => {
            if (!controlledOpen) setInternalOpen(next);
            onOpenChange?.(next);
        },
        [controlledOpen, onOpenChange],
    );

    const sortedData = useMemo(() => {
        const column = columns.find((item) => item.id === sort?.id);
        const sortValue = column?.sortValue;
        if (!sort || !sortValue) return data;
        return [...data].sort((a, b) => {
            const result = compare(sortValue(a), sortValue(b));
            return sort.direction === "asc" ? result : -result;
        });
    }, [columns, data, sort]);

    const totalPages = pageSize
        ? Math.max(1, Math.ceil(sortedData.length / pageSize))
        : 1;
    const currentPage = Math.min(page, totalPages);
    const firstIndex = pageSize ? (currentPage - 1) * pageSize : 0;
    const pageRows = pageSize
        ? sortedData.slice(firstIndex, firstIndex + pageSize)
        : sortedData;

    const selectedRows = sortedData.filter((row) =>
        currentKeys.includes(rowKey(row)),
    );
    const allOnPageSelected =
        pageRows.length > 0 &&
        pageRows.every((row) => currentKeys.includes(rowKey(row)));

    const openRow =
        sortedData.find((row) => rowKey(row) === currentOpen) ?? null;

    const applySelection = (keys: string[]) => {
        if (!controlledSelection) setInternalKeys(keys);
        onSelectedKeysChange?.(keys);
    };

    const toggleSort = (id: string) => {
        setSort((current) =>
            current?.id === id
                ? {
                      id,
                      direction: current.direction === "asc" ? "desc" : "asc",
                  }
                : { id, direction: "asc" },
        );
        setPage(1);
    };

    const toggleRow = (key: string) => {
        applySelection(
            currentKeys.includes(key)
                ? currentKeys.filter((item) => item !== key)
                : [...currentKeys, key],
        );
    };

    const togglePage = () => {
        const pageKeys = pageRows.map(rowKey);
        applySelection(
            allOnPageSelected
                ? currentKeys.filter((key) => !pageKeys.includes(key))
                : [...new Set([...currentKeys, ...pageKeys])],
        );
    };

    const toggleOpen = (key: string) =>
        setOpen(currentOpen === key ? null : key);

    const navigation = useRevealNavigation({
        revealing,
        currentOpen,
        setOpen,
        toggleOpen,
    });

    return {
        ...navigation,
        sort,
        sortedData,
        pageRows,
        currentKeys,
        selectedRows,
        allOnPageSelected,
        currentOpen,
        openRow,
        currentPage,
        totalPages,
        firstIndex,
        setPage,
        setOpen,
        applySelection,
        toggleSort,
        toggleRow,
        togglePage,
        toggleOpen,
    };
}
