import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DataTable } from "@/components/patterns/data-table";
import type { DataTableColumn } from "@/lib/types";

interface Row {
    id: string;
    name: string;
    team: "open" | "closed";
    amount: number;
}

const ROWS: Row[] = [
    { id: "a", name: "Alpha", team: "open", amount: 10 },
    { id: "b", name: "Bravo", team: "closed", amount: 20 },
    { id: "c", name: "Charlie", team: "open", amount: 30 },
];

const COLUMNS: DataTableColumn<Row>[] = [
    { id: "name", label: "Name", render: (row) => row.name },
    {
        id: "amount",
        label: "Amount",
        align: "right",
        render: (row) => row.amount,
        summary: (rows) =>
            `total ${rows.reduce((sum, row) => sum + row.amount, 0)}`,
    },
];

const draw = () =>
    render(
        <DataTable
            columns={COLUMNS}
            data={ROWS}
            rowKey={(row) => row.id}
            caption="Grouped rows"
            grouping={{
                groups: [
                    { id: "open", label: "Open" },
                    { id: "closed", label: "Closed", collapsed: true },
                ],
                of: (row) => row.team,
            }}
        />,
    );

describe("DataTable grouping", () => {
    it("shows each group's rows under its own header with its subtotal", () => {
        draw();

        const open = screen.getByRole("button", { name: /^open/i });
        expect(open).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByText("Alpha")).toBeInTheDocument();
        expect(screen.getByText("total 40")).toBeInTheDocument();
    });

    it("keeps a group collapsed until its header is opened", async () => {
        draw();
        expect(screen.queryByText("Bravo")).not.toBeInTheDocument();
        expect(screen.getByText("total 20")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: /^closed/i }));

        expect(screen.getByText("Bravo")).toBeInTheDocument();
    });

    it("hides a group's rows again when its header is closed", async () => {
        draw();

        await userEvent.click(screen.getByRole("button", { name: /^open/i }));

        const table = screen.getByRole("table", { name: "Grouped rows" });
        expect(within(table).queryByText("Alpha")).not.toBeInTheDocument();
    });
});
