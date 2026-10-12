import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosError, AxiosHeaders } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminUsersConsole } from "@/components/sections/admin/admin-users-console";
import { suspensionsAPI } from "@/lib/api/suspensions";
import { usersAPI } from "@/lib/api/users";
import { NETWORK_FAILURE } from "@/lib/config/feedback";
import { aMemberRecord, aSuspension } from "@/lib/data/__fixtures__/users";

vi.mock("@/lib/api/users", () => ({
    usersAPI: { list: vi.fn(), create: vi.fn() },
}));
vi.mock("@/lib/api/suspensions", () => ({
    suspensionsAPI: { create: vi.fn(), byUser: vi.fn(), lift: vi.fn() },
}));

const list = vi.mocked(usersAPI.list);
const create = vi.mocked(usersAPI.create);
const suspend = vi.mocked(suspensionsAPI.create);
const byUser = vi.mocked(suspensionsAPI.byUser);
const lift = vi.mocked(suspensionsAPI.lift);

const ADA = aMemberRecord();
const BEN = aMemberRecord({
    id: "usr_2",
    fullName: "Ben Ortiz",
    email: "ben@keyhol.me",
    role: "BUYER",
    status: "SUSPENDED",
});
const CARA = aMemberRecord({
    id: "usr_3",
    fullName: "Cara Lin",
    email: "cara@keyhol.me",
    role: "ADMIN",
});
const DEV = aMemberRecord({
    id: "usr_4",
    fullName: "Dev Patel",
    email: "dev@keyhol.me",
    role: "BUYER",
    status: "DELETED",
});

const conflict = (message: string) =>
    new AxiosError("Conflict", "ERR_BAD_REQUEST", undefined, undefined, {
        status: 409,
        statusText: "Conflict",
        headers: {},
        config: { headers: new AxiosHeaders() },
        data: { message },
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

const draw = () => render(<AdminUsersConsole />, { wrapper });

const directory = () =>
    screen.findByRole("list", { name: /^platform accounts/i });

const fromDetail = async (action: string, name: string) => {
    await userEvent.click(within(await directory()).getByText(name));
    await userEvent.click(
        within(await dialog(name)).getByRole("button", { name: action }),
    );
};

const dialog = (name: string) => screen.findByRole("dialog", { name });

const gone = (name: string) =>
    waitFor(() =>
        expect(screen.queryByRole("dialog", { name })).not.toBeInTheDocument(),
    );

const fillInvite = async (fields: Record<string, string>) => {
    const form = within(await dialog("Add a user"));
    for (const [label, value] of Object.entries(fields))
        await userEvent.type(form.getByLabelText(label), value);
    return form;
};

beforeEach(() => {
    list.mockResolvedValue([ADA, BEN, CARA, DEV]);
    create.mockResolvedValue(ADA);
    suspend.mockResolvedValue(aSuspension());
    byUser.mockResolvedValue([
        aSuspension({ id: "sus_old", liftedAt: "2026-07-01T09:00:00.000Z" }),
        aSuspension({ id: "sus_live", userId: "usr_2" }),
    ]);
    lift.mockResolvedValue(aSuspension({ id: "sus_live" }));
});

describe("AdminUsersConsole · reading the directory", () => {
    it("shows the users fallback when the directory fails and recovers on retry", async () => {
        list.mockRejectedValue(new Error("users down"));
        draw();
        const retry = await screen.findByRole("button", { name: /^retry$/i });

        list.mockResolvedValue([ADA]);
        await userEvent.click(retry);

        expect(await directory()).toBeInTheDocument();
    });

    it("says no account matches when the search finds nobody", async () => {
        draw();
        await directory();

        await userEvent.type(
            screen.getByRole("searchbox", {
                name: "Search accounts by name or email",
            }),
            "nobody-here",
        );

        expect(
            await screen.findByText("No account matches this view"),
        ).toBeInTheDocument();
    });

    it("finds an account by email as well as by name", async () => {
        draw();
        await directory();

        await userEvent.type(
            screen.getByRole("searchbox", {
                name: "Search accounts by name or email",
            }),
            "ben@",
        );

        const table = await directory();
        await waitFor(() =>
            expect(
                within(table).queryByText("Ada Vance"),
            ).not.toBeInTheDocument(),
        );
        expect(within(table).getByText("Ben Ortiz")).toBeInTheDocument();
    });

    it("narrows the directory to the status tile that was picked", async () => {
        draw();
        await directory();

        await userEvent.click(
            screen.getByRole("button", { name: /^suspended/i }),
        );

        const table = await directory();
        await waitFor(() =>
            expect(
                within(table).queryByText("Ada Vance"),
            ).not.toBeInTheDocument(),
        );
        expect(within(table).getByText("Ben Ortiz")).toBeInTheDocument();
    });

    it("starts again from the first page when a filter changes", async () => {
        list.mockResolvedValue(
            Array.from({ length: 12 }, (_, index) =>
                aMemberRecord({
                    id: `usr_${index}`,
                    fullName: `Member ${String(index).padStart(2, "0")}`,
                    email: `m${index}@keyhol.me`,
                }),
            ),
        );
        draw();
        await directory();

        await userEvent.click(
            screen.getByRole("button", { name: "Next page" }),
        );
        await userEvent.type(
            screen.getByRole("searchbox", {
                name: "Search accounts by name or email",
            }),
            "Member",
        );

        expect(
            await screen.findByRole("button", { name: "Previous page" }),
        ).toBeDisabled();
    });
});

describe("AdminUsersConsole · which accounts can be acted on", () => {
    it.each([
        ["suspension on an active member", "Ada Vance", "Suspend"],
        ["reactivation on a suspended one", "Ben Ortiz", "Reactivate"],
    ])("offers %s", async (_, name, action) => {
        draw();
        await userEvent.click(within(await directory()).getByText(name));

        expect(
            within(await dialog(name)).getByRole("button", { name: action }),
        ).toBeInTheDocument();
    });

    it("offers suspension on a pending account through the suspension modal", async () => {
        list.mockResolvedValue([{ ...ADA, status: "PENDING" }, CARA]);
        draw();

        await fromDetail("Suspend", "Ada Vance");

        expect(await dialog("Suspend account")).toHaveTextContent("Ada Vance");
    });

    it.each([
        ["an admin, whom the platform will not suspend", "Cara Lin"],
        ["a deleted account", "Dev Patel"],
    ])("offers no suspension on %s", async (_, name) => {
        draw();
        await userEvent.click(within(await directory()).getByText(name));
        expect(
            within(await dialog(name)).queryByRole("button", {
                name: "Suspend",
            }),
        ).not.toBeInTheDocument();
    });
});

describe("AdminUsersConsole · suspending", () => {
    it("holds the suspension until the reason has at least four real characters", async () => {
        draw();
        await fromDetail("Suspend", "Ada Vance");
        const modal = within(await dialog("Suspend account"));
        const submit = modal.getByRole("button", { name: "Suspend account" });

        await userEvent.type(
            modal.getByLabelText("Reason for suspension"),
            "  ab  ",
        );

        expect(submit).toBeDisabled();
        expect(suspend).not.toHaveBeenCalled();
    });

    it("sends the trimmed reason and leaves an indefinite suspension without a duration", async () => {
        draw();
        await fromDetail("Suspend", "Ada Vance");
        const modal = within(await dialog("Suspend account"));

        await userEvent.type(
            modal.getByLabelText("Reason for suspension"),
            "  Fake listings  ",
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Suspend account" }),
        );

        await gone("Suspend account");
        expect(suspend).toHaveBeenCalledExactlyOnceWith({
            userId: "usr_1",
            reason: "Fake listings",
            duration: undefined,
            notes: undefined,
        });
    });

    it("sends a picked duration as a number of days", async () => {
        draw();
        await fromDetail("Suspend", "Ada Vance");
        const modal = within(await dialog("Suspend account"));

        await userEvent.type(
            modal.getByLabelText("Reason for suspension"),
            "Fake listings",
        );
        await userEvent.click(
            modal.getByRole("combobox", { name: "Duration" }),
        );
        await userEvent.click(
            await screen.findByRole("option", { name: "30 days" }),
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Suspend account" }),
        );

        await gone("Suspend account");
        expect(suspend).toHaveBeenCalledWith(
            expect.objectContaining({ duration: 30 }),
        );
    });

    it("keeps the modal and the reason when the suspension fails", async () => {
        suspend.mockRejectedValueOnce(new Error("suspensions down"));
        draw();
        await fromDetail("Suspend", "Ada Vance");
        const modal = within(await dialog("Suspend account"));

        await userEvent.type(
            modal.getByLabelText("Reason for suspension"),
            "Fake listings",
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Suspend account" }),
        );

        expect(
            await modal.findByText("The account was not suspended"),
        ).toBeInTheDocument();
        expect(modal.getByLabelText("Reason for suspension")).toHaveValue(
            "Fake listings",
        );
    });

    it("closes without suspending when cancelled", async () => {
        draw();
        await fromDetail("Suspend", "Ada Vance");

        await userEvent.click(
            within(await dialog("Suspend account")).getByRole("button", {
                name: "Cancel",
            }),
        );

        await gone("Suspend account");
        expect(suspend).not.toHaveBeenCalled();
    });
});

describe("AdminUsersConsole · reactivating", () => {
    it("asks for confirmation instead of reactivating on the first click", async () => {
        draw();

        await fromDetail("Reactivate", "Ben Ortiz");

        expect(await dialog("Reactivate account")).toHaveTextContent(
            "Ben Ortiz",
        );
        expect(byUser).not.toHaveBeenCalled();
    });

    it("lifts the suspension still in force, not one already lifted", async () => {
        draw();
        await fromDetail("Reactivate", "Ben Ortiz");

        await userEvent.click(
            within(await dialog("Reactivate account")).getByRole("button", {
                name: "Reactivate account",
            }),
        );

        await gone("Reactivate account");
        expect(byUser).toHaveBeenCalledExactlyOnceWith("usr_2");
        expect(lift).toHaveBeenCalledExactlyOnceWith("sus_live");
    });

    it("reports a failure when there is no suspension left to lift", async () => {
        byUser.mockResolvedValue([
            aSuspension({ liftedAt: "2026-07-01T09:00:00.000Z" }),
        ]);
        draw();
        await fromDetail("Reactivate", "Ben Ortiz");
        const modal = within(await dialog("Reactivate account"));

        await userEvent.click(
            modal.getByRole("button", { name: "Reactivate account" }),
        );

        expect(
            await modal.findByText("The account was not reactivated"),
        ).toBeInTheDocument();
        expect(lift).not.toHaveBeenCalled();
    });
});

describe("AdminUsersConsole · adding a user", () => {
    it("shows what is wrong with the details and sends nothing", async () => {
        draw();
        await userEvent.click(
            await screen.findByRole("button", { name: "Add User" }),
        );
        const form = await fillInvite({
            "Full name": "Al",
            "Email address": "not-an-email",
            "Starting password": "short",
        });

        await userEvent.click(
            form.getByRole("button", { name: "Create account" }),
        );

        expect(
            form.getByText("Enter a valid email address"),
        ).toBeInTheDocument();
        expect(create).not.toHaveBeenCalled();
    });

    it("creates the account without a phone number when none is given, then closes", async () => {
        draw();
        await userEvent.click(
            await screen.findByRole("button", { name: "Add User" }),
        );
        const form = await fillInvite({
            "Full name": "Eve Stone",
            "Email address": "eve@keyhol.me",
            "Starting password": "s3cure-pass",
        });

        await userEvent.click(
            form.getByRole("button", { name: "Create account" }),
        );

        await gone("Add a user");
        expect(create).toHaveBeenCalledExactlyOnceWith({
            fullName: "Eve Stone",
            email: "eve@keyhol.me",
            password: "s3cure-pass",
            role: "BUYER",
        });
    });

    it.each([
        [
            "the reason the platform gave",
            conflict("An account with this email already exists"),
            "An account with this email already exists",
        ],
        [
            "a network failure as a network failure",
            new AxiosError("Network Error", "ERR_NETWORK"),
            NETWORK_FAILURE,
        ],
    ])(
        "keeps the form open and states %s when creation fails",
        async (_, error, shown) => {
            create.mockRejectedValueOnce(error);
            draw();
            await userEvent.click(
                await screen.findByRole("button", { name: "Add User" }),
            );
            const form = await fillInvite({
                "Full name": "Eve Stone",
                "Email address": "eve@keyhol.me",
                "Starting password": "s3cure-pass",
            });

            await userEvent.click(
                form.getByRole("button", { name: "Create account" }),
            );

            expect(await form.findByText(shown)).toBeInTheDocument();
            expect(form.getByLabelText("Full name")).toHaveValue("Eve Stone");
        },
    );
});

describe("AdminUsersConsole · reviewing", () => {
    it("hands a suspension started in the review over to its modal", async () => {
        draw();
        await userEvent.click(within(await directory()).getByText("Ada Vance"));

        await userEvent.click(
            within(await dialog("Ada Vance")).getByRole("button", {
                name: "Suspend",
            }),
        );

        expect(await dialog("Suspend account")).toBeInTheDocument();
        await gone("Ada Vance");
    });

    it("links the review to the full profile", async () => {
        draw();
        await userEvent.click(within(await directory()).getByText("Ada Vance"));

        expect(
            within(await dialog("Ada Vance")).getByRole("link", {
                name: "View profile",
            }),
        ).toHaveAttribute("href", "/admin/users/usr_1");
    });
});

const hold = <T,>() => {
    let release: (value: T) => void = () => {};
    const promise = new Promise<T>((resolve) => {
        release = resolve;
    });
    return { promise, release: (value: T) => release(value) };
};

const directoryNames = async () =>
    within(await directory())
        .getAllByRole("listitem")
        .map((row) => row.textContent ?? "");

describe("AdminUsersConsole · while a decision is in flight", () => {
    it("keeps the suspension modal open and its cancel locked until the request settles", async () => {
        const call = hold<ReturnType<typeof aSuspension>>();
        suspend.mockReturnValue(call.promise);
        draw();
        await fromDetail("Suspend", "Ada Vance");
        const modal = within(await dialog("Suspend account"));

        await userEvent.type(
            modal.getByLabelText("Reason for suspension"),
            "Fake listings",
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Suspend account" }),
        );
        await userEvent.click(
            modal.getByRole("button", { name: "Suspend account" }),
        );

        expect(modal.getByRole("button", { name: "Cancel" })).toBeDisabled();
        expect(suspend).toHaveBeenCalledTimes(1);

        call.release(aSuspension());
        await gone("Suspend account");
    });

    it("keeps the reactivation confirmation open and its cancel locked until the request settles", async () => {
        const call = hold<ReturnType<typeof aSuspension>>();
        lift.mockReturnValue(call.promise);
        draw();
        await fromDetail("Reactivate", "Ben Ortiz");
        const confirm = within(await dialog("Reactivate account"));

        await userEvent.click(
            confirm.getByRole("button", { name: "Reactivate account" }),
        );

        await waitFor(() =>
            expect(
                confirm.getByRole("button", { name: "Cancel" }),
            ).toBeDisabled(),
        );
        expect(lift).toHaveBeenCalledOnce();

        call.release(aSuspension({ id: "sus_live" }));
        await gone("Reactivate account");
    });

    it("does not close the new account form while it is being created", async () => {
        const call = hold<typeof ADA>();
        create.mockReturnValue(call.promise);
        draw();
        await userEvent.click(
            await screen.findByRole("button", { name: "Add User" }),
        );
        const form = await fillInvite({
            "Full name": "Eve Stone",
            "Email address": "eve@keyhol.me",
            "Starting password": "s3cure-pass",
        });

        await userEvent.click(
            form.getByRole("button", { name: "Create account" }),
        );
        await userEvent.click(form.getByRole("button", { name: "Cancel" }));

        expect(
            screen.getByRole("dialog", { name: "Add a user" }),
        ).toBeVisible();

        call.release(ADA);
        await gone("Add a user");
    });
});

describe("AdminUsersConsole · acting from the review", () => {
    it("hands a reactivation started in the review over to its confirmation", async () => {
        draw();
        await userEvent.click(within(await directory()).getByText("Ben Ortiz"));

        await userEvent.click(
            within(await dialog("Ben Ortiz")).getByRole("button", {
                name: "Reactivate",
            }),
        );

        expect(await dialog("Reactivate account")).toBeInTheDocument();
        await gone("Ben Ortiz");
    });

    it("starts every new account form empty", async () => {
        draw();
        await userEvent.click(
            await screen.findByRole("button", { name: "Add User" }),
        );
        const first = await fillInvite({ "Full name": "Half typed" });
        await userEvent.click(first.getByRole("button", { name: "Cancel" }));
        await gone("Add a user");

        await userEvent.click(screen.getByRole("button", { name: "Add User" }));

        expect(
            within(await dialog("Add a user")).getByLabelText("Full name"),
        ).toHaveValue("");
    });
});

describe("AdminUsersConsole · browsing", () => {
    it("narrows the directory to the role that was picked", async () => {
        draw();
        await directory();

        await userEvent.click(
            screen.getByRole("combobox", { name: "Filter by role" }),
        );
        await userEvent.click(
            await screen.findByRole("option", { name: /^admins/i }),
        );

        await waitFor(async () =>
            expect(await directoryNames()).toEqual([
                expect.stringContaining("Cara Lin"),
            ]),
        );
    });

    it("orders the directory by name when that sort is picked", async () => {
        draw();
        await directory();

        await userEvent.click(
            screen.getByRole("combobox", { name: "Sort the directory" }),
        );
        await userEvent.click(
            await screen.findByRole("option", { name: "Name" }),
        );

        await waitFor(async () => {
            const names = await directoryNames();
            expect(names[0]).toContain("Ada Vance");
            expect(names[3]).toContain("Dev Patel");
        });
    });

    it("moves to the next page of accounts", async () => {
        list.mockResolvedValue(
            Array.from({ length: 12 }, (_, index) =>
                aMemberRecord({
                    id: `usr_${index}`,
                    fullName: `Member ${String(index).padStart(2, "0")}`,
                    email: `m${index}@keyhol.me`,
                }),
            ),
        );
        draw();
        await userEvent.click(
            screen.getByRole("combobox", { name: "Sort the directory" }),
        );
        await userEvent.click(
            await screen.findByRole("option", { name: "Name" }),
        );

        await userEvent.click(
            screen.getByRole("button", { name: "Next page" }),
        );

        await waitFor(async () =>
            expect(await directoryNames()).toEqual([
                expect.stringContaining("Member 10"),
                expect.stringContaining("Member 11"),
            ]),
        );
    });
});

describe("AdminUsersConsole · what needs a decision", () => {
    it("ranks deleted accounts last when ordering by what needs attention", async () => {
        draw();
        await directory();
        await userEvent.click(
            screen.getByRole("combobox", { name: "Sort the directory" }),
        );
        await userEvent.click(
            await screen.findByRole("option", { name: "Needs attention" }),
        );

        await waitFor(async () => {
            const names = await directoryNames();
            expect(names[0]).toContain("Ben Ortiz");
            expect(names.at(-1)).toContain("Dev Patel");
        });
    });
});

const statusBand = () =>
    screen.findByRole("region", {
        name: "Filter the directory by account status",
    });

describe("AdminUsersConsole · reading the numbers", () => {
    it("counts each status and its share of the directory on its tile", async () => {
        draw();
        const band = within(await statusBand());

        await waitFor(() =>
            expect(
                band.getByRole("button", { name: /^active/i }),
            ).toHaveTextContent(/2\s*50%/),
        );
        expect(
            band.getByRole("button", { name: /^suspended/i }),
        ).toHaveTextContent(/1\s*25%/);
        expect(band.getByRole("button", { name: /^all/i })).toHaveTextContent(
            "4",
        );
    });

    it("marks the status tile in use as pressed", async () => {
        draw();
        const band = within(await statusBand());
        const suspended = band.getByRole("button", { name: /^suspended/i });

        await userEvent.click(suspended);

        expect(suspended).toHaveAttribute("aria-pressed", "true");
        expect(band.getByRole("button", { name: /^all/i })).toHaveAttribute(
            "aria-pressed",
            "false",
        );
    });

    it("claims no count on any tile while the directory is loading", async () => {
        list.mockReturnValue(new Promise(() => {}));
        draw();
        const band = within(await statusBand());

        for (const button of band.getAllByRole("button")) {
            expect(button).toHaveTextContent("—");
            expect(button).not.toHaveTextContent("%");
        }
    });

    it("claims no role mix, sign-ups, recency or leaders while the directory is loading", async () => {
        list.mockReturnValue(new Promise(() => {}));
        draw();
        await statusBand();

        expect(screen.queryByText(/0 buyers/)).toBeNull();
        expect(screen.queryByText(/joined in/)).toBeNull();
        expect(screen.queryByText("No volume yet")).toBeNull();
        expect(
            screen.queryByRole("list", { name: /^Live accounts by how/ }),
        ).toBeNull();
        expect(
            screen.getByRole("combobox", { name: "Filter by role" }),
        ).not.toHaveTextContent("·");
    });

    it("labels each role filter with how many accounts it holds", async () => {
        draw();
        await directory();

        await userEvent.click(
            screen.getByRole("combobox", { name: "Filter by role" }),
        );

        expect(
            await screen.findByRole("option", { name: "Buyers · 2" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("option", { name: "Admins · 1" }),
        ).toBeInTheDocument();
    });

    it("ranks the book by lifetime volume and opens an account from it", async () => {
        list.mockResolvedValue([
            aMemberRecord({ volume: 2_000_000 }),
            { ...BEN, volume: 6_000_000 },
            CARA,
        ]);
        draw();
        const book = within(
            await screen.findByRole("list", {
                name: "Accounts ranked by lifetime volume",
            }),
        );

        const [first, second] = book.getAllByRole("button");
        expect(first).toHaveTextContent("Ben Ortiz");
        expect(second).toHaveTextContent("Ada Vance");
        expect(book.queryByText("Cara Lin")).not.toBeInTheDocument();

        await userEvent.click(first);
        expect(await dialog("Ben Ortiz")).toBeInTheDocument();
    });
});
