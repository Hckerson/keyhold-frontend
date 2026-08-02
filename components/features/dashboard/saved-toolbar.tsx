"use client";

import { Button } from "@/components/ui/button";
import {
    sortOptions,
    viewOptions,
    type SavedViewMode,
    type SortKey,
} from "@/lib/data/saved-listings";

export interface SavedToolbarProps {
    sort: SortKey;
    onSortChange: (sort: SortKey) => void;
    view: SavedViewMode;
    onViewChange: (view: SavedViewMode) => void;
}

export function SavedToolbar({
    sort,
    onSortChange,
    view,
    onViewChange,
}: SavedToolbarProps) {
    return (
        <div className="bg-background-muted border-border-light flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3">
            <div
                role="group"
                aria-label="Sort saved listings"
                className="flex flex-wrap items-center gap-2"
            >
                <span className="micro-label">Sort</span>
                {sortOptions.map((option) => (
                    <Button
                        key={option.value}
                        variant={sort === option.value ? "primary" : "ghost"}
                        size="sm"
                        aria-pressed={sort === option.value}
                        onClick={() => onSortChange(option.value)}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>

            <div
                role="group"
                aria-label="Change layout"
                className="flex items-center gap-2"
            >
                <span className="micro-label">View</span>
                {viewOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <Button
                            key={option.value}
                            variant={
                                view === option.value ? "primary" : "ghost"
                            }
                            size="sm"
                            aria-pressed={view === option.value}
                            onClick={() => onViewChange(option.value)}
                        >
                            <Icon
                                size={12}
                                strokeWidth={1.5}
                                className="mr-1.5"
                            />
                            {option.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

SavedToolbar.displayName = "SavedToolbar";
