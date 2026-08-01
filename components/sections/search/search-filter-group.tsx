"use client";

import { ChevronDown } from "lucide-react";
import { SearchFilterChip } from "@/components/sections/search/search-filter-chip";
import type { FilterGroup } from "@/lib/config/search-filters";
import { cn } from "@/lib/utils";

export interface SearchFilterGroupProps {
    group: FilterGroup;
    selected: string[];
    counts: Record<string, number>;
    open: boolean;
    onToggleOpen: () => void;
    onToggleOption: (optionId: string) => void;
}

export function SearchFilterGroup({
    group,
    selected,
    counts,
    open,
    onToggleOpen,
    onToggleOption,
}: SearchFilterGroupProps) {
    const triggerId = `filter-${group.key}-trigger`;
    const panelId = `filter-${group.key}-panel`;

    return (
        <div className="flex flex-col">
            <button
                type="button"
                id={triggerId}
                onClick={onToggleOpen}
                aria-expanded={open}
                aria-controls={panelId}
                className="ease-smooth hover:bg-background-alt focus-visible:ring-accent flex items-center justify-between gap-2 px-3 py-2 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <span className="flex items-center gap-1.5">
                    <span className="text-text text-xs font-medium">
                        {group.label}
                    </span>
                    {selected.length > 0 && (
                        <span className="bg-accent-light text-accent rounded-xs px-1 font-mono text-[10px] leading-4 tabular-nums">
                            {selected.length}
                        </span>
                    )}
                </span>

                <ChevronDown
                    size={12}
                    strokeWidth={1.5}
                    className={cn(
                        "text-text-muted ease-smooth shrink-0 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            <div
                id={panelId}
                role="group"
                aria-labelledby={triggerId}
                className={cn(
                    "ease-smooth grid transition-all duration-300",
                    open ? "grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
                )}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-1.5 px-3 pb-3">
                        {group.options.map((option) => (
                            <SearchFilterChip
                                key={option.id}
                                label={option.label}
                                count={counts[option.id] ?? 0}
                                active={selected.includes(option.id)}
                                onToggle={() => onToggleOption(option.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

SearchFilterGroup.displayName = "SearchFilterGroup";
