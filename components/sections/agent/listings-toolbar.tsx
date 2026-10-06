"use client";

import { Button } from "@/components/ui/button";
import { FilterPills } from "@/components/patterns/filter-pills";
import {
    BULK_ACTIONS,
    BULK_LABELS,
    type BulkAction,
} from "@/lib/config/listing-bulk";
import { FILTERS, allowsBulk } from "@/lib/data/agent-listings";
import type { ListingStatusFilter, ManagedListing } from "@/lib/types";

const SELECTED_SUFFIX = "selected";
const CLEAR_LABEL = "Clear";

export interface ListingsToolbarProps {
    filter: ListingStatusFilter;
    counts: Record<ListingStatusFilter, number>;
    selected: ManagedListing[];
    busy: boolean;
    onFilterChange: (filter: ListingStatusFilter) => void;
    onClearSelection: () => void;
    onBulkAction: (action: BulkAction) => void;
}

export function ListingsToolbar({
    filter,
    counts,
    selected,
    busy,
    onFilterChange,
    onClearSelection,
    onBulkAction,
}: ListingsToolbarProps) {
    if (selected.length === 0) {
        return (
            <div className="flex min-h-11 flex-wrap items-center py-1.5">
                <FilterPills<ListingStatusFilter>
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
                {selected.length} {SELECTED_SUFFIX}
            </p>
            <div className="flex flex-wrap items-center gap-2">
                {BULK_ACTIONS.map((action) => (
                    <Button
                        key={action}
                        type="button"
                        tone={action === "delete" ? "error" : "neutral"}
                        disabled={
                            busy ||
                            !selected.some((listing) =>
                                allowsBulk(listing, action),
                            )
                        }
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
