import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ModerationConsole } from "@/components/sections/admin/moderation-console";
import { flagsAPI } from "@/lib/api/flags";
import { propertiesAPI } from "@/lib/api/properties";
import { aFlagPage, aPropertyFlag } from "@/lib/data/__fixtures__/moderation";
import type { Property } from "@/lib/validations/property";

vi.mock("@/lib/api/flags", () => ({
    flagsAPI: { list: vi.fn(), resolve: vi.fn() },
}));
vi.mock("@/lib/api/properties", () => ({
    propertiesAPI: { moderate: vi.fn() },
}));

const list = vi.mocked(flagsAPI.list);
const resolve = vi.mocked(flagsAPI.resolve);
const moderate = vi.mocked(propertiesAPI.moderate);

const FULL_GALLERY = ["/a.jpg", "/b.jpg", "/c.jpg", "/d.jpg", "/e.jpg"];

const FLAGGED = aPropertyFlag();

const CHANGES_ASKED = aPropertyFlag(
    { id: "flg_2", status: "RESOLVED" },
    {
        id: "prop_2",
        address: "4 Ridge Lane",
        locality: "Napa",
        status: "DRAFT",
        images: FULL_GALLERY,
    },
);

const APPROVED = aPropertyFlag(
    { id: "flg_3", status: "RESOLVED" },
    {
        id: "prop_3",
        address: "9 Mill Street",
        locality: "Sonoma",
        images: FULL_GALLERY,
    },
);

const HARBOUR = "12 Harbour Row, Sausalito";
const RIDGE = "4 Ridge Lane, Napa";
const MILL = "9 Mill Street, Sonoma";

const deferred = () => {
    let settle: () => void = () => {};
    let fail: (reason: Error) => void = () => {};
    const promise = new Promise<Property>((resolve, reject) => {
        settle = () => resolve({} as Property);
        fail = reject;
    });
    return { promise, settle, fail };
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

const draw = () => render(<ModerationConsole />, { wrapper });

const queue = () => screen.findByRole("list", { name: /^submitted listings/i });

const rowButton = async (name: string) =>
    within(await queue()).getByRole("button", { name });

const dialog = (name: string) => screen.findByRole("dialog", { name });

const gone = (name: string) =>
    waitFor(() =>
        expect(screen.queryByRole("dialog", { name })).not.toBeInTheDocument(),
    );

beforeEach(() => {
    list.mockResolvedValue(aFlagPage([FLAGGED, CHANGES_ASKED, APPROVED]));
    moderate.mockResolvedValue({} as Property);
    resolve.mockResolvedValue(FLAGGED);
});

describe("ModerationConsole · reading the queue", () => {
    it("asks only for listing reports", async () => {
        draw();
        await queue();

        expect(list).toHaveBeenCalledWith({ type: "PROPERTY", limit: 100 });
    });

    it("shows the moderation fallback when the queue fails and recovers on retry", async () => {
        list.mockRejectedValueOnce(new Error("flags down"));
        draw();

        expect(
            await screen.findByText(/could not load the moderation queue/i),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: /^retry$/i }));

        expect(await queue()).toBeInTheDocument();
    });

    it("says nothing matches rather than loading when the queue is empty", async () => {
        list.mockResolvedValue(aFlagPage([]));
        draw();

        expect(
            await screen.findByText("Nothing matches this view"),
        ).toBeInTheDocument();
    });

    it("claims no queue count, reading or open check while the queue is loading", async () => {
        list.mockReturnValue(new Promise(() => {}));
        draw();
        const review = within(
            (
                await screen.findByRole("heading", { name: "Review Queue" })
            ).closest("section") as HTMLElement,
        );

        expect(review.queryByText("0")).toBeNull();
        expect(review.queryAllByText(/0 open/)).toHaveLength(0);
    });

    it("narrows the queue to the status pill that was picked", async () => {
        draw();
        await queue();

        await userEvent.click(
            screen.getByRole("button", { name: /^approved/i }),
        );

        const table = await queue();
        expect(
            within(table).getByRole("button", { name: `Review ${MILL}` }),
        ).toBeInTheDocument();
        expect(
            within(table).queryByRole("button", { name: `Review ${HARBOUR}` }),
        ).not.toBeInTheDocument();
    });

    it("narrows the queue to listings with the picked check still open", async () => {
        draw();
        await queue();

        await userEvent.click(
            within(
                screen.getByRole("group", {
                    name: "Filter by open compliance check",
                }),
            ).getByRole("button", { name: /^photo provenance/i }),
        );

        const table = await queue();
        await waitFor(() =>
            expect(
                within(table).queryByRole("button", { name: `Review ${MILL}` }),
            ).not.toBeInTheDocument(),
        );
        expect(
            within(table).getByRole("button", { name: `Review ${HARBOUR}` }),
        ).toBeInTheDocument();
    });

    it("offers no approval on a listing that is already approved", async () => {
        draw();

        await queue();
        await userEvent.click(
            screen.getByRole("button", { name: /^decided/i }),
        );

        expect(
            await screen.findByRole("button", { name: `Review ${MILL}` }),
        ).toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: `Approve ${MILL}` }),
        ).not.toBeInTheDocument();
    });
});

describe("ModerationConsole · approving", () => {
    it("asks for confirmation instead of approving on the first click", async () => {
        draw();

        await userEvent.click(await rowButton(`Approve ${HARBOUR}`));

        expect(await dialog("Approve listing")).toHaveTextContent(HARBOUR);
        expect(moderate).not.toHaveBeenCalled();
    });

    it("closes without approving when cancelled", async () => {
        draw();
        await userEvent.click(await rowButton(`Approve ${HARBOUR}`));

        await userEvent.click(
            within(await dialog("Approve listing")).getByRole("button", {
                name: "Cancel",
            }),
        );

        await gone("Approve listing");
        expect(moderate).not.toHaveBeenCalled();
    });

    it("approves the listing, then resolves the report against it", async () => {
        draw();
        await userEvent.click(await rowButton(`Approve ${HARBOUR}`));

        await userEvent.click(
            within(await dialog("Approve listing")).getByRole("button", {
                name: "Approve listing",
            }),
        );

        await gone("Approve listing");
        expect(moderate).toHaveBeenCalledExactlyOnceWith(
            "prop_1",
            "approve",
            undefined,
        );
        expect(resolve).toHaveBeenCalledExactlyOnceWith("flg_1");
        expect(moderate.mock.invocationCallOrder[0]).toBeLessThan(
            resolve.mock.invocationCallOrder[0],
        );
    });

    it("locks the confirmation and every other approval while one is in flight", async () => {
        const call = deferred();
        moderate.mockReturnValue(call.promise);
        draw();
        await userEvent.click(await rowButton(`Approve ${HARBOUR}`));
        const confirm = within(await dialog("Approve listing"));

        await userEvent.click(
            confirm.getByRole("button", { name: "Approve listing" }),
        );
        await userEvent.click(
            confirm.getByRole("button", { name: "Approve listing" }),
        );

        expect(confirm.getByRole("button", { name: "Cancel" })).toBeDisabled();
        expect(
            screen.getByRole("button", {
                name: `Approve ${RIDGE}`,
                hidden: true,
            }),
        ).toBeDisabled();
        expect(moderate).toHaveBeenCalledTimes(1);

        call.settle();
        await gone("Approve listing");
    });

    it("keeps the confirmation open with the failure when approving fails, and lets it be retried", async () => {
        moderate.mockRejectedValueOnce(new Error("listing service down"));
        draw();
        await userEvent.click(await rowButton(`Approve ${HARBOUR}`));
        const confirm = within(await dialog("Approve listing"));

        await userEvent.click(
            confirm.getByRole("button", { name: "Approve listing" }),
        );

        expect(
            await confirm.findByText("The approval was not recorded"),
        ).toBeInTheDocument();
        expect(resolve).not.toHaveBeenCalled();

        await userEvent.click(
            confirm.getByRole("button", { name: "Approve listing" }),
        );

        await gone("Approve listing");
        expect(resolve).toHaveBeenCalledExactlyOnceWith("flg_1");
    });

    it("approves a listing whose report was already settled without settling it again", async () => {
        draw();
        await userEvent.click(await rowButton(`Approve ${RIDGE}`));

        await userEvent.click(
            within(await dialog("Approve listing")).getByRole("button", {
                name: "Approve listing",
            }),
        );

        await gone("Approve listing");
        expect(moderate).toHaveBeenCalledExactlyOnceWith(
            "prop_2",
            "approve",
            undefined,
        );
        expect(resolve).not.toHaveBeenCalled();
    });
});

describe("ModerationConsole · requesting changes and rejecting", () => {
    it("holds the decision until the agent is given a reason", async () => {
        draw();
        await userEvent.click(await rowButton(`Reject ${HARBOUR}`));
        const decision = within(await dialog("Reject listing"));
        const submit = decision.getByRole("button", { name: "Reject listing" });

        expect(submit).toBeDisabled();
        await userEvent.type(
            decision.getByLabelText("Reason for rejection"),
            "   ",
        );
        expect(submit).toBeDisabled();
        expect(moderate).not.toHaveBeenCalled();
    });

    it.each([
        [
            "Reject",
            "Reject listing",
            "Reason for rejection",
            "Reject listing",
            "reject",
        ],
        [
            "Request changes on",
            "Request changes",
            "Feedback for the agent",
            "Send feedback",
            "changes",
        ],
    ])(
        "%s sends the trimmed reason with the decision and resolves the report",
        async (action, title, field, submit, mode) => {
            draw();
            await userEvent.click(await rowButton(`${action} ${HARBOUR}`));
            const decision = within(await dialog(title));

            await userEvent.type(
                decision.getByLabelText(field),
                "  Photos show another house  ",
            );
            await userEvent.click(
                decision.getByRole("button", { name: submit }),
            );

            await gone(title);
            expect(moderate).toHaveBeenCalledExactlyOnceWith(
                "prop_1",
                mode,
                "Photos show another house",
            );
            expect(resolve).toHaveBeenCalledExactlyOnceWith("flg_1");
        },
    );

    it("keeps the reason and shows the failure when the decision fails", async () => {
        moderate.mockRejectedValueOnce(new Error("listing service down"));
        draw();
        await userEvent.click(await rowButton(`Reject ${HARBOUR}`));
        const decision = within(await dialog("Reject listing"));

        await userEvent.type(
            decision.getByLabelText("Reason for rejection"),
            "Misleading photos",
        );
        await userEvent.click(
            decision.getByRole("button", { name: "Reject listing" }),
        );

        expect(
            await decision.findByText("The decision was not recorded"),
        ).toBeInTheDocument();
        expect(decision.getByLabelText("Reason for rejection")).toHaveValue(
            "Misleading photos",
        );
    });

    it("starts every decision with an empty reason", async () => {
        draw();
        await userEvent.click(await rowButton(`Reject ${HARBOUR}`));
        const first = within(await dialog("Reject listing"));
        await userEvent.type(
            first.getByLabelText("Reason for rejection"),
            "Draft",
        );
        await userEvent.click(first.getByRole("button", { name: "Cancel" }));
        await gone("Reject listing");

        await userEvent.click(await rowButton(`Reject ${HARBOUR}`));

        expect(
            within(await dialog("Reject listing")).getByLabelText(
                "Reason for rejection",
            ),
        ).toHaveValue("");
    });
});

describe("ModerationConsole · reviewing", () => {
    it("hands a decision taken in the review over to its confirmation", async () => {
        draw();
        await userEvent.click(await rowButton(`Review ${HARBOUR}`));

        await userEvent.click(
            within(await dialog(HARBOUR)).getByRole("button", {
                name: "Reject",
            }),
        );

        expect(await dialog("Reject listing")).toBeInTheDocument();
        await gone(HARBOUR);
    });

    it("offers no approval when reviewing a listing that is already approved", async () => {
        draw();
        await queue();
        await userEvent.click(
            screen.getByRole("button", { name: /^decided/i }),
        );
        await userEvent.click(
            await screen.findByRole("button", { name: `Review ${MILL}` }),
        );

        expect(
            within(await dialog(MILL)).queryByRole("button", {
                name: "Approve",
            }),
        ).not.toBeInTheDocument();
    });
});
