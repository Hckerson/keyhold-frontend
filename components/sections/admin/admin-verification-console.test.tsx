import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminVerificationConsole } from "@/components/sections/admin/admin-verification-console";
import { kycAPI } from "@/lib/api/kyc";
import { ADMIN_ROUTES } from "@/lib/constants";
import { anIdentityDocument } from "@/lib/data/__fixtures__/verifications";
import type { IdentityDocument } from "@/lib/validations/kyc";

vi.mock("@/lib/api/kyc", () => ({
    kycAPI: { queue: vi.fn(), approve: vi.fn(), reject: vi.fn() },
}));

const queue = vi.mocked(kycAPI.queue);
const approve = vi.mocked(kycAPI.approve);
const reject = vi.mocked(kycAPI.reject);

const applicant = (
    id: string,
    userId: string,
    fullName: string,
    overrides: Partial<IdentityDocument> = {},
) => {
    const base = anIdentityDocument();
    return anIdentityDocument({
        id,
        userId,
        user: base.user && { ...base.user, id: userId, fullName },
        ...overrides,
    });
};

const IRWIN = applicant("kyc-1", "user-1", "Irwin Lindgren");
const ADA = applicant("kyc-2", "user-2", "Ada Vance", {
    createdAt: "2026-10-01T12:00:00.000Z",
});
const NOOR = applicant("kyc-3", "user-3", "Noor Hale", {
    status: "VERIFIED",
    verifiedAt: "2026-10-02T12:00:00.000Z",
});

const hold = () => {
    let settle: (value: IdentityDocument) => void = () => {};
    const promise = new Promise<IdentityDocument>((resolve) => {
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

const draw = () => render(<AdminVerificationConsole />, { wrapper });

const reviewing = () => screen.findByRole("heading", { level: 2 });

const row = (name: string) =>
    screen.findByRole("button", { name: new RegExp(`^${name}`) });

const decide = async (label: string) =>
    userEvent.click(await screen.findByRole("button", { name: label }));

const dialog = (name: string) => screen.findByRole("dialog", { name });

const gone = () =>
    waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

beforeEach(() => {
    queue.mockResolvedValue([IRWIN, ADA, NOOR]);
    approve.mockResolvedValue({ ...IRWIN, status: "VERIFIED" });
    reject.mockResolvedValue({ ...IRWIN, status: "REJECTED" });
});

describe("AdminVerificationConsole · reading the queue", () => {
    it("asks for every submission, not one page of them", async () => {
        draw();
        await reviewing();

        expect(queue).toHaveBeenCalledWith({});
    });

    it("shows the verification fallback when the queue fails, and recovers on retry", async () => {
        queue.mockRejectedValue(new Error("kyc down"));
        draw();
        const retry = await screen.findByRole("button", { name: /^retry$/i });

        queue.mockResolvedValue([IRWIN]);
        await userEvent.click(retry);

        expect(await reviewing()).toHaveTextContent("Irwin Lindgren");
    });

    it("opens on the pending submissions, counted on each filter", async () => {
        draw();
        await reviewing();

        expect(
            screen.getByRole("button", { name: /^Pending/ }),
        ).toHaveAttribute("aria-pressed", "true");
        expect(
            screen.getByRole("button", { name: /^Pending/ }),
        ).toHaveTextContent("2");
        expect(
            screen.queryByRole("button", { name: /^Noor Hale/ }),
        ).not.toBeInTheDocument();
    });

    it("reviews the submission picked from the queue", async () => {
        draw();
        await reviewing();

        await userEvent.click(await row("Ada Vance"));

        expect(await reviewing()).toHaveTextContent("Ada Vance");
    });

    it("says the queue is clear when nothing matches the filter", async () => {
        draw();
        await reviewing();

        await userEvent.click(
            screen.getByRole("button", { name: /^Rejected/ }),
        );

        expect(await screen.findByText("Queue clear")).toBeInTheDocument();
    });

    it("offers no decision on a submission that is already decided", async () => {
        draw();
        await reviewing();
        await userEvent.click(screen.getByRole("button", { name: /^All/ }));

        await userEvent.click(await row("Noor Hale"));

        expect(await reviewing()).toHaveTextContent("Noor Hale");
        expect(
            screen.queryByRole("button", { name: "Approve identity" }),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: "Reject" }),
        ).not.toBeInTheDocument();
    });
});

describe("AdminVerificationConsole · approving", () => {
    it("asks for confirmation instead of approving on the first click", async () => {
        draw();

        await decide("Approve identity");

        expect(await dialog("Approve verification")).toHaveTextContent(
            "Irwin Lindgren",
        );
        expect(approve).not.toHaveBeenCalled();
    });

    it("approves the submission under review, once, then closes", async () => {
        draw();
        await decide("Approve identity");

        await userEvent.click(
            within(await dialog("Approve verification")).getByRole("button", {
                name: "Approve identity",
            }),
        );

        await gone();
        expect(approve).toHaveBeenCalledExactlyOnceWith("kyc-1");
        expect(reject).not.toHaveBeenCalled();
    });

    it("sends nothing more and locks the queue's decisions while approving", async () => {
        const call = hold();
        approve.mockReturnValue(call.promise);
        draw();
        await decide("Approve identity");
        const confirm = within(await dialog("Approve verification")).getByRole(
            "button",
            { name: "Approve identity" },
        );

        await userEvent.click(confirm);
        await userEvent.click(confirm);

        expect(approve).toHaveBeenCalledTimes(1);
        expect(
            screen.getByRole("button", { name: "Reject", hidden: true }),
        ).toBeDisabled();

        call.settle({ ...IRWIN, status: "VERIFIED" });
        await gone();
    });

    it("keeps the confirmation open with the failure, and lets it be retried", async () => {
        approve.mockRejectedValueOnce(new Error("kyc down"));
        draw();
        await decide("Approve identity");
        const modal = within(await dialog("Approve verification"));

        await userEvent.click(
            modal.getByRole("button", { name: "Approve identity" }),
        );
        expect(
            await modal.findByText("The approval was not recorded"),
        ).toBeInTheDocument();

        await userEvent.click(
            modal.getByRole("button", { name: "Approve identity" }),
        );

        await gone();
        expect(approve).toHaveBeenCalledTimes(2);
    });
});

describe("AdminVerificationConsole · rejecting", () => {
    it("refuses a rejection until its reason has four real characters", async () => {
        draw();
        await decide("Reject");
        const modal = within(await dialog("Reject verification"));
        const submit = modal.getByRole("button", { name: "Reject document" });
        const reason = modal.getByLabelText("Reason for rejection");

        expect(submit).toBeDisabled();
        await userEvent.type(reason, "  abc  ");
        expect(submit).toBeDisabled();
        await userEvent.type(reason, "d");
        expect(submit).toBeEnabled();
        expect(reject).not.toHaveBeenCalled();
    });

    it("rejects the submission under review with the trimmed reason, once", async () => {
        draw();
        await decide("Reject");
        const modal = within(await dialog("Reject verification"));

        await userEvent.type(
            modal.getByLabelText("Reason for rejection"),
            "  Document has expired  ",
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Reject document" }),
        );

        await gone();
        expect(reject).toHaveBeenCalledExactlyOnceWith("kyc-1", {
            rejectionReason: "Document has expired",
        });
        expect(approve).not.toHaveBeenCalled();
    });

    it("sends nothing when the rejection is cancelled", async () => {
        draw();
        await decide("Reject");

        await userEvent.click(
            within(await dialog("Reject verification")).getByRole("button", {
                name: "Cancel",
            }),
        );

        await gone();
        expect(reject).not.toHaveBeenCalled();
    });

    it("keeps the reason and shows the failure when the rejection fails", async () => {
        reject.mockRejectedValueOnce(new Error("kyc down"));
        draw();
        await decide("Reject");
        const modal = within(await dialog("Reject verification"));
        await userEvent.type(
            modal.getByLabelText("Reason for rejection"),
            "Blurry photo",
        );

        await userEvent.click(
            modal.getByRole("button", { name: "Reject document" }),
        );

        expect(
            await modal.findByText("The rejection was not recorded"),
        ).toBeInTheDocument();
        expect(modal.getByLabelText("Reason for rejection")).toHaveValue(
            "Blurry photo",
        );
    });
});

describe("AdminVerificationConsole · links", () => {
    it("links the applicant to their profile and opens the document in a new tab", async () => {
        draw();
        await reviewing();

        expect(
            screen
                .getAllByRole("link")
                .some(
                    (link) =>
                        link.getAttribute("href") ===
                        ADMIN_ROUTES.user("user-1"),
                ),
        ).toBe(true);
        const documentLink = screen
            .getAllByRole("link")
            .find(
                (link) => link.getAttribute("href") === IRWIN.documentImageUrl,
            );
        expect(documentLink).toHaveAttribute("target", "_blank");
        expect(
            screen.getByRole("link", { name: "irwin@example.com" }),
        ).toHaveAttribute("href", "mailto:irwin@example.com");
    });
});
