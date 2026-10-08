import type { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConsoleSkeleton } from "@/components/patterns/console-skeleton";
import { AdminOverviewConsole } from "@/components/sections/admin/admin-overview-console";
import { AdminPaymentsConsole } from "@/components/sections/admin/admin-payments-console";
import { AdminTransactionsConsole } from "@/components/sections/admin/admin-transactions-console";
import { AdminUserProfileConsole } from "@/components/sections/admin/admin-user-profile-console";
import { AdminUsersConsole } from "@/components/sections/admin/admin-users-console";
import { ModerationConsole } from "@/components/sections/admin/moderation-console";
import { auditLogsAPI } from "@/lib/api/audit-logs";
import { disputesAPI } from "@/lib/api/disputes";
import { escrowAPI } from "@/lib/api/escrow";
import { flagsAPI } from "@/lib/api/flags";
import { kycAPI } from "@/lib/api/kyc";
import { serviceHealthAPI } from "@/lib/api/service-health";
import { statsAPI } from "@/lib/api/stats";
import { suspensionsAPI } from "@/lib/api/suspensions";
import { transactionsAPI } from "@/lib/api/transactions";
import { usersAPI } from "@/lib/api/users";
import { consoleSkeletonFor } from "@/lib/config/console-skeletons";
import { ADMIN_ROUTES } from "@/lib/constants";
import { aMemberRecord } from "@/lib/data/__fixtures__/users";

vi.mock("@/lib/api/stats", () => ({
    statsAPI: { platform: vi.fn(), users: vi.fn(), trend: vi.fn() },
}));
vi.mock("@/lib/api/users", () => ({
    usersAPI: { list: vi.fn(), detail: vi.fn() },
}));
vi.mock("@/lib/api/flags", () => ({
    flagsAPI: { counts: vi.fn(), list: vi.fn() },
}));
vi.mock("@/lib/api/kyc", () => ({ kycAPI: { counts: vi.fn() } }));
vi.mock("@/lib/api/disputes", () => ({ disputesAPI: { counts: vi.fn() } }));
vi.mock("@/lib/api/service-health", () => ({
    serviceHealthAPI: { list: vi.fn() },
}));
vi.mock("@/lib/api/audit-logs", () => ({ auditLogsAPI: { list: vi.fn() } }));
vi.mock("@/lib/api/transactions", () => ({
    transactionsAPI: { ledger: vi.fn(), stages: vi.fn() },
}));
vi.mock("@/lib/api/escrow", () => ({
    escrowAPI: { holds: vi.fn(), stages: vi.fn() },
}));
vi.mock("@/lib/api/suspensions", () => ({
    suspensionsAPI: { byUser: vi.fn() },
}));
vi.mock("next/navigation", () => ({
    usePathname: () => "/admin",
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
    useSearchParams: () => new URLSearchParams(),
}));

const SOURCES: object[] = [
    statsAPI,
    usersAPI,
    flagsAPI,
    kycAPI,
    disputesAPI,
    serviceHealthAPI,
    auditLogsAPI,
    transactionsAPI,
    escrowAPI,
    suspensionsAPI,
];

const MEMBER = aMemberRecord();
const GRID = /^(console-split|review-split|card-grid)/;

const FRAMES: { path: string; page: ReactElement }[] = [
    { path: ADMIN_ROUTES.overview, page: <AdminOverviewConsole /> },
    { path: ADMIN_ROUTES.listings, page: <ModerationConsole /> },
    { path: ADMIN_ROUTES.users, page: <AdminUsersConsole /> },
    {
        path: ADMIN_ROUTES.user(MEMBER.id),
        page: <AdminUserProfileConsole userId={MEMBER.id} />,
    },
    { path: ADMIN_ROUTES.transactions, page: <AdminTransactionsConsole /> },
    { path: ADMIN_ROUTES.payments, page: <AdminPaymentsConsole /> },
];

const never = () => new Promise<never>(() => {});

const wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

const frameOf = (container: HTMLElement) =>
    Array.from(container.firstElementChild?.children ?? [], (block) => {
        const grid = Array.from(block.classList).filter((name) =>
            GRID.test(name),
        );
        if (grid.length === 0) return "block";

        const cells = Array.from(
            block.children,
            (cell) =>
                Array.from(cell.classList).find((name) =>
                    name.startsWith("console-span-"),
                ) ?? "cell",
        );
        return `${grid.sort().join(" ")} [${cells.join(" ")}]`;
    });

const skeletonFrame = (path: string) =>
    frameOf(
        render(<ConsoleSkeleton variant={consoleSkeletonFor(path)} />)
            .container,
    );

beforeEach(() => {
    for (const source of SOURCES)
        for (const call of Object.values(source))
            vi.mocked(call as () => Promise<never>).mockImplementation(never);
});

describe("admin consoles · the frame a route skeleton stands in for", () => {
    it.each(FRAMES)(
        "draws $path, while its sources are still answering, in the frame its skeleton drew",
        async ({ path, page }) => {
            vi.mocked(usersAPI.detail).mockResolvedValue(MEMBER);
            const { container } = render(page, { wrapper });
            await within(container).findByRole("heading", { level: 1 });

            expect(frameOf(container)).toEqual(skeletonFrame(path));
        },
    );

    it("stands the user profile in its own route skeleton until the account answers", () => {
        const { container } = render(
            <AdminUserProfileConsole userId={MEMBER.id} />,
            { wrapper },
        );

        expect(container.firstElementChild).toHaveAttribute(
            "aria-busy",
            "true",
        );
        expect(frameOf(container)).toEqual(
            skeletonFrame(ADMIN_ROUTES.user(MEMBER.id)),
        );
    });
});
