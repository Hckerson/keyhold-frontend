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
                emphasis: "muted",
                render: (row) => row.label,
            },
            {
                id: "yours",
                label: "Your Offer",
                align: "right",
                emphasis: "figure",
                render: (row) => row.yours,
            },
            {
                id: "counter",
                label: "Current Counter",
                align: "right",
                emphasis: "figure",
                render: (row) => (
                    <span className="text-accent">{row.counter}</span>
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
