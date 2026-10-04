import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminOverviewConsole } from "@/components/sections/admin/admin-overview-console";
import { auditLogsAPI } from "@/lib/api/audit-logs";
import { disputesAPI } from "@/lib/api/disputes";
import { flagsAPI } from "@/lib/api/flags";
import { kycAPI } from "@/lib/api/kyc";
import { serviceHealthAPI } from "@/lib/api/service-health";
import { statsAPI } from "@/lib/api/stats";
import { usersAPI } from "@/lib/api/users";
import { ADMIN_ROUTES } from "@/lib/constants";
import {
    aDisputeCount,
    aFlagCount,
    aHealthReadout,
    aKycCount,
    aPlatform,
    aTrend,
    aUserCount,
    anAuditLog,
    anAuditPage,
} from "@/lib/data/__fixtures__/admin";

vi.mock("@/lib/api/stats", () => ({
    statsAPI: { platform: vi.fn(), users: vi.fn(), trend: vi.fn() },
}));
vi.mock("@/lib/api/users", () => ({ usersAPI: { list: vi.fn() } }));
vi.mock("@/lib/api/flags", () => ({ flagsAPI: { counts: vi.fn() } }));
vi.mock("@/lib/api/kyc", () => ({ kycAPI: { counts: vi.fn() } }));
vi.mock("@/lib/api/disputes", () => ({ disputesAPI: { counts: vi.fn() } }));
vi.mock("@/lib/api/service-health", () => ({
    serviceHealthAPI: { list: vi.fn() },
}));
vi.mock("@/lib/api/audit-logs", () => ({
    auditLogsAPI: { list: vi.fn() },
}));

const platform = vi.mocked(statsAPI.platform);
const userCount = vi.mocked(statsAPI.users);
const trend = vi.mocked(statsAPI.trend);
const directory = vi.mocked(usersAPI.list);
const flagCount = vi.mocked(flagsAPI.counts);
const kycCount = vi.mocked(kycAPI.counts);
const disputeCount = vi.mocked(disputesAPI.counts);
const health = vi.mocked(serviceHealthAPI.list);
const audit = vi.mocked(auditLogsAPI.list);

const never = () => new Promise<never>(() => {});

const wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

const draw = () => render(<AdminOverviewConsole />, { wrapper });

const panel = (title: string) =>
    screen.findByRole("region", { name: new RegExp(`^${title}$`, "i") });

const tile = async (label: string) =>
    within(await panel("decisions"))
        .getAllByRole("link")
        .find((link) => within(link).queryByText(label) !== null);

beforeEach(() => {
    platform.mockResolvedValue(aPlatform());
    userCount.mockResolvedValue(aUserCount({ total: 4, pending: 3 }));
    trend.mockResolvedValue(aTrend());
    directory.mockResolvedValue([]);
    flagCount.mockResolvedValue(aFlagCount());
    kycCount.mockResolvedValue(aKycCount());
    disputeCount.mockResolvedValue(aDisputeCount());
    health.mockResolvedValue(aHealthReadout());
    audit.mockResolvedValue(anAuditPage([anAuditLog()]));
});

describe("AdminOverviewConsole · navigating", () => {
    it.each([
        ["Verifications", ADMIN_ROUTES.verifications],
        ["Listing review", ADMIN_ROUTES.listings],
        ["Flagged content", ADMIN_ROUTES.flags],
        ["Disputes", ADMIN_ROUTES.disputes],
        ["Account approvals", ADMIN_ROUTES.users],
    ])("opens the %s queue from its tile", async (label, href) => {
        draw();

        expect(await tile(label)).toHaveAttribute("href", href);
    });

    it.each([
        ["Deals closed", ADMIN_ROUTES.transactions],
        ["New listings", ADMIN_ROUTES.listings],
        ["New members", ADMIN_ROUTES.users],
    ])("opens the screen behind the %s figure", async (label, href) => {
        draw();
        const volume = await panel("volume");

        expect(within(volume).getByText(label).closest("a")).toHaveAttribute(
            "href",
            href,
        );
    });

    it.each([
        ["volume", "Payments", ADMIN_ROUTES.payments],
        ["health", "Settings", ADMIN_ROUTES.settings],
        ["members", "Users", ADMIN_ROUTES.users],
        ["activity", "Reports", ADMIN_ROUTES.reports],
    ])(
        "links the %s panel to the screen it summarises",
        async (title, label, href) => {
            draw();

            expect(
                within(await panel(title)).getByRole("link", { name: label }),
            ).toHaveAttribute("href", href);
        },
    );

    it("offers platform reports from the header", async () => {
        draw();

        expect(
            await screen.findByRole("link", { name: "Platform Reports" }),
        ).toHaveAttribute("href", ADMIN_ROUTES.reports);
    });
});

describe("AdminOverviewConsole · recovering", () => {
    it.each([
        ["platform stats", platform],
        ["member counts", userCount],
    ])(
        "shows the overview fallback instead of the page when %s fail, then retries both",
        async (_, failing) => {
            failing.mockRejectedValueOnce(new Error("stats down"));
            draw();

            expect(
                await screen.findByText(/couldn't load platform metrics/i),
            ).toBeInTheDocument();
            expect(
                screen.queryByRole("region", { name: /^decisions$/i }),
            ).not.toBeInTheDocument();

            await userEvent.click(
                screen.getByRole("button", { name: /^retry$/i }),
            );

            expect(await panel("decisions")).toBeInTheDocument();
            expect(platform).toHaveBeenCalledTimes(2);
            expect(userCount).toHaveBeenCalledTimes(2);
        },
    );
});

describe("AdminOverviewConsole · a failing source stays contained", () => {
    it("keeps every other panel when the audit log fails", async () => {
        audit.mockRejectedValue(new Error("log down"));
        draw();

        expect(
            await within(await panel("activity")).findByText(
                "Audit log unavailable",
            ),
        ).toBeInTheDocument();
        expect(await panel("decisions")).toBeInTheDocument();
        expect(await panel("members")).toBeInTheDocument();
    });

    it("says service health is unavailable rather than that there is no traffic", async () => {
        health.mockRejectedValue(new Error("health down"));
        draw();
        const healthPanel = await panel("health");

        expect(
            (
                await within(healthPanel).findAllByText(
                    "Service health unavailable",
                )
            ).length,
        ).toBeGreaterThan(0);
        expect(
            within(healthPanel).queryByText("No traffic recorded yet"),
        ).not.toBeInTheDocument();
    });

    it("says monthly volume is unavailable rather than that nothing has settled", async () => {
        trend.mockRejectedValue(new Error("trend down"));
        draw();
        const volume = await panel("volume");

        expect(
            (await within(volume).findAllByText("Monthly volume unavailable"))
                .length,
        ).toBeGreaterThan(0);
        expect(
            within(volume).queryByText("No settled volume yet"),
        ).not.toBeInTheDocument();
    });

    it("does not call a queue clear when its count failed", async () => {
        flagCount.mockRejectedValue(new Error("flags down"));
        draw();

        expect(
            await within(await panel("decisions")).findByText(
                /a queue did not report/i,
            ),
        ).toBeInTheDocument();
        const flags = await tile("Flagged content");
        expect(within(flags!).getAllByText("—").length).toBeGreaterThan(0);
        expect(within(flags!).queryByText("Clear")).not.toBeInTheDocument();
    });

    it("claims no count while the queues are still reporting", async () => {
        kycCount.mockImplementation(never);
        draw();

        expect(
            await within(await panel("decisions")).findByText(
                /counting open decisions/i,
            ),
        ).toBeInTheDocument();
        const verifications = await tile("Verifications");
        expect(within(verifications!).queryByText("0")).not.toBeInTheDocument();
    });

    it("still counts account approvals while the queues are reporting", async () => {
        kycCount.mockImplementation(never);
        draw();

        const accounts = await tile("Account approvals");
        expect(await within(accounts!).findByText("3")).toBeInTheDocument();
    });
});
