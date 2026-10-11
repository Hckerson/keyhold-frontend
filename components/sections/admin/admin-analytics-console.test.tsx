import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminAnalyticsConsole } from "@/components/sections/admin/admin-analytics-console";
import { disputesAPI } from "@/lib/api/disputes";
import { escrowAPI } from "@/lib/api/escrow";
import { flagsAPI } from "@/lib/api/flags";
import { kycAPI } from "@/lib/api/kyc";
import { statsAPI } from "@/lib/api/stats";
import { transactionsAPI } from "@/lib/api/transactions";
import { usersAPI } from "@/lib/api/users";
import { ADMIN_ROUTES } from "@/lib/constants";
import {
    aDisputeCount,
    aFlagCount,
    aKycCount,
    aPlatform,
    aTrend,
    aUserCount,
} from "@/lib/data/__fixtures__/admin";
import { anEscrowStage, aStage } from "@/lib/data/__fixtures__/transactions";
import { aMemberRecord } from "@/lib/data/__fixtures__/users";

vi.mock("@/lib/api/stats", () => ({
    statsAPI: {
        trend: vi.fn(),
        platform: vi.fn(),
        users: vi.fn(),
        regions: vi.fn(),
    },
}));
vi.mock("@/lib/api/users", () => ({
    usersAPI: { list: vi.fn(), tierDistribution: vi.fn() },
}));
vi.mock("@/lib/api/transactions", () => ({
    transactionsAPI: { stages: vi.fn() },
}));
vi.mock("@/lib/api/escrow", () => ({ escrowAPI: { stages: vi.fn() } }));
vi.mock("@/lib/api/flags", () => ({ flagsAPI: { counts: vi.fn() } }));
vi.mock("@/lib/api/kyc", () => ({ kycAPI: { counts: vi.fn() } }));
vi.mock("@/lib/api/disputes", () => ({ disputesAPI: { counts: vi.fn() } }));

const trend = vi.mocked(statsAPI.trend);
const platform = vi.mocked(statsAPI.platform);
const userCount = vi.mocked(statsAPI.users);
const regions = vi.mocked(statsAPI.regions);
const directory = vi.mocked(usersAPI.list);
const tiers = vi.mocked(usersAPI.tierDistribution);
const dealStages = vi.mocked(transactionsAPI.stages);
const escrowStages = vi.mocked(escrowAPI.stages);
const flagCount = vi.mocked(flagsAPI.counts);
const kycCount = vi.mocked(kycAPI.counts);
const disputeCount = vi.mocked(disputesAPI.counts);

const never = () => new Promise<never>(() => {});
const UNAVAILABLE = "Not available right now";

const wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

const draw = () => render(<AdminAnalyticsConsole />, { wrapper });

const panel = (title: string) =>
    screen.findByRole("region", { name: new RegExp(`^${title}$`) });

beforeEach(() => {
    trend.mockResolvedValue(aTrend());
    platform.mockResolvedValue(aPlatform({ transactions: 3 }));
    userCount.mockResolvedValue(aUserCount({ total: 4, active: 3 }));
    regions.mockResolvedValue([
        {
            region: "Carmel",
            listings: 4,
            avgPrice: 1_000_000,
            volume: 2_000_000,
        },
        { region: "Napa", listings: 2, avgPrice: 900_000, volume: 1_000_000 },
    ]);
    directory.mockResolvedValue([aMemberRecord()]);
    tiers.mockResolvedValue({
        total: 4,
        segments: [{ tier: "STANDARD", count: 4 }],
    });
    dealStages.mockResolvedValue([
        aStage({ status: "IN_PROGRESS", count: 2, volume: 2_000_000 }),
    ]);
    escrowStages.mockResolvedValue([
        anEscrowStage({ status: "HELD", count: 1, amount: 400_000 }),
    ]);
    flagCount.mockResolvedValue(aFlagCount());
    kycCount.mockResolvedValue(aKycCount());
    disputeCount.mockResolvedValue(aDisputeCount());
});

describe("AdminAnalyticsConsole · the time window", () => {
    it("reads the last twelve months until another window is picked", async () => {
        draw();

        await waitFor(() => expect(trend).toHaveBeenCalledWith("month"));
        expect(
            await screen.findByRole("button", { name: /^12 months/ }),
        ).toHaveAttribute("aria-pressed", "true");
    });

    it("re-reads the trends over five years when that window is picked", async () => {
        draw();
        await panel("Volume");

        await userEvent.click(screen.getByRole("button", { name: /^5 years/ }));

        await waitFor(() => expect(trend).toHaveBeenCalledWith("year"));
        expect(
            screen.getByRole("button", { name: /^5 years/ }),
        ).toHaveAttribute("aria-pressed", "true");
    });
});

describe("AdminAnalyticsConsole · links", () => {
    it.each([
        ["Volume", "Statement", ADMIN_ROUTES.reports],
        ["Supply & demand", "Users", ADMIN_ROUTES.users],
        ["Deal pipeline", "Transactions", ADMIN_ROUTES.transactions],
        ["Escrow", "Payments", ADMIN_ROUTES.payments],
        ["Trust & safety", "Dashboard", ADMIN_ROUTES.overview],
        ["Account status", "Users", ADMIN_ROUTES.users],
        ["Membership tiers", "Users", ADMIN_ROUTES.users],
        ["Markets", "Listings", ADMIN_ROUTES.listings],
    ])(
        "links the %s panel to the screen behind it",
        async (title, label, href) => {
            draw();

            expect(
                within(await panel(title)).getByRole("link", { name: label }),
            ).toHaveAttribute("href", href);
        },
    );
});

describe("AdminAnalyticsConsole · a failing source stays contained", () => {
    it("shows the analytics fallback only when the trends fail, and recovers on retry", async () => {
        trend.mockRejectedValue(new Error("stats down"));
        draw();
        const retry = await screen.findByRole("button", { name: /^retry$/i });
        expect(
            screen.getByText(/couldn't load platform analytics/i),
        ).toBeInTheDocument();

        trend.mockResolvedValue(aTrend());
        await userEvent.click(retry);

        expect(await panel("Volume")).toBeInTheDocument();
    });

    it.each([
        ["Markets", () => regions.mockRejectedValue(new Error("down"))],
        ["Membership tiers", () => tiers.mockRejectedValue(new Error("down"))],
        ["Escrow", () => escrowStages.mockRejectedValue(new Error("down"))],
        [
            "Trust & safety",
            () => flagCount.mockRejectedValue(new Error("down")),
        ],
        ["Deal pipeline", () => platform.mockRejectedValue(new Error("down"))],
    ])(
        "marks only the %s panel unavailable when its source fails",
        async (title, fail) => {
            fail();
            draw();

            expect(
                await within(await panel(title)).findByText(UNAVAILABLE),
            ).toBeInTheDocument();
            expect(await panel("Volume")).toBeInTheDocument();
            expect(screen.getAllByText(UNAVAILABLE)).toHaveLength(1);
            expect(
                screen.queryByRole("button", { name: /^retry$/i }),
            ).not.toBeInTheDocument();
        },
    );

    it("keeps the trends when the member directory fails", async () => {
        directory.mockRejectedValue(new Error("users down"));
        draw();

        await waitFor(async () =>
            expect(await panel("Supply & demand")).not.toHaveAttribute(
                "aria-busy",
            ),
        );
        await waitFor(() => expect(directory).toHaveBeenCalled());
        expect(await panel("Supply & demand")).toBeInTheDocument();
        expect(
            screen.queryByRole("button", { name: /^retry$/i }),
        ).not.toBeInTheDocument();
    });

    it("shows a panel as loading, not unavailable, while its source answers", async () => {
        escrowStages.mockImplementation(never);
        draw();
        const escrow = await panel("Escrow");

        expect(escrow).toHaveAttribute("aria-busy", "true");
        expect(within(escrow).queryByText(UNAVAILABLE)).not.toBeInTheDocument();
    });
});
