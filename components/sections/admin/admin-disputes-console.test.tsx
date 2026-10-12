import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminDisputesConsole } from "@/components/sections/admin/admin-disputes-console";
import { disputesAPI } from "@/lib/api/disputes";
import { escrowAPI } from "@/lib/api/escrow";
import { aDispute, aFrozenHold } from "@/lib/data/__fixtures__/disputes";
import type { Dispute } from "@/lib/validations/dispute";

vi.mock("@/lib/api/disputes", () => ({
    disputesAPI: { all: vi.fn(), resolve: vi.fn(), dismiss: vi.fn() },
}));
vi.mock("@/lib/api/escrow", () => ({ escrowAPI: { holds: vi.fn() } }));

const all = vi.mocked(disputesAPI.all);
const resolve = vi.mocked(disputesAPI.resolve);
const dismiss = vi.mocked(disputesAPI.dismiss);
const holds = vi.mocked(escrowAPI.holds);

const FROZEN = aDispute();
const NO_HOLD = aDispute({
    id: "dsp_2",
    title: "Agent stopped answering",
    createdAt: "2026-09-20T12:00:00.000Z",
    transactions: [],
});
const CLOSED = aDispute({
    id: "dsp_3",
    title: "Wrong closing date",
    status: "RESOLVED",
    resolutionNotes: "Settled with the buyer",
    resolvedAt: "2026-09-01T12:00:00.000Z",
});

const NOTE = "  The inspection report backs the buyer  ";

const hold = () => {
    let settle: (value: Dispute) => void = () => {};
    const promise = new Promise<Dispute>((resolveHold) => {
        settle = resolveHold;
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

const draw = () => render(<AdminDisputesConsole />, { wrapper });

const reviewing = () => screen.findByRole("heading", { level: 2 });

const decide = async (label: string) =>
    userEvent.click(await screen.findByRole("button", { name: label }));

const dialog = (name: string | RegExp) =>
    screen.findByRole("dialog", { name });

const RELEASE_TITLE = /^Release \$67,200(\.00)? to Marta Vance$/;
const REFUND_TITLE = /^Refund \$67,200(\.00)? to Christ Streich$/;

const gone = () =>
    waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

const decisionButtons = () =>
    ["Dismiss", "Release to seller", "Refund buyer", "Resolve"].filter(
        (name) => screen.queryByRole("button", { name }) !== null,
    );

beforeEach(() => {
    all.mockResolvedValue([FROZEN, NO_HOLD, CLOSED]);
    holds.mockResolvedValue([aFrozenHold()]);
    resolve.mockResolvedValue({ ...FROZEN, status: "RESOLVED" });
    dismiss.mockResolvedValue({ ...FROZEN, status: "DISMISSED" });
});

describe("AdminDisputesConsole · reading the queue", () => {
    it("asks for every dispute, not one page of them", async () => {
        draw();
        await reviewing();

        expect(all).toHaveBeenCalledWith({});
    });

    it("shows the disputes fallback when the queue fails, and recovers on retry", async () => {
        all.mockRejectedValue(new Error("disputes down"));
        draw();
        const retry = await screen.findByRole("button", { name: /^retry$/i });

        all.mockResolvedValue([FROZEN]);
        await userEvent.click(retry);

        expect(await reviewing()).toHaveTextContent(FROZEN.title);
    });

    it("opens on the open disputes, counted on the filter", async () => {
        draw();
        await reviewing();

        const open = screen.getByRole("button", { name: /^Open/ });
        expect(open).toHaveAttribute("aria-pressed", "true");
        expect(open).toHaveTextContent("2");
    });

    it("says the queue is clear when the filter matches no dispute", async () => {
        draw();
        await reviewing();

        await userEvent.click(
            screen.getByRole("button", { name: /^Dismissed/ }),
        );

        expect(await screen.findByText("Queue clear")).toBeInTheDocument();
    });

    it("1.3 keeps the queue and every decision when the escrow load fails", async () => {
        holds.mockRejectedValue(new Error("escrow down"));
        draw();

        expect(await reviewing()).toHaveTextContent(FROZEN.title);
        await waitFor(() =>
            expect(decisionButtons()).toEqual([
                "Dismiss",
                "Release to seller",
                "Refund buyer",
            ]),
        );
    });
});

describe("AdminDisputesConsole · 02 what can be decided", () => {
    it("2.1 shows a decided dispute with no action", async () => {
        draw();
        await reviewing();
        await userEvent.click(
            screen.getByRole("button", { name: /^Resolved/ }),
        );

        expect(await reviewing()).toHaveTextContent(CLOSED.title);
        expect(decisionButtons()).toEqual([]);
    });

    it("2.2 offers dismiss, release and refund on a dispute that froze a hold", async () => {
        draw();

        expect(await reviewing()).toHaveTextContent(FROZEN.title);
        await waitFor(() =>
            expect(decisionButtons()).toEqual([
                "Dismiss",
                "Release to seller",
                "Refund buyer",
            ]),
        );
    });

    it("2.3 offers only dismiss and resolve on a dispute with no hold", async () => {
        draw();
        await reviewing();

        await userEvent.click(
            await screen.findByRole("button", { name: /^Agent stopped/ }),
        );

        expect(await reviewing()).toHaveTextContent(NO_HOLD.title);
        expect(decisionButtons()).toEqual(["Dismiss", "Resolve"]);
    });
});

describe("AdminDisputesConsole · 03 deciding", () => {
    it("3.1 opens the confirmation with an empty note instead of calling the API", async () => {
        draw();

        await decide("Release to seller");

        const modal = within(
            await dialog(RELEASE_TITLE),
        );
        expect(
            modal.getByLabelText("Why the seller keeps the funds"),
        ).toHaveValue("");
        expect(resolve).not.toHaveBeenCalled();
    });

    it("3.2 names the dispute, the amount and the person paid, and states that the decision is final", async () => {
        draw();

        await decide("Release to seller");

        const modal = await dialog(RELEASE_TITLE);
        expect(modal).toHaveTextContent(FROZEN.title);
        expect(modal).toHaveTextContent(/cannot be undone/);
    });

    it("3.3 cannot be confirmed until the note has four real characters", async () => {
        draw();
        await decide("Refund buyer");
        const modal = within(await dialog(REFUND_TITLE));
        const confirm = modal.getByRole("button", { name: "Refund buyer" });
        const note = modal.getByLabelText("Why the buyer is refunded");

        expect(confirm).toBeDisabled();
        await userEvent.type(note, "  abc  ");
        expect(confirm).toBeDisabled();
        await userEvent.type(note, "d");
        expect(confirm).toBeEnabled();
    });

    it("3.4 releases with the trimmed note and the outcome RELEASE, once, then closes", async () => {
        draw();
        await decide("Release to seller");
        const modal = within(await dialog(RELEASE_TITLE));

        await userEvent.type(
            modal.getByLabelText("Why the seller keeps the funds"),
            NOTE,
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Release funds" }),
        );

        await gone();
        expect(resolve).toHaveBeenCalledExactlyOnceWith("dsp_1", {
            resolutionNotes: NOTE.trim(),
            outcome: "RELEASE",
        });
        expect(dismiss).not.toHaveBeenCalled();
    });

    it("3.7 dismisses with the trimmed note and no outcome", async () => {
        draw();
        await decide("Dismiss");
        const modal = within(await dialog("Dismiss this dispute"));

        await userEvent.type(
            modal.getByLabelText("Why no action is warranted"),
            NOTE,
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Dismiss dispute" }),
        );

        await gone();
        expect(dismiss).toHaveBeenCalledExactlyOnceWith("dsp_1", {
            resolutionNotes: NOTE.trim(),
        });
        expect(resolve).not.toHaveBeenCalled();
    });

    it("3.8 calls nothing when the confirmation is closed", async () => {
        draw();
        await decide("Refund buyer");

        await userEvent.click(
            within(await dialog(REFUND_TITLE)).getByRole("button", {
                name: "Cancel",
            }),
        );

        await gone();
        expect(resolve).not.toHaveBeenCalled();
        expect(dismiss).not.toHaveBeenCalled();
    });
});

describe("AdminDisputesConsole · 04 in flight and failing", () => {
    it("4.1 sends nothing more when confirm is clicked again while in flight", async () => {
        const call = hold();
        resolve.mockReturnValue(call.promise);
        draw();
        await decide("Refund buyer");
        const modal = within(await dialog(REFUND_TITLE));
        await userEvent.type(
            modal.getByLabelText("Why the buyer is refunded"),
            NOTE,
        );
        const confirm = modal.getByRole("button", { name: "Refund buyer" });

        await userEvent.click(confirm);
        await userEvent.click(confirm);

        expect(resolve).toHaveBeenCalledTimes(1);
        expect(
            screen.getByRole("button", { name: "Dismiss", hidden: true }),
        ).toBeDisabled();

        call.settle({ ...FROZEN, status: "RESOLVED" });
        await gone();
    });

    it("4.2 keeps the confirmation open and says nothing moved when the decision fails", async () => {
        resolve.mockRejectedValueOnce(new Error("disputes down"));
        draw();
        await decide("Release to seller");
        const modal = within(await dialog(RELEASE_TITLE));
        await userEvent.type(
            modal.getByLabelText("Why the seller keeps the funds"),
            NOTE,
        );

        await userEvent.click(
            modal.getByRole("button", { name: "Release funds" }),
        );

        expect(
            await modal.findByText("The decision was not recorded"),
        ).toBeInTheDocument();
        expect(modal.getByText(/no money moved/)).toBeInTheDocument();
        expect(
            modal.getByLabelText("Why the seller keeps the funds"),
        ).toHaveValue(NOTE);

        await userEvent.click(
            modal.getByRole("button", { name: "Release funds" }),
        );

        await gone();
        expect(resolve).toHaveBeenCalledTimes(2);
    });
});
