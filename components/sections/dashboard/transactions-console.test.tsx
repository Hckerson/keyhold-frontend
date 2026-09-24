import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TransactionsConsole } from "@/components/sections/dashboard/transactions-console";
import { escrowAPI } from "@/lib/api/escrow";
import { transactionsAPI } from "@/lib/api/transactions";
import {
    aTransaction,
    anEscrowHold,
    anEscrowRelease,
} from "@/lib/data/__fixtures__/purchases";
import type { EscrowRelease } from "@/lib/validations/escrow";

vi.mock("@/lib/api/escrow", () => ({ escrowAPI: { release: vi.fn() } }));
vi.mock("@/lib/api/transactions", () => ({
    transactionsAPI: { purchases: vi.fn() },
}));

const release = vi.mocked(escrowAPI.release);
const purchases = vi.mocked(transactionsAPI.purchases);

const RELEASED = anEscrowRelease();

const deferred = () => {
    let settle: (value: EscrowRelease) => void = () => {};
    let fail: (reason: Error) => void = () => {};
    const promise = new Promise<EscrowRelease>((resolve, reject) => {
        settle = resolve;
        fail = reject;
    });
    return { promise, settle, fail };
};

const held = aTransaction();

const secondHeld = aTransaction({
    id: "txn_2",
    escrowHoldId: "esc_2",
    escrowHold: anEscrowHold({ id: "esc_2" }),
    property: {
        id: "prop_2",
        title: "Ridge House",
        price: 800_000,
        address: "4 Ridge House",
        locality: "Sonoma",
        status: "AVAILABLE",
        images: [],
    },
});

const wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

const draw = () => render(<TransactionsConsole />, { wrapper });

const releaseButtons = async () => {
    const table = await screen.findByRole("table", { hidden: true });
    return within(table).getAllByRole("button", {
        name: /release funds/i,
        hidden: true,
    });
};

const dialog = () => screen.getByRole("dialog");

const confirmButton = () =>
    within(dialog()).getByRole("button", { name: /release funds/i });

beforeEach(() => {
    purchases.mockResolvedValue([held]);
    release.mockResolvedValue(RELEASED);
});

describe("TransactionsConsole · reading the ledger", () => {
    it("1.6 renders the empty state, not an error, when there is nothing to show", async () => {
        purchases.mockResolvedValue([]);
        draw();

        expect(
            await screen.findByText(/no purchases yet/i),
        ).toBeInTheDocument();
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("5.5 renders the transactions fallback and retries when the load fails", async () => {
        purchases.mockRejectedValue(new Error("service down"));
        draw();

        expect(
            await screen.findByText(/couldn't load your purchases/i),
        ).toBeInTheDocument();

        purchases.mockResolvedValue([held]);
        await userEvent.click(screen.getByRole("button", { name: /^retry$/i }));

        expect(await screen.findByRole("table")).toBeInTheDocument();
    });
});

describe("TransactionsConsole · releasing", () => {
    it("3.1 opens the confirmation instead of calling the API", async () => {
        draw();
        const [button] = await releaseButtons();

        await userEvent.click(button);

        expect(dialog()).toBeInTheDocument();
        expect(release).not.toHaveBeenCalled();
    });

    it("3.2 names the property, the held amount and the window", async () => {
        draw();
        await userEvent.click((await releaseButtons())[0]);

        const modal = within(dialog());
        expect(modal.getByText(/18 Cypress Point/)).toBeInTheDocument();
        expect(modal.getByText("$1,200,000")).toBeInTheDocument();
        expect(modal.getByText(/left|window closed/i)).toBeInTheDocument();
    });

    it("3.3 warns that the release cannot be undone", async () => {
        draw();
        await userEvent.click((await releaseButtons())[0]);

        expect(
            within(dialog()).getByText(/cannot be undone/i),
        ).toBeInTheDocument();
    });

    it("3.4 releases by the escrow id, not the transaction id", async () => {
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());

        await waitFor(() =>
            expect(release).toHaveBeenCalledExactlyOnceWith("esc_1"),
        );
    });

    it("3.5 fires exactly once however many times confirm is pressed", async () => {
        const pending = deferred();
        release.mockReturnValue(pending.promise);
        draw();
        await userEvent.click((await releaseButtons())[0]);

        const confirm = confirmButton();
        await userEvent.click(confirm);
        await userEvent.click(confirm);
        await userEvent.click(confirm);

        pending.settle(RELEASED);
        await waitFor(() => expect(release).toHaveBeenCalledTimes(1));
    });

    it("3.6 calls nothing when the confirmation is dismissed", async () => {
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(
            within(dialog()).getByRole("button", { name: /keep it held/i }),
        );

        expect(release).not.toHaveBeenCalled();
    });
});

describe("TransactionsConsole · while a release is in flight", () => {
    it("4.1 disables the confirm control for the duration", async () => {
        const pending = deferred();
        release.mockReturnValue(pending.promise);
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());

        await waitFor(() => expect(confirmButton()).toBeDisabled());

        pending.settle(RELEASED);
    });

    it("4.2 keeps the row's release control disabled for the duration", async () => {
        const pending = deferred();
        release.mockReturnValue(pending.promise);
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());

        await waitFor(async () =>
            expect((await releaseButtons())[0]).toBeDisabled(),
        );

        pending.settle(RELEASED);
    });

    it("4.3 cannot be started a second time while it is in flight", async () => {
        const pending = deferred();
        release.mockReturnValue(pending.promise);
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());

        await userEvent.keyboard("{Escape}");
        const [row] = await releaseButtons();

        expect(dialog()).toBeInTheDocument();
        expect(row).toBeDisabled();
        pending.settle(RELEASED);
        await waitFor(() => expect(release).toHaveBeenCalledTimes(1));
    });

    it("4.4 cannot be dismissed until the release has an answer", async () => {
        const pending = deferred();
        release.mockReturnValue(pending.promise);
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());
        await userEvent.keyboard("{Escape}");

        expect(dialog()).toBeInTheDocument();
        expect(
            within(dialog()).getByRole("button", { name: /keep it held/i }),
        ).toBeDisabled();
        expect(
            within(dialog()).getByRole("button", { name: /close dialog/i }),
        ).toBeDisabled();

        pending.settle(RELEASED);
    });

    it("4.5 leaves a different purchase releasable", async () => {
        purchases.mockResolvedValue([held, secondHeld]);
        const pending = deferred();
        release.mockReturnValue(pending.promise);
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());

        await waitFor(async () =>
            expect((await releaseButtons())[1]).toBeEnabled(),
        );

        pending.settle(RELEASED);
    });
});

describe("TransactionsConsole · when the release fails", () => {
    it("5.1 leaves the escrow held", async () => {
        release.mockRejectedValue(new Error("gateway down"));
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());

        const table = await screen.findByRole("table");
        await waitFor(() =>
            expect(within(table).getByText(/in escrow/i)).toBeInTheDocument(),
        );
    });

    it("5.3 tells the buyer the release did not go through", async () => {
        release.mockRejectedValue(new Error("gateway down"));
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());

        expect(
            await within(dialog()).findByText(/could not be released/i),
        ).toBeInTheDocument();
    });

    it("5.4 allows the release to be attempted again", async () => {
        release.mockRejectedValueOnce(new Error("gateway down"));
        release.mockResolvedValueOnce(RELEASED);
        draw();
        await userEvent.click((await releaseButtons())[0]);
        await userEvent.click(confirmButton());

        await waitFor(() => expect(release).toHaveBeenCalledTimes(1));
        await userEvent.click(confirmButton());

        await waitFor(() => expect(release).toHaveBeenCalledTimes(2));
    });
});
