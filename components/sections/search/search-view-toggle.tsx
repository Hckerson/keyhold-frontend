"use client";

import { LayoutGrid, List, MapIcon, type LucideIcon } from "lucide-react";
import { m } from "motion/react";
import { FAST } from "@/lib/config/motion";
import { cn } from "@/lib/utils";

import type { SearchViewMode } from "@/lib/utils/search-url";

export type ViewMode = SearchViewMode;

const VIEW_INDICATOR_ID = "search-view-indicator";

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: LucideIcon }[] = [
    { id: "grid", label: "Grid", icon: LayoutGrid },
    { id: "list", label: "List", icon: List },
    { id: "map", label: "Map", icon: MapIcon },
];

export interface SearchViewToggleProps {
    view: ViewMode;
    onChange: (next: ViewMode) => void;
}

export function SearchViewToggle({ view, onChange }: SearchViewToggleProps) {
    return (
        <div
            role="group"
            aria-label="Result layout"
            className="border-border bg-background-muted inline-flex h-8 shrink-0 items-center gap-0.5 rounded-lg border p-0.5"
        >
            {VIEW_OPTIONS.map((option) => {
                const active = view === option.id;

                return (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => onChange(option.id)}
                        aria-pressed={active}
                        aria-label={`${option.label} view`}
                        className={cn(
                            "ease-smooth focus-visible:ring-accent relative grid size-7 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                            active
                                ? "text-accent"
                                : "text-text-muted hover:text-text",
                        )}
                    >
                        {active && (
                            <m.span
                                layoutId={VIEW_INDICATOR_ID}
                                transition={FAST}
                                aria-hidden="true"
                                className="bg-background-alt border-border-light absolute inset-0 rounded-md border shadow-sm"
                            />
                        )}
                        <option.icon
                            size={12}
                            strokeWidth={1.5}
                            className="relative"
                        />
                    </button>
                );
            })}
        </div>
    );
}

SearchViewToggle.displayName = "SearchViewToggle";
