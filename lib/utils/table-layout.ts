import type { ColumnEmphasis, DataTableColumn } from "@/lib/types";

interface TableLayoutInput<T> {
    columns: DataTableColumn<T>[];
    selectable: boolean;
    revealing: boolean;
}

export const tableLayout = <T>({
    columns,
    selectable,
    revealing,
}: TableLayoutInput<T>) => {
    const focalColumnId = columns.find(
        (column) => column.emphasis === "focal",
    )?.id;

    const emphasisOf = (column: DataTableColumn<T>): ColumnEmphasis => {
        const declared = column.emphasis ?? "field";
        if (declared === "focal" && column.id !== focalColumnId)
            return "figure";
        return declared;
    };

    return {
        fixed: columns.some((column) => column.width),
        hasFooter: columns.some((column) => column.footer),
        columnCount:
            columns.length + (selectable ? 1 : 0) + (revealing ? 1 : 0),
        emphasisOf,
    };
};
