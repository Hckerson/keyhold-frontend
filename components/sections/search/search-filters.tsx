"use client";

import { MapPin, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    FILTER_GROUPS,
    type FilterGroupKey,
    type SearchFilters,
} from "@/lib/config/search-filters";
import { cn } from "@/lib/utils";

const groupLegend =
    "font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted";

interface SearchFiltersPanelProps {
    draft: SearchFilters;
    counts: Record<FilterGroupKey, Record<string, number>>;
    dirty: boolean;
    onChange: (next: SearchFilters) => void;
    onApply: () => void;
    onReset: () => void;
    className?: string;
}

export function SearchFiltersPanel({
    draft,
    counts,
    dirty,
    onChange,
    onApply,
    onReset,
    className,
}: SearchFiltersPanelProps) {
    const toggle = (key: FilterGroupKey, optionId: string) => {
        const current = draft[key];
        onChange({
            ...draft,
            [key]: current.includes(optionId)
                ? current.filter((id) => id !== optionId)
                : [...current, optionId],
        });
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onApply();
            }}
            className={cn(
                "border-border bg-background-muted flex flex-col rounded-xl border shadow-sm",
                className,
            )}
        >
            <div className="border-border-dark flex items-center justify-between gap-2 border-b px-4 py-3">
                <h2 className="text-text text-xs font-semibold">
                    Refine search
                </h2>
                <button
                    type="button"
                    onClick={onReset}
                    className="text-text-secondary hover:text-accent focus-visible:ring-accent ease-smooth inline-flex items-center gap-1 rounded text-xs transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
                >
                    <RotateCcw size={12} strokeWidth={1.5} />
                    Reset
                </button>
            </div>

            <div className="flex flex-col gap-5 px-4 py-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="filter-location" className={groupLegend}>
                        Location
                    </label>
                    <Input
                        id="filter-location"
                        value={draft.location}
                        onChange={(event) =>
                            onChange({
                                ...draft,
                                location: event.target.value,
                            })
                        }
                        placeholder="City or neighbourhood"
                        endSlot={
                            <MapPin
                                size={14}
                                strokeWidth={1.5}
                                className="text-text-muted"
                            />
                        }
                    />
                </div>

                {FILTER_GROUPS.map((group) => (
                    <fieldset
                        key={group.key}
                        className="flex flex-col gap-2 border-0 p-0"
                    >
                        <legend className={groupLegend}>{group.label}</legend>
                        {group.options.map((option) => {
                            const count = counts[group.key][option.id] ?? 0;
                            const inputId = `${group.key}-${option.id}`;
                            return (
                                <div
                                    key={option.id}
                                    className="flex items-center justify-between gap-2"
                                >
                                    <Checkbox
                                        id={inputId}
                                        label={option.label}
                                        checked={draft[group.key].includes(
                                            option.id,
                                        )}
                                        onChange={() =>
                                            toggle(group.key, option.id)
                                        }
                                    />
                                    <span className="text-text-muted text-xs tabular-nums">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </fieldset>
                ))}
            </div>

            <div className="border-border-dark flex items-center gap-2 border-t px-4 py-3">
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="flex-1"
                >
                    Apply
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onReset}
                    className="flex-1"
                >
                    Clear all
                </Button>
            </div>

            {dirty && (
                <p className="text-highlight-dark border-border-dark border-t px-4 py-2 text-xs">
                    Unapplied changes — press Apply to update results.
                </p>
            )}
        </form>
    );
}

SearchFiltersPanel.displayName = "SearchFiltersPanel";
