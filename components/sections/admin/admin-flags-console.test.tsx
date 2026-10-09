import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminFlagsConsole } from "@/components/sections/admin/admin-flags-console";
import { flagsAPI } from "@/lib/api/flags";
import { ADMIN_ROUTES } from "@/lib/constants";
import { aMemberFlag, aMessageFlag } from "@/lib/data/__fixtures__/flags";
import type { Flag } from "@/lib/validations/flag";

vi.mock("@/lib/api/flags", () => ({
    flagsAPI: { all: vi.fn(), resolve: vi.fn(), dismiss: vi.fn() },
}));

const all = vi.mocked(flagsAPI.all);
const resolve = vi.mocked(flagsAPI.resolve);
const dismiss = vi.mocked(flagsAPI.dismiss);

const MEMBER = aMemberFlag();
const MESSAGE = aMessageFlag({ createdAt: "2026-10-03T12:00:00.000Z" });
const UPHELD = aMemberFlag({
    id: "flg_upheld",
    status: "RESOLVED",
    resolvedAt: "2026-10-04T12:00:00.000Z",
    reason: "Fake reviews",
});

const hold = () => {
    let settle: (value: Flag) => void = () => {};
    const promise = new Promise<Flag>((resolveHold) => {
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

const draw = () => render(<AdminFlagsConsole />, { wrapper });

const reviewing = () => screen.findByRole("heading", { level: 2 });

const action = (name: string) => screen.findByRole("button", { name });

const dialog = (name: string) => screen.findByRole("dialog", { name });

const gone = () =>
    waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

const confirmIn = async (title: string, label: string) =>
    userEvent.click(
        within(await dialog(title)).getByRole("button", { name: label }),
    );

beforeEach(() => {
    all.mockImplementation((input = {}) =>
        Promise.resolve(input.type === "USER" ? [MEMBER, UPHELD] : [MESSAGE]),
    );
    resolve.mockResolvedValue({ ...MEMBER, status: "RESOLVED" });
    dismiss.mockResolvedValue({ ...MEMBER, status: "DISMISSED" });
});

describe("AdminFlagsConsole · reading the queue", () => {
    it("asks for every member and message report, and no listing reports", async () => {
        draw();
        await reviewing();

        expect(all.mock.calls.map(([input]) => input?.type).sort()).toEqual([
            "MESSAGE",
            "USER",
        ]);
    });

    it("shows the flags fallback when the queue fails, and recovers on retry", async () => {
        all.mockRejectedValue(new Error("flags down"));
        draw();
        const retry = await screen.findByRole("button", { name: /^retry$/i });

        all.mockResolvedValue([MEMBER]);
        await userEvent.click(retry);

        expect(await reviewing()).toHaveTextContent("Marcus Reyes");
    });

    it("opens on the open reports, counted on the filter", async () => {
        draw();
        await reviewing();

        const open = screen.getByRole("button", { name: /^Open/ });
        expect(open).toHaveAttribute("aria-pressed", "true");
        expect(open).toHaveTextContent("2");
        expect(
            screen.queryByRole("button", {
                name: /^Marcus Reyes.*Fake reviews/,
            }),
        ).not.toBeInTheDocument();
    });

    it("says nothing is flagged when the filter matches no report", async () => {
        draw();
        await reviewing();

        await userEvent.click(
            screen.getByRole("button", { name: /^Dismissed/ }),
        );

        expect(await screen.findByText("Nothing flagged")).toBeInTheDocument();
    });
});

describe("AdminFlagsConsole · reviewing a report", () => {
    it("links a member report to the member's profile", async () => {
        draw();
        await reviewing();

        expect(
            screen.getByRole("link", { name: "Open profile" }),
        ).toHaveAttribute("href", ADMIN_ROUTES.user("usr_9"));
    });

    it("quotes a reported message and links to its sender", async () => {
        draw();
        await reviewing();

        await userEvent.click(
            await screen.findByRole("button", { name: /Take it or leave it/ }),
        );

        expect(await reviewing()).toHaveTextContent("Take it or leave it");
        expect(
            screen.getByRole("link", { name: "Open sender" }),
        ).toHaveAttribute("href", ADMIN_ROUTES.user("usr_12"));
    });

    it("offers no decision on a report that is already closed", async () => {
        draw();
        await reviewing();
        await userEvent.click(screen.getByRole("button", { name: /^Upheld/ }));

        expect(await reviewing()).toHaveTextContent("Marcus Reyes");
        expect(
            screen.queryByRole("button", { name: "Uphold" }),
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: "Dismiss" }),
        ).not.toBeInTheDocument();
    });
});

describe("AdminFlagsConsole · deciding", () => {
    it("asks for confirmation instead of deciding on the first click", async () => {
        draw();

        await userEvent.click(await action("Uphold"));

        expect(await dialog("Uphold this report")).toHaveTextContent(
            "Marcus Reyes",
        );
        expect(resolve).not.toHaveBeenCalled();
        expect(dismiss).not.toHaveBeenCalled();
    });

    it("upholds the report under review, once, then closes", async () => {
        draw();
        await userEvent.click(await action("Uphold"));

        await confirmIn("Uphold this report", "Uphold report");

        await gone();
        expect(resolve).toHaveBeenCalledOnce();
        expect(resolve.mock.calls[0][0]).toBe("flg_member");
        expect(dismiss).not.toHaveBeenCalled();
    });

    it("dismisses the report under review, once, then closes", async () => {
        draw();
        await userEvent.click(await action("Dismiss"));

        await confirmIn("Dismiss this report", "Dismiss report");

        await gone();
        expect(dismiss).toHaveBeenCalledOnce();
        expect(dismiss.mock.calls[0][0]).toBe("flg_member");
        expect(resolve).not.toHaveBeenCalled();
    });

    it("sends nothing when the decision is cancelled", async () => {
        draw();
        await userEvent.click(await action("Uphold"));

        await confirmIn("Uphold this report", "Cancel");

        await gone();
        expect(resolve).not.toHaveBeenCalled();
    });

    it("sends nothing more and locks both decisions while one is in flight", async () => {
        const call = hold();
        resolve.mockReturnValue(call.promise);
        draw();
        await userEvent.click(await action("Uphold"));
        const confirm = within(await dialog("Uphold this report")).getByRole(
            "button",
            { name: "Uphold report" },
        );

        await userEvent.click(confirm);
        await userEvent.click(confirm);

        expect(resolve).toHaveBeenCalledTimes(1);
        expect(
            screen.getByRole("button", { name: "Dismiss", hidden: true }),
        ).toBeDisabled();

        call.settle({ ...MEMBER, status: "RESOLVED" });
        await gone();
    });

    it("keeps the confirmation open with the failure, and lets it be retried", async () => {
        resolve.mockRejectedValueOnce(new Error("flags down"));
        draw();
        await userEvent.click(await action("Uphold"));
        const modal = within(await dialog("Uphold this report"));

        await userEvent.click(
            modal.getByRole("button", { name: "Uphold report" }),
        );
        expect(
            await modal.findByText("The decision was not recorded"),
        ).toBeInTheDocument();

        await userEvent.click(
            modal.getByRole("button", { name: "Uphold report" }),
        );

        await gone();
        expect(resolve).toHaveBeenCalledTimes(2);
    });
});
