import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminUserProfileConsole } from "@/components/sections/admin/admin-user-profile-console";
import { auditLogsAPI } from "@/lib/api/audit-logs";
import { suspensionsAPI } from "@/lib/api/suspensions";
import { transactionsAPI } from "@/lib/api/transactions";
import { usersAPI } from "@/lib/api/users";
import { anAuditPage } from "@/lib/data/__fixtures__/admin";
import { aMemberRecord } from "@/lib/data/__fixtures__/users";

vi.mock("@/lib/api/users", () => ({ usersAPI: { detail: vi.fn() } }));
vi.mock("@/lib/api/suspensions", () => ({
    suspensionsAPI: { byUser: vi.fn(), create: vi.fn(), lift: vi.fn() },
}));
vi.mock("@/lib/api/transactions", () => ({
    transactionsAPI: { ledger: vi.fn() },
}));
vi.mock("@/lib/api/audit-logs", () => ({ auditLogsAPI: { list: vi.fn() } }));
vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

const detail = vi.mocked(usersAPI.detail);
const suspensions = vi.mocked(suspensionsAPI.byUser);
const ledger = vi.mocked(transactionsAPI.ledger);
const audit = vi.mocked(auditLogsAPI.list);

const MEMBER = aMemberRecord();
const NEVER_SUSPENDED = "Never suspended";
const UNRECORDED = "Suspended, with no reason on record";
const NO_DEALS = "No deals on record yet";
const NOTHING_RECORDED = "Nothing recorded yet";

const never = () => new Promise<never>(() => {});

const wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

const draw = () =>
    render(<AdminUserProfileConsole userId={MEMBER.id} />, { wrapper });

const panel = async (title: string) =>
    within(
        (await screen.findByRole("heading", { name: title })).closest(
            "section",
        ) as HTMLElement,
    );

beforeEach(() => {
    detail.mockResolvedValue(MEMBER);
    suspensions.mockResolvedValue([]);
    ledger.mockResolvedValue([]);
    audit.mockResolvedValue(anAuditPage());
});

describe("AdminUserProfileConsole · restrictions", () => {
    it("calls an account never suspended once its suspension record answers empty", async () => {
        draw();

        expect(
            await (await panel("Restrictions")).findByText(NEVER_SUSPENDED),
        ).toBeInTheDocument();
    });

    it("says nothing about suspensions while the suspension record is loading", async () => {
        suspensions.mockImplementation(never);
        draw();
        const restrictions = await panel("Restrictions");

        expect(restrictions.queryByText(NEVER_SUSPENDED)).toBeNull();
        expect(restrictions.queryByText(UNRECORDED)).toBeNull();
    });

    it("does not call a suspended account unrecorded while its suspension record is loading", async () => {
        detail.mockResolvedValue(aMemberRecord({ status: "SUSPENDED" }));
        suspensions.mockImplementation(never);
        draw();

        expect(
            (await panel("Restrictions")).queryByText(UNRECORDED),
        ).toBeNull();
    });

    it("says the suspension record is unavailable rather than that the account was never suspended", async () => {
        suspensions.mockRejectedValue(new Error("suspensions down"));
        draw();
        const restrictions = await panel("Restrictions");

        expect(
            await restrictions.findByText(
                "The suspension record did not answer this time",
            ),
        ).toBeInTheDocument();
        expect(restrictions.queryByText(NEVER_SUSPENDED)).toBeNull();
    });
});

describe("AdminUserProfileConsole · deals and activity", () => {
    it("claims no deal count and no empty ledger while the ledger is loading", async () => {
        ledger.mockImplementation(never);
        draw();
        const deals = await panel("Deals");

        expect(deals.queryByText("0")).toBeNull();
        expect(deals.queryByText(NO_DEALS)).toBeNull();
    });

    it("says the ledger is unavailable rather than that the account has no deals", async () => {
        ledger.mockRejectedValue(new Error("ledger down"));
        draw();
        const deals = await panel("Deals");

        expect(
            await deals.findByText("The ledger did not answer this time"),
        ).toBeInTheDocument();
        expect(deals.queryByText("0")).toBeNull();
        expect(deals.queryByText(NO_DEALS)).toBeNull();
    });

    it("says the audit log is unavailable rather than that nothing was recorded", async () => {
        audit.mockRejectedValue(new Error("audit down"));
        draw();
        const activity = await panel("Recent activity");

        expect(
            await activity.findByText("The audit log did not answer this time"),
        ).toBeInTheDocument();
        expect(activity.queryByText(NOTHING_RECORDED)).toBeNull();
    });
});
