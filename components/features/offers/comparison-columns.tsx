"use client";

import type { DataTableConfig } from "@/components/patterns/data-table";
import type { ComparisonRow } from "@/lib/data/offer-details";

export function buildComparisonConfig(): DataTableConfig<ComparisonRow> {
    return {
        variant: "bare",
        columns: [
            {
                id: "term",
                label: "Term",
                render: (row) => (
                    <span className="text-text-secondary text-xs">
                        {row.label}
                    </span>
                ),
            },
            {
                id: "yours",
                label: "Your Offer",
                align: "right",
                render: (row) => (
                    <span className="text-text text-xs font-medium tabular-nums">
                        {row.yours}
                    </span>
                ),
            },
            {
                id: "counter",
                label: "Current Counter",
                align: "right",
                render: (row) => (
                    <span className="text-accent text-xs font-medium tabular-nums">
                        {row.counter}
                    </span>
                ),
            },
        ],
        rowKey: (row) => row.key,
        rowLabel: (row) => row.label,
        caption: "Offer terms compared against the current counter",
        emptyMessage: "No terms to compare",
        reveal: "inline",
        renderDetail: (row) => (
            <p className="text-text-muted text-xs leading-relaxed">
                {row.detail}
            </p>
        ),
    };
}
