"use client";

import { useState } from "react";
import {
    DataTableBody,
    type DataTableBodyProps,
} from "@/components/patterns/data-table-body";
import { DataTableGroupRow } from "@/components/patterns/data-table-group-row";
import type { DataTableGrouping } from "@/lib/types";

export interface DataTableGroupsProps<T> extends Omit<
    DataTableBodyProps<T>,
    "rows" | "header" | "isEmpty"
> {
    rows: T[];
    grouping: DataTableGrouping<T>;
}

export function DataTableGroups<T>({
    rows,
    grouping,
    ...body
}: DataTableGroupsProps<T>) {
    const [collapsed, setCollapsed] = useState(
        () =>
            new Set(
                grouping.groups
                    .filter((group) => group.collapsed)
                    .map((group) => group.id),
            ),
    );

    const toggle = (id: string) =>
        setCollapsed((current) => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    return grouping.groups.map((group) => {
        const members = rows.filter((row) => grouping.of(row) === group.id);
        if (members.length === 0) return null;
        const open = !collapsed.has(group.id);

        return (
            <DataTableBody
                key={group.id}
                {...body}
                rows={open ? members : []}
                isEmpty={false}
                header={
                    <DataTableGroupRow
                        group={group}
                        rows={members}
                        columns={body.columns}
                        open={open}
                        selectable={body.selectable}
                        revealing={body.revealing}
                        onToggle={() => toggle(group.id)}
                    />
                }
            />
        );
    });
}

DataTableGroups.displayName = "DataTableGroups";
