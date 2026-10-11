import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminTransactionsConsole } from "@/components/sections/admin/admin-transactions-console";
import { transactionsAPI } from "@/lib/api/transactions";
import { ADMIN_ROUTES } from "@/lib/constants";
import { aLedgerDeal, aStage } from "@/lib/data/__fixtures__/transactions";
import { downloadCsv } from "@/lib/utils/download";

vi.mock("@/lib/api/transactions", () => ({
    transactionsAPI: { ledger: vi.fn(), stages: vi.fn() },
}));
vi.mock("@/lib/utils/download", () => ({ downloadCsv: vi.fn() }));

const address = vi.hoisted(() => {
    const listeners = new Set<() => void>();
    const state = { search: "" };
    const go = (url: string) => {
        state.search = url.split("?")[1] ?? "";
        listeners.forEach((listener) => listener());
    };
    const subscribe = (listener: () => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };
    return { state, go, subscribe };
});

vi.mock("next/navigation", async () => {
    const { useSyncExternalStore } = await import("react");
    return {
        usePathname: () => ADMIN_ROUTES.transactions,
        useRouter: () => ({ push: address.go, replace: address.go }),
        useSearchParams: () =>
            new URLSearchParams(
                useSyncExternalStore(
                    address.subscribe,
                    () => address.state.search,
                ),
            ),
    };
});

const ledgerCall = vi.mocked(transactionsAPI.ledger);
const stages = vi.mocked(transactionsAPI.stages);
const download = vi.mocked(downloadCsv);

const property = (address: string) => ({
    id: `prop_${address}`,
    title: address,
    address,
    locality: "Carmel",
    price: 1_000_000,
});

const IN_ESCROW = aLedgerDeal({
    id: "txn_escrow",
    finalPrice: 2_000_000,
    property: property("18 Cypress Point"),
});
const SETTLED = aLedgerDeal({
    id: "txn_settled",
    status: "COMPLETED",
    completedAt: "2026-09-01T00:00:00.000Z",
    property: property("4 Ridge Lane"),
});
const AWAITING = aLedgerDeal({
    id: "txn_awaiting",
    status: "PENDING",
    finalPrice: 500_000,
    property: property("9 Mill Street"),
});

const wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

const draw = () => render(<AdminTransactionsConsole />, { wrapper });

const ledger = () => screen.findByLabelText(/^Marketplace deals/);

const band = async () =>
    within(
        await screen.findByRole("region", {
            name: /^Deal volume by stage/,
        }),
    );

const stage = async (label: string) =>
    (await band()).getByRole("button", { name: new RegExp(`^${label}`) });

const shown = async () =>
    within(await ledger())
        .queryAllByRole("button", { name: /^Review / })
        .map((button) => button.getAttribute("aria-label"));

beforeEach(() => {
    address.state.search = "";
    ledgerCall.mockResolvedValue([IN_ESCROW, SETTLED, AWAITING]);
    stages.mockResolvedValue([
        aStage({ status: "PENDING", count: 1, volume: 500_000 }),
        aStage({ status: "IN_PROGRESS", count: 1, volume: 2_000_000 }),
        aStage({ status: "COMPLETED", count: 1, volume: 1_150_000 }),
    ]);
});

describe("AdminTransactionsConsole · reading the ledger", () => {
    it("asks for the whole ledger rather than one page of it", async () => {
        draw();
        await ledger();

        expect(ledgerCall).toHaveBeenCalledWith({});
    });

    it("shows the transactions fallback when the ledger fails and recovers on retry", async () => {
        ledgerCall.mockRejectedValue(new Error("ledger down"));
        draw();
        const retry = await screen.findByRole("button", { name: /^retry$/i });

        ledgerCall.mockResolvedValue([IN_ESCROW]);
        await userEvent.click(retry);

        expect(await ledger()).toBeInTheDocument();
    });

    it("says the ledger is empty rather than reporting zero in flight", async () => {
        ledgerCall.mockResolvedValue([]);
        draw();

        expect(
            await screen.findByText("No deals on the ledger yet"),
        ).toBeInTheDocument();
    });

    it("claims no deal count and no empty ledger while the ledger is loading", async () => {
        ledgerCall.mockReturnValue(new Promise(() => {}));
        draw();
        const deals = within(
            (await screen.findByRole("heading", { name: "Deals" })).closest(
                "section",
            ) as HTMLElement,
        );

        expect(deals.queryByText("0")).toBeNull();
        expect(deals.queryByText("No deals on the ledger yet")).toBeNull();
    });

    it("offers no export while the ledger is loading", async () => {
        ledgerCall.mockReturnValue(new Promise(() => {}));
        draw();

        expect(
            await screen.findByRole("button", { name: "Export" }),
        ).toBeDisabled();
    });
});

describe("AdminTransactionsConsole · the stage band", () => {
    it("counts the deals in every stage, including an empty one", async () => {
        draw();

        await waitFor(async () =>
            expect(await stage("In escrow")).toHaveTextContent("1 deal"),
        );
        expect(await stage("Cancelled")).toHaveTextContent("0 deals");
    });

    it("claims no figure in any stage when the stage counts fail to load", async () => {
        stages.mockRejectedValue(new Error("stages down"));
        draw();
        await ledger();

        await waitFor(async () => {
            for (const button of (await band()).getAllByRole("button")) {
                expect(button).toHaveTextContent("—");
                expect(button).not.toHaveTextContent("$0");
            }
        });
    });

    it("narrows the ledger to the stage that was picked and marks it pressed", async () => {
        draw();
        await ledger();

        await userEvent.click(await stage("Settled"));

        await waitFor(async () =>
            expect(await shown()).toEqual(["Review 4 Ridge Lane"]),
        );
        expect(await stage("Settled")).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("1 / 3")).toBeInTheDocument();
    });

    it("shows every deal again when the picked stage is clicked a second time", async () => {
        draw();
        await ledger();

        await userEvent.click(await stage("Settled"));
        await userEvent.click(await stage("Settled"));

        await waitFor(async () => expect(await shown()).toHaveLength(3));
        expect(await stage("Settled")).toHaveAttribute("aria-pressed", "false");
    });

    it("shows every deal again from the ledger's own reset", async () => {
        draw();
        await ledger();
        await userEvent.click(await stage("Settled"));

        await userEvent.click(
            screen.getByRole("button", { name: "Show every stage" }),
        );

        await waitFor(async () => expect(await shown()).toHaveLength(3));
        expect(
            screen.queryByRole("button", { name: "Show every stage" }),
        ).not.toBeInTheDocument();
    });

    it("says no deals sit in a stage that is empty", async () => {
        draw();
        await ledger();

        await userEvent.click(await stage("Cancelled"));

        expect(
            await screen.findByText("No deals in this stage"),
        ).toBeInTheDocument();
    });
});

describe("AdminTransactionsConsole · reviewing a deal", () => {
    it("opens the review of the deal a link points at", async () => {
        address.state.search = "transaction=txn_settled";
        draw();

        expect(
            await screen.findByRole("dialog", { name: "4 Ridge Lane" }),
        ).toBeInTheDocument();
    });

    it("puts the open review in the address and clears it on close", async () => {
        draw();
        await userEvent.click(
            within(await ledger()).getByRole("button", {
                name: "Review 18 Cypress Point",
            }),
        );
        const review = within(
            await screen.findByRole("dialog", { name: "18 Cypress Point" }),
        );
        expect(address.state.search).toBe("transaction=txn_escrow");

        await userEvent.click(review.getByRole("button", { name: "Close" }));

        await waitFor(() => expect(address.state.search).toBe(""));
    });

    it("opens the deal's review from its row", async () => {
        draw();

        await userEvent.click(
            within(await ledger()).getByRole("button", {
                name: "Review 18 Cypress Point",
            }),
        );

        expect(
            await screen.findByRole("dialog", { name: "18 Cypress Point" }),
        ).toBeInTheDocument();
    });

    it("links the review to agent payouts and closes on demand", async () => {
        draw();
        await userEvent.click(
            within(await ledger()).getByRole("button", {
                name: "Review 18 Cypress Point",
            }),
        );
        const review = within(
            await screen.findByRole("dialog", { name: "18 Cypress Point" }),
        );

        expect(
            review.getByRole("link", { name: "Agent payout" }),
        ).toHaveAttribute("href", ADMIN_ROUTES.payments);

        await userEvent.click(review.getByRole("button", { name: "Close" }));

        await waitFor(() =>
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
        );
    });
});

describe("AdminTransactionsConsole · the header", () => {
    it("links to agent payouts", async () => {
        draw();

        expect(
            await screen.findByRole("link", { name: "Payouts" }),
        ).toHaveAttribute("href", ADMIN_ROUTES.payments);
    });

    it("exports every deal on the ledger as a CSV, whatever stage is picked", async () => {
        draw();
        await ledger();
        await userEvent.click(await stage("Settled"));

        await userEvent.click(screen.getByRole("button", { name: "Export" }));

        expect(download).toHaveBeenCalledOnce();
        const [[sheet], filename] = download.mock.calls[0];
        expect(filename).toBe("transactions.csv");
        expect(sheet.columns).toContain("Reference");
        expect(sheet.rows).toHaveLength(3);
        expect(sheet.rows.map((row) => row[1])).toEqual(
            expect.arrayContaining([
                "18 Cypress Point",
                "4 Ridge Lane",
                "9 Mill Street",
            ]),
        );
    });
});
