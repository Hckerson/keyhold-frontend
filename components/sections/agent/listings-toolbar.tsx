"use client";

import { Button } from "@/components/ui/button";
import { FilterPills } from "@/components/patterns/filter-pills";
import {
    BULK_ACTIONS,
    BULK_LABELS,
    FILTERS,
    type BulkAction,
    type StatusFilter,
} from "@/lib/data/agent-listings";

const SELECTED_SUFFIX = "selected";
const CLEAR_LABEL = "Clear";

export interface ListingsToolbarProps {
    filter: StatusFilter;
    counts: Record<StatusFilter, number>;
    selectedCount: number;
    busy: boolean;
    onFilterChange: (filter: StatusFilter) => void;
    onClearSelection: () => void;
    onBulkAction: (action: BulkAction) => void;
}

export function ListingsToolbar({
    filter,
    counts,
    selectedCount,
    busy,
    onFilterChange,
    onClearSelection,
    onBulkAction,
}: ListingsToolbarProps) {
    if (selectedCount === 0) {
        return (
            <div className="flex min-h-11 flex-wrap items-center py-1.5">
                <FilterPills<StatusFilter>
                    filters={FILTERS}
                    active={filter}
                    onChange={onFilterChange}
                    counts={counts}
                />
            </div>
        );
    }

    return (
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 py-1.5">
            <p className="micro-label">
                {selectedCount} {SELECTED_SUFFIX}
            </p>
            <div className="flex flex-wrap items-center gap-2">
                {BULK_ACTIONS.map((action) => (
                    <Button
                        key={action}
                        type="button"
                        tone={action === "delete" ? "error" : "neutral"}
                        disabled={busy}
                        onClick={() => onBulkAction(action)}
                    >
                        {BULK_LABELS[action]}
                    </Button>
                ))}
                <Button
                    type="button"
                    emphasis="quiet"
                    disabled={busy}
                    onClick={onClearSelection}
                >
                    {CLEAR_LABEL}
                </Button>
            </div>
        </div>
    );
}

ListingsToolbar.displayName = "ListingsToolbar";
