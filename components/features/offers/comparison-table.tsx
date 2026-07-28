"use client";

import { useState } from "react";
import type { ComparisonRow } from "@/lib/data/offer-details";

export interface ComparisonTableProps {
    rows: ComparisonRow[];
}

export function ComparisonTable({ rows }: ComparisonTableProps) {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-md border-collapse text-left">
                <thead>
                    <tr className="border-border-dark border-b">
                        <th className="micro-label px-3 py-2">Term</th>
                        <th className="micro-label px-3 py-2">Your Offer</th>
                        <th className="micro-label px-3 py-2">
                            Current Counter
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => {
                        const isExpanded = expanded === row.key;
                        return (
                            <tr
                                key={row.key}
                                onClick={() =>
                                    setExpanded(isExpanded ? null : row.key)
                                }
                                className="border-border-light hover:bg-background-alt ease-smooth cursor-pointer border-b align-top transition-colors"
                            >
                                <td className="text-text-secondary px-3 py-2 text-xs">
                                    {row.label}
                                    {isExpanded && (
                                        <span className="text-text-muted mt-1 block text-xs">
                                            {row.detail}
                                        </span>
                                    )}
                                </td>
                                <td className="text-text px-3 py-2 text-xs font-medium tabular-nums">
                                    {row.yours}
                                </td>
                                <td className="text-accent px-3 py-2 text-xs font-medium tabular-nums">
                                    {row.counter}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
