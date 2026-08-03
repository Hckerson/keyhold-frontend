"use client";

import { ArrowUpDown } from "lucide-react";
import { Select } from "@/components/ui/forms/select";
import { SORT_OPTIONS, type SortValue } from "@/lib/utils/search";

export interface SearchSortSelectProps {
    value: SortValue;
    onChange: (next: SortValue) => void;
}

export function SearchSortSelect({ value, onChange }: SearchSortSelectProps) {
    return (
        <Select
            label="Sort results"
            options={SORT_OPTIONS}
            value={value}
            onChange={onChange}
            icon={ArrowUpDown}
            size="sm"
            align="end"
            className="w-44"
        />
    );
}

SearchSortSelect.displayName = "SearchSortSelect";
