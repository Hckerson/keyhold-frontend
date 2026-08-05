"use client";

import { useState } from "react";
import { MapPin, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/forms/form-field";
import { SearchFilterGroup } from "@/components/sections/search/search-filter-group";
import {
    FILTER_GROUPS,
    type FilterGroupKey,
    type SearchFilters,
} from "@/lib/config/search-filters";
import { cn } from "@/lib/utils";

const locationIcon = (
    <MapPin size={12} strokeWidth={1.5} className="text-text-muted" />
);

function seedOpenGroups(draft: SearchFilters): FilterGroupKey[] {
    const withSelection = FILTER_GROUPS.filter(
        (group) => draft[group.key].length > 0,
    ).map((group) => group.key);

    return withSelection.length > 0 ? withSelection : [FILTER_GROUPS[0].key];
}

function countSelections(draft: SearchFilters): number {
    const grouped = FILTER_GROUPS.reduce(
        (total, group) => total + draft[group.key].length,
        0,
    );

    return grouped + (draft.location.trim() ? 1 : 0);
}

export interface SearchRailProps {
    draft: SearchFilters;
    counts: Record<FilterGroupKey, Record<string, number>>;
    dirty: boolean;
    onChange: (next: SearchFilters) => void;
    onApply: () => void;
    onReset: () => void;
    className?: string;
}

export function SearchRail({
    draft,
    counts,
    dirty,
    onChange,
    onApply,
    onReset,
    className,
}: SearchRailProps) {
    const [openGroups, setOpenGroups] = useState<FilterGroupKey[]>(() =>
        seedOpenGroups(draft),
    );

    const toggleGroup = (key: FilterGroupKey) =>
        setOpenGroups((open) =>
            open.includes(key)
                ? open.filter((id) => id !== key)
                : [...open, key],
        );

    const toggleOption = (key: FilterGroupKey, optionId: string) =>
        onChange({
            ...draft,
            [key]: draft[key].includes(optionId)
                ? draft[key].filter((id) => id !== optionId)
                : [...draft[key], optionId],
        });

    const selectionCount = countSelections(draft);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onApply();
            }}
            className={cn(
                "border-border bg-background-muted flex flex-col overflow-hidden rounded-xl border shadow-sm lg:sticky lg:top-26 lg:max-h-[calc(100vh-8rem)]",
                className,
            )}
        >
            <header className="border-border-dark flex items-center justify-between gap-2 border-b px-3 py-2">
                <span className="flex items-center gap-1.5">
                    <SlidersHorizontal
                        size={12}
                        strokeWidth={1.5}
                        className="text-text-muted"
                    />
                    <h2 className="text-text text-xs font-semibold">Refine</h2>
                    {selectionCount > 0 && (
                        <span className="bg-accent-light text-accent rounded-xs px-1 font-mono text-[10px] leading-4 tabular-nums">
                            {selectionCount}
                        </span>
                    )}
                </span>

                <button
                    type="button"
                    onClick={onReset}
                    className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth inline-flex items-center gap-1 rounded-xs text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <RotateCcw size={12} strokeWidth={1.5} />
                    Reset
                </button>
            </header>

            <div className="divide-border scroll-y flex-1 divide-y">
                <div className="px-3 py-3">
                    <FormField
                        id="filter-location"
                        name="location"
                        label="Location"
                        value={draft.location}
                        onChange={(event) =>
                            onChange({ ...draft, location: event.target.value })
                        }
                        placeholder="City or neighbourhood"
                        endSlot={locationIcon}
                    />
                </div>

                {FILTER_GROUPS.map((group) => (
                    <SearchFilterGroup
                        key={group.key}
                        group={group}
                        selected={draft[group.key]}
                        counts={counts[group.key]}
                        open={openGroups.includes(group.key)}
                        onToggleOpen={() => toggleGroup(group.key)}
                        onToggleOption={(optionId) =>
                            toggleOption(group.key, optionId)
                        }
                    />
                ))}
            </div>

            <footer className="border-border-dark flex flex-col gap-1.5 border-t px-3 py-2">
                {dirty && (
                    <p className="text-highlight-dark font-mono text-[10px] tracking-wide uppercase">
                        Unapplied changes
                    </p>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="w-full"
                >
                    Apply filters
                </Button>
            </footer>
        </form>
    );
}

SearchRail.displayName = "SearchRail";
