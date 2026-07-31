"use client";

import { LayoutGrid, List, type LucideIcon } from "lucide-react";
import { Select } from "@/components/ui/forms/select";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS, isSortValue, type SortValue } from "@/lib/utils/search";

export type ViewMode = "grid" | "list";

const toggleBase =
    "ease-smooth inline-flex items-center gap-1.5 px-3 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: LucideIcon }[] = [
    { id: "grid", label: "Grid", icon: LayoutGrid },
    { id: "list", label: "List", icon: List },
];

interface SearchToolbarProps {
    resultCount: number;
    totalCount: number;
    view: ViewMode;
    onViewChange: (next: ViewMode) => void;
    sort: SortValue;
    onSortChange: (next: SortValue) => void;
}

export function SearchToolbar({
    resultCount,
    totalCount,
    view,
    onViewChange,
    sort,
    onSortChange,
}: SearchToolbarProps) {
    const narrowed = resultCount < totalCount;

    return (
        <div className="border-border flex flex-wrap items-end justify-between gap-3 border-b pb-4">
            <div className="flex flex-col gap-1">
                <p className="micro-label tracking-[0.14em]">
                    {narrowed
                        ? `${resultCount} of ${totalCount} residences`
                        : "The market"}
                </p>
                <h1 className="text-h5 font-display text-text font-light tracking-tight">
                    Found {resultCount} home
                    {resultCount === 1 ? "" : "s"}
                </h1>
            </div>

            <div className="flex flex-wrap items-stretch gap-2">
                <div
                    role="group"
                    aria-label="Result layout"
                    className="border-border bg-background-muted inline-flex overflow-hidden rounded-lg border"
                >
                    {VIEW_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onViewChange(option.id)}
                            aria-pressed={view === option.id}
                            className={cn(
                                toggleBase,
                                view === option.id
                                    ? "bg-accent text-text-inverse"
                                    : "text-text-secondary hover:text-accent",
                            )}
                        >
                            <option.icon size={14} strokeWidth={1.5} />
                            {option.label}
                        </button>
                    ))}
                </div>
                <div className="w-52">
                    <Select
                        options={SORT_OPTIONS}
                        value={sort}
                        onChange={(event) => {
                            if (isSortValue(event.target.value)) {
                                onSortChange(event.target.value);
                            }
                        }}
                        aria-label="Sort results"
                    />
                </div>
            </div>
        </div>
    );
}

SearchToolbar.displayName = "SearchToolbar";
