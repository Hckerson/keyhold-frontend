"use client";

import { LayoutGrid, List, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: LucideIcon }[] = [
    { id: "grid", label: "Grid", icon: LayoutGrid },
    { id: "list", label: "List", icon: List },
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
            {VIEW_OPTIONS.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    onClick={() => onChange(option.id)}
                    aria-pressed={view === option.id}
                    aria-label={`${option.label} view`}
                    className={cn(
                        "ease-smooth focus-visible:ring-accent grid size-7 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                        view === option.id
                            ? "bg-background-alt text-accent border-border-light border shadow-sm"
                            : "text-text-muted hover:text-text",
                    )}
                >
                    <option.icon size={12} strokeWidth={1.5} />
                </button>
            ))}
        </div>
    );
}

SearchViewToggle.displayName = "SearchViewToggle";
