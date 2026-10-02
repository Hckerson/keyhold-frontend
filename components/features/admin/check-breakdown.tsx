"use client";

import { CheckBreakdownTile } from "@/components/features/admin/check-breakdown-tile";
import type { ModerationCheckFilter } from "@/lib/data/admin-listings";
import type { CheckBreakdown as CheckBreakdownData } from "@/lib/types";

const EVERY_CHECK: ModerationCheckFilter = "all";
const GROUP_LABEL = "Filter by open compliance check";

export interface CheckBreakdownProps {
    rows: CheckBreakdownData[];
    active: ModerationCheckFilter;
    onChange: (filter: ModerationCheckFilter) => void;
}

export function CheckBreakdown({
    rows,
    active,
    onChange,
}: CheckBreakdownProps) {
    return (
        <div
            role="group"
            aria-label={GROUP_LABEL}
            className="console-split gap-2"
        >
            {rows.map((row) => (
                <CheckBreakdownTile
                    key={row.id}
                    row={row}
                    active={row.id === active}
                    onSelect={() =>
                        onChange(row.id === active ? EVERY_CHECK : row.id)
                    }
                />
            ))}
        </div>
    );
}

CheckBreakdown.displayName = "CheckBreakdown";
