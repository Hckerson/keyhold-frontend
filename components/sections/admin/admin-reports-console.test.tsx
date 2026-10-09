import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminReportsConsole } from "@/components/sections/admin/admin-reports-console";
import { statsAPI } from "@/lib/api/stats";
import { aTrend } from "@/lib/data/__fixtures__/admin";
import { downloadCsv } from "@/lib/utils/download";
import type { TrendStats } from "@/lib/validations/stats";

vi.mock("@/lib/api/stats", () => ({
    statsAPI: { trend: vi.fn(), regions: vi.fn() },
}));
vi.mock("@/lib/utils/download", () => ({ downloadCsv: vi.fn() }));

const trend = vi.mocked(statsAPI.trend);
const regions = vi.mocked(statsAPI.regions);
const download = vi.mocked(downloadCsv);

const TWO_MONTHS = aTrend({
    gmv: [
        { name: "2026-07", value: 2_000_000 },
        { name: "2026-08", value: 1_000_000 },
    ],
    deals: [{ name: "2026-08", value: 2 }],
});

const hold = () => {
    let settle: (value: TrendStats) => void = () => {};
    const promise = new Promise<TrendStats>((resolve) => {
        settle = resolve;
    });
    return { promise, settle };
};

const wrapper = ({ children }: { children: ReactNode }) => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

const draw = () => render(<AdminReportsConsole />, { wrapper });

const statement = () => screen.findByRole("table");

const exportButton = () => screen.getByRole("button", { name: "Export" });

const exportDialog = async () => {
    await statement();
    await userEvent.click(exportButton());
    return within(await screen.findByRole("dialog", { name: "Export report" }));
};

const exported = () => {
    const [[sections, filename]] = download.mock.calls;
    return { titles: sections.map((section) => section.title), filename };
};

beforeEach(() => {
    trend.mockResolvedValue(TWO_MONTHS);
    regions.mockResolvedValue([
        {
            region: "Carmel",
            listings: 4,
            avgPrice: 1_000_000,
            volume: 2_000_000,
        },
    ]);
});

describe("AdminReportsConsole · the window", () => {
    it("reports the seven-day window day by day and exports it that way", async () => {
        draw();
        await statement();
        const today = new Date().toISOString().slice(0, 10);
        trend.mockResolvedValue(
            aTrend({ gmv: [{ name: today, value: 1_000 }], deals: [] }),
        );

        await userEvent.click(screen.getByRole("button", { name: /^7 days/ }));

        expect(await screen.findByText("Daily statement")).toBeInTheDocument();
        expect(screen.queryByText("Monthly statement")).not.toBeInTheDocument();
        expect(
            within(await statement()).getAllByText("7 days").length,
        ).toBeGreaterThan(0);

        await waitFor(() => expect(exportButton()).toBeEnabled());
        await userEvent.click(exportButton());
        const dialog = within(
            await screen.findByRole("dialog", { name: "Export report" }),
        );
        await userEvent.click(
            dialog.getByRole("button", { name: "Download CSV" }),
        );
        expect(exported()).toEqual({
            titles: ["Daily statement", "Markets"],
            filename: "platform-report-day.csv",
        });
    });

    it("reads the last twelve months until another window is picked", async () => {
        draw();
        await statement();

        expect(trend).toHaveBeenCalledWith("month");
        expect(
            screen.getByRole("button", { name: /^12 months/ }),
        ).toHaveAttribute("aria-pressed", "true");
    });

    it("holds export and dims the figures until the picked window has loaded", async () => {
        draw();
        await statement();
        const fiveYears = hold();
        trend.mockReturnValue(fiveYears.promise);

        await userEvent.click(screen.getByRole("button", { name: /^5 years/ }));

        expect(trend).toHaveBeenCalledWith("year");
        expect(exportButton()).toBeDisabled();
        expect(
            screen.getByRole("region", { name: "Selected window" }),
        ).toHaveAttribute("aria-busy", "true");

        fiveYears.settle(TWO_MONTHS);

        await waitFor(() => expect(exportButton()).toBeEnabled());
        expect(
            screen.getByRole("region", { name: "Selected window" }),
        ).not.toHaveAttribute("aria-busy");
    });

    it("says there are no months to report when the window is empty", async () => {
        trend.mockResolvedValue(aTrend());
        draw();

        expect(
            await screen.findByText("No months to report"),
        ).toBeInTheDocument();
    });
});

describe("AdminReportsConsole · exporting", () => {
    it("downloads both tables for the window on screen", async () => {
        draw();
        const dialog = await exportDialog();

        await userEvent.click(
            dialog.getByRole("button", { name: "Download CSV" }),
        );

        expect(download).toHaveBeenCalledOnce();
        expect(exported()).toEqual({
            titles: ["Monthly statement", "Markets"],
            filename: "platform-report-month.csv",
        });
        await waitFor(() =>
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
        );
    });

    it("leaves out a table that was unticked, and refuses to export nothing", async () => {
        draw();
        const dialog = await exportDialog();
        const download = dialog.getByRole("button", { name: "Download CSV" });

        await userEvent.click(dialog.getByRole("button", { name: /^Markets/ }));
        await userEvent.click(download);
        expect(exported().titles).toEqual(["Monthly statement"]);

        await userEvent.click(exportButton());
        const again = within(
            await screen.findByRole("dialog", { name: "Export report" }),
        );
        await userEvent.click(
            again.getByRole("button", { name: /^Monthly statement/ }),
        );
        expect(
            again.getByRole("button", { name: "Download CSV" }),
        ).toBeDisabled();
    });

    it("downloads nothing when the export is declined", async () => {
        draw();
        const dialog = await exportDialog();

        await userEvent.click(dialog.getByRole("button", { name: "Not now" }));

        await waitFor(() =>
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
        );
        expect(download).not.toHaveBeenCalled();
    });
});

describe("AdminReportsConsole · a failing source stays contained", () => {
    it("shows the reports fallback when the trends fail, and recovers on retry", async () => {
        trend.mockRejectedValue(new Error("stats down"));
        draw();
        const retry = await screen.findByRole("button", { name: /^retry$/i });

        trend.mockResolvedValue(TWO_MONTHS);
        await userEvent.click(retry);

        expect(await statement()).toBeInTheDocument();
    });

    it("keeps the statement and exports without markets when the regions fail", async () => {
        regions.mockRejectedValue(new Error("regions down"));
        draw();
        await waitFor(() => expect(regions).toHaveBeenCalled());
        const dialog = await exportDialog();

        expect(
            dialog.queryByRole("button", { name: /^Markets/ }),
        ).not.toBeInTheDocument();
        expect(
            dialog.getByText(/Markets are unavailable right now/),
        ).toBeInTheDocument();

        await userEvent.click(
            dialog.getByRole("button", { name: "Download CSV" }),
        );
        expect(exported().titles).toEqual(["Monthly statement"]);
    });
});
