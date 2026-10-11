import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminPaymentsConsole } from "@/components/sections/admin/admin-payments-console";
import { escrowAPI } from "@/lib/api/escrow";
import { ADMIN_ROUTES } from "@/lib/constants";
import { anEscrowRelease } from "@/lib/data/__fixtures__/purchases";
import { anEscrow, anEscrowStage } from "@/lib/data/__fixtures__/transactions";
import type { EscrowRefund, EscrowRelease } from "@/lib/validations/escrow";

vi.mock("@/lib/api/escrow", () => ({
    escrowAPI: {
        holds: vi.fn(),
        stages: vi.fn(),
        release: vi.fn(),
        refund: vi.fn(),
    },
}));

const holds = vi.mocked(escrowAPI.holds);
const stages = vi.mocked(escrowAPI.stages);
const release = vi.mocked(escrowAPI.release);
const refund = vi.mocked(escrowAPI.refund);

const deal = (id: string, agent: string, address: string) => ({
    id,
    seller: { id: `usr_${id}`, fullName: agent },
    property: {
        id: `prop_${id}`,
        title: address,
        address,
        locality: "Carmel",
        price: 1_000_000,
    },
});

const HELD = anEscrow(
    { id: "esc_held", amount: 1_000_000 },
    deal("txn_held", "Marta Vance", "18 Cypress Point"),
);
const SECOND_HELD = anEscrow(
    { id: "esc_second" },
    deal("txn_second", "Noor Hale", "4 Ridge Lane"),
);
const DISPUTED = anEscrow(
    { id: "esc_disputed", status: "DISPUTED" },
    deal("txn_disputed", "Elena Whitfield", "9 Mill Street"),
);
const RELEASED = anEscrow(
    { id: "esc_released", status: "RELEASED" },
    deal("txn_released", "Sarah Johnson", "2 Bay Road"),
);

const REFUNDED: EscrowRefund = {
    escrow: { ...HELD, status: "REFUNDED" },
    reason: "Inspection failed",
};

const deferred = <T,>() => {
    let settle: (value: T) => void = () => {};
    const promise = new Promise<T>((resolve) => {
        settle = resolve;
    });
    return { promise, settle };
};

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

const draw = () => render(<AdminPaymentsConsole />, { wrapper });

const table = () => screen.findByRole("table");

const settleButton = async (agent: string) =>
    within(await table()).getByRole("button", {
        name: `Settle the hold for ${agent}`,
    });

const confirmation = () => screen.findByRole("dialog", { name: /this hold$/ });

const band = async () =>
    within(await screen.findByRole("region", { name: /^Escrow position/ }));

const gone = () =>
    waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

const openRefund = async (agent = "Marta Vance") => {
    draw();
    await userEvent.click(await settleButton(agent));
    const modal = within(await confirmation());
    await userEvent.click(
        modal.getByRole("button", { name: "Refund the buyer instead" }),
    );
    return modal;
};

beforeEach(() => {
    holds.mockResolvedValue([HELD, SECOND_HELD, DISPUTED, RELEASED]);
    stages.mockResolvedValue([
        anEscrowStage({ status: "HELD", count: 2, amount: 2_200_000 }),
        anEscrowStage({ status: "DISPUTED", count: 1, amount: 1_200_000 }),
        anEscrowStage({ status: "RELEASED", count: 1, amount: 900_000 }),
    ]);
    release.mockResolvedValue(anEscrowRelease());
    refund.mockResolvedValue(REFUNDED);
});

describe("AdminPaymentsConsole · 01 reading the holds", () => {
    it("1.1 asks for every hold on the platform, not one page of them", async () => {
        draw();
        await table();

        expect(holds).toHaveBeenCalledWith({});
    });

    it("1.2 renders the payments fallback when the holds fail and retries", async () => {
        holds.mockRejectedValue(new Error("escrow down"));
        draw();
        const retry = await screen.findByRole("button", { name: /^retry$/i });

        holds.mockResolvedValue([HELD]);
        await userEvent.click(retry);

        expect(await table()).toBeInTheDocument();
    });

    it("1.3 shows no figure in the band when the escrow position fails to load", async () => {
        stages.mockRejectedValue(new Error("stages down"));
        draw();
        await table();

        await waitFor(async () => {
            const region = (await band()).getByText(/^In escrow$/)
                .parentElement as HTMLElement;
            expect(region).toHaveTextContent("—");
            expect(region).not.toHaveTextContent("$0");
            expect(region).not.toHaveTextContent("0 holds");
        });
    });

    it("1.4 counts held and disputed money as in escrow, never released money", async () => {
        draw();

        await waitFor(async () =>
            expect(
                (await band()).getByText(/^In escrow$/).parentElement,
            ).toHaveTextContent("3 holds"),
        );
    });

    it("1.5 shows no payout count and no empty record while the holds are loading", async () => {
        holds.mockReturnValue(new Promise(() => {}));
        draw();
        const payouts = within(
            (await screen.findByRole("heading", { name: "Payouts" })).closest(
                "section",
            ) as HTMLElement,
        );

        expect(payouts.queryByText("0")).toBeNull();
        expect(payouts.queryByText("No payouts on record yet")).toBeNull();
    });
});

describe("AdminPaymentsConsole · 02 what is settlable", () => {
    it("2.1 offers settlement on a held hold", async () => {
        draw();

        expect(await settleButton("Marta Vance")).toBeInTheDocument();
    });

    it.each([
        ["2.2 a released", "Sarah Johnson"],
        ["2.3 a disputed", "Elena Whitfield"],
    ])("%s hold offers no settlement", async (_, agent) => {
        draw();
        const rows = within(await table());

        expect(
            rows.queryByRole("button", {
                name: `Settle the hold for ${agent}`,
            }),
        ).not.toBeInTheDocument();
    });
});

describe("AdminPaymentsConsole · 03 releasing", () => {
    it("3.1 opens the confirmation instead of calling the API", async () => {
        draw();

        await userEvent.click(await settleButton("Marta Vance"));

        expect(await confirmation()).toBeInTheDocument();
        expect(release).not.toHaveBeenCalled();
        expect(refund).not.toHaveBeenCalled();
    });

    it("3.2 names the agent, the deal and the net amount, and warns it cannot be undone", async () => {
        draw();
        await userEvent.click(await settleButton("Marta Vance"));
        const modal = await confirmation();

        expect(modal).toHaveTextContent("Marta Vance");
        expect(modal).toHaveTextContent("18 Cypress Point");
        expect(modal).toHaveTextContent(/\$[\d,]+ net/);
        expect(modal).toHaveTextContent("This cannot be undone");
    });

    it("3.3 opens in release mode, asking for no reason", async () => {
        draw();
        await userEvent.click(await settleButton("Marta Vance"));
        const modal = within(await confirmation());

        expect(
            modal.getByRole("heading", { name: "Release this hold" }),
        ).toBeInTheDocument();
        expect(modal.queryByLabelText("Reason for the refund")).toBeNull();
        expect(
            modal.getByRole("button", { name: "Release funds" }),
        ).toBeEnabled();
    });

    it("3.4 releases the hold by its own id, once, then closes", async () => {
        draw();
        await userEvent.click(await settleButton("Marta Vance"));

        await userEvent.click(
            within(await confirmation()).getByRole("button", {
                name: "Release funds",
            }),
        );

        await gone();
        expect(release).toHaveBeenCalledExactlyOnceWith("esc_held");
        expect(refund).not.toHaveBeenCalled();
    });

    it("3.5 calls nothing when the confirmation is dismissed", async () => {
        draw();
        await userEvent.click(await settleButton("Marta Vance"));

        await userEvent.click(
            within(await confirmation()).getByRole("button", {
                name: "Cancel",
            }),
        );

        await gone();
        expect(release).not.toHaveBeenCalled();
        expect(refund).not.toHaveBeenCalled();
    });
});

describe("AdminPaymentsConsole · 04 refunding", () => {
    it("4.1 switches the confirmation to the refund wording", async () => {
        const modal = await openRefund();

        expect(
            modal.getByRole("heading", { name: "Refund this hold" }),
        ).toBeInTheDocument();
        expect(
            modal.getByRole("button", { name: "Refund buyer" }),
        ).toBeInTheDocument();
    });

    it("4.2 refuses a refund until its reason has four real characters", async () => {
        const modal = await openRefund();
        const submit = modal.getByRole("button", { name: "Refund buyer" });
        const reason = modal.getByLabelText("Reason for the refund");

        expect(submit).toBeDisabled();
        await userEvent.type(reason, "  abc  ");
        expect(submit).toBeDisabled();
        await userEvent.type(reason, "d");
        expect(submit).toBeEnabled();
    });

    it("4.3 refunds the hold by its own id with the trimmed reason, once", async () => {
        const modal = await openRefund();

        await userEvent.type(
            modal.getByLabelText("Reason for the refund"),
            "  Inspection failed  ",
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Refund buyer" }),
        );

        await gone();
        expect(refund).toHaveBeenCalledExactlyOnceWith("esc_held", {
            reason: "Inspection failed",
        });
        expect(release).not.toHaveBeenCalled();
    });

    it("4.4 opens every confirmation in release mode with an empty reason", async () => {
        const modal = await openRefund();
        await userEvent.type(
            modal.getByLabelText("Reason for the refund"),
            "Half written",
        );
        await userEvent.click(modal.getByRole("button", { name: "Cancel" }));
        await gone();

        await userEvent.click(await settleButton("Noor Hale"));
        const next = within(await confirmation());

        expect(
            next.getByRole("heading", { name: "Release this hold" }),
        ).toBeInTheDocument();
        await userEvent.click(
            next.getByRole("button", { name: "Refund the buyer instead" }),
        );
        expect(next.getByLabelText("Reason for the refund")).toHaveValue("");
    });
});

describe("AdminPaymentsConsole · 05 while it is in flight", () => {
    it("5.1 sends nothing more when confirm is clicked again", async () => {
        const call = deferred<EscrowRelease>();
        release.mockReturnValue(call.promise);
        draw();
        await userEvent.click(await settleButton("Marta Vance"));
        const modal = within(await confirmation());
        const confirm = modal.getByRole("button", { name: "Release funds" });

        await userEvent.click(confirm);
        await userEvent.click(confirm);

        expect(release).toHaveBeenCalledTimes(1);
        call.settle(anEscrowRelease());
        await gone();
    });

    it("5.2 cannot be dismissed or switched to refund until the server answers", async () => {
        const call = deferred<EscrowRelease>();
        release.mockReturnValue(call.promise);
        draw();
        await userEvent.click(await settleButton("Marta Vance"));
        const modal = within(await confirmation());

        await userEvent.click(
            modal.getByRole("button", { name: "Release funds" }),
        );

        expect(modal.getByRole("button", { name: "Cancel" })).toBeDisabled();
        expect(
            modal.getByRole("button", { name: "Refund the buyer instead" }),
        ).toBeDisabled();
        await userEvent.keyboard("{Escape}");
        expect(await confirmation()).toBeInTheDocument();

        call.settle(anEscrowRelease());
        await gone();
    });
});

describe("AdminPaymentsConsole · 06 when it fails", () => {
    it("6.1 keeps the confirmation open and says nothing moved", async () => {
        release.mockRejectedValueOnce(new Error("gateway down"));
        draw();
        await userEvent.click(await settleButton("Marta Vance"));
        const modal = within(await confirmation());

        await userEvent.click(
            modal.getByRole("button", { name: "Release funds" }),
        );

        expect(
            await modal.findByText("The funds could not be released"),
        ).toBeInTheDocument();
        expect(modal.getByText(/Nothing has moved/)).toBeInTheDocument();
    });

    it("6.2 clears the failure when the mode is switched", async () => {
        release.mockRejectedValueOnce(new Error("gateway down"));
        draw();
        await userEvent.click(await settleButton("Marta Vance"));
        const modal = within(await confirmation());
        await userEvent.click(
            modal.getByRole("button", { name: "Release funds" }),
        );
        await modal.findByText("The funds could not be released");

        await userEvent.click(
            modal.getByRole("button", { name: "Refund the buyer instead" }),
        );

        expect(
            modal.queryByText("The funds could not be released"),
        ).not.toBeInTheDocument();
        expect(
            modal.queryByText("The refund could not be issued"),
        ).not.toBeInTheDocument();
    });

    it("6.3 lets the same settlement be attempted again", async () => {
        release.mockRejectedValueOnce(new Error("gateway down"));
        draw();
        await userEvent.click(await settleButton("Marta Vance"));
        const modal = within(await confirmation());
        await userEvent.click(
            modal.getByRole("button", { name: "Release funds" }),
        );
        await modal.findByText("The funds could not be released");

        await userEvent.click(
            modal.getByRole("button", { name: "Release funds" }),
        );

        await gone();
        expect(release).toHaveBeenCalledTimes(2);
    });
});

describe("AdminPaymentsConsole · 07 finding a hold", () => {
    const agents = async () =>
        within(await table())
            .queryAllByRole("button", { name: /^Settle the hold for / })
            .map((button) => button.getAttribute("aria-label"));

    it("7.1 narrows to the picked state, and shows every hold again", async () => {
        draw();
        await table();
        const disputed = (await band()).getByRole("button", {
            name: /^Disputed/,
        });

        await userEvent.click(disputed);
        await waitFor(async () =>
            expect(await table()).toHaveTextContent("Elena Whitfield"),
        );
        expect(await table()).not.toHaveTextContent("Marta Vance");

        await userEvent.click(disputed);
        await waitFor(async () =>
            expect(await table()).toHaveTextContent("Marta Vance"),
        );

        await userEvent.click(disputed);
        await userEvent.click(
            screen.getByRole("button", { name: "Show every state" }),
        );
        await waitFor(async () =>
            expect(await table()).toHaveTextContent("Marta Vance"),
        );
    });

    it("7.2 finds a hold by its agent or its deal", async () => {
        draw();
        await table();
        const search = screen.getByRole("searchbox", {
            name: "Search payouts by agent, deal or buyer",
        });

        await userEvent.type(search, "Ridge");
        await waitFor(async () =>
            expect(await agents()).toEqual(["Settle the hold for Noor Hale"]),
        );

        await userEvent.clear(search);
        await userEvent.type(search, "marta");
        await waitFor(async () =>
            expect(await agents()).toEqual(["Settle the hold for Marta Vance"]),
        );
    });

    it("7.3 opens the deal's own review on the transactions ledger", async () => {
        draw();
        const rows = within(await table());

        await userEvent.click(
            rows.getByRole("button", {
                name: "Details for Marta Vance · 18 Cypress Point",
            }),
        );

        expect(
            await screen.findByRole("link", { name: "Open deal" }),
        ).toHaveAttribute("href", ADMIN_ROUTES.transaction("txn_held"));
    });
});
