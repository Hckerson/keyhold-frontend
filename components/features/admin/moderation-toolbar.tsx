"use client";

import { Button } from "@/components/ui/button";
import { BulkToolbar } from "@/components/patterns/bulk-toolbar";
import { FilterPills } from "@/components/patterns/filter-pills";
import {
    MODERATION_FILTERS,
    type DecisionMode,
    type ModerationFilterKey,
} from "@/lib/data/admin-listings";

export interface ModerationToolbarProps {
    filter: ModerationFilterKey;
    counts: Record<ModerationFilterKey, number>;
    onFilterChange: (key: ModerationFilterKey) => void;
    visibleIds: string[];
    selected: string[];
    onSelectedChange: (ids: string[]) => void;
    onApprove: (ids: string[]) => void;
    onDecision: (mode: DecisionMode, ids: string[]) => void;
}

export function ModerationToolbar({
    filter,
    counts,
    onFilterChange,
    visibleIds,
    selected,
    onSelectedChange,
    onApprove,
    onDecision,
}: ModerationToolbarProps) {
    const allVisibleSelected =
        visibleIds.length > 0 &&
        visibleIds.every((id) => selected.includes(id));

    const changeFilter = (key: ModerationFilterKey) => {
        onFilterChange(key);
        onSelectedChange([]);
    };

    const toggleAll = () => {
        onSelectedChange(allVisibleSelected ? [] : visibleIds);
    };

    return (
        <>
            <FilterPills
                filters={MODERATION_FILTERS}
                active={filter}
                onChange={changeFilter}
                counts={counts}
            />

            {visibleIds.length > 0 && (
                <BulkToolbar
                    selectedCount={selected.length}
                    allSelected={allVisibleSelected}
                    onToggleAll={toggleAll}
                >
                    {selected.length > 0 && (
                        <>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => onApprove(selected)}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onDecision("changes", selected)}
                            >
                                Request Changes
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDecision("reject", selected)}
                            >
                                Reject
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onSelectedChange([])}
                            >
                                Clear
                            </Button>
                        </>
                    )}
                </BulkToolbar>
            )}
        </>
    );
}
