import { describe, expect, it } from "vitest";
import {
    formatMeasure,
    measureTotal,
    reportMonths,
    reportWindowLabel,
    reportYears,
} from "@/lib/data/admin-reports";
import { aTrend, REPORT_TODAY } from "@/lib/data/__fixtures__/reports";

describe("reportMonths", () => {
    it("lays every series on one unbroken month axis, filling silent months with zero", () => {
        const months = reportMonths(aTrend(), REPORT_TODAY);

        expect(months.map((month) => month.key)).toEqual([
            "2025-12",
            "2026-01",
            "2026-02",
            "2026-03",
            "2026-04",
            "2026-05",
            "2026-06",
            "2026-07",
            "2026-08",
            "2026-09",
            "2026-10",
        ]);
        expect(months[1]).toMatchObject({ gmv: 0, members: 0, listings: 0 });
        expect(months[9]).toMatchObject({ gmv: 6_100_000, deals: 2 });
    });

    it("marks only the current calendar month as still accruing", () => {
        const months = reportMonths(aTrend(), REPORT_TODAY);

        expect(months.filter((month) => month.partial)).toEqual([
            expect.objectContaining({ key: "2026-10" }),
        ]);
    });

    it("prints the year on the first tick and on every January, so repeated month names stay unambiguous", () => {
        const ticks = reportMonths(aTrend(), REPORT_TODAY).map(
            (month) => month.tick,
        );

        expect(ticks[0]).toBe("Dec ’25");
        expect(ticks[1]).toBe("Jan ’26");
        expect(ticks[2]).toBe("Feb");
    });

    it("reports nothing when the trend has not answered or holds no points", () => {
        expect(reportMonths(undefined)).toEqual([]);
        expect(
            reportMonths(
                aTrend({ gmv: [], deals: [], users: [], listings: [] }),
            ),
        ).toEqual([]);
    });
});

describe("measureTotal", () => {
    it("averages a deal over the whole window instead of averaging the monthly averages", () => {
        const months = reportMonths(aTrend(), REPORT_TODAY);

        expect(measureTotal(months, "average")).toBeCloseTo(11_500_000 / 3);
    });

    it("leaves the average deal blank when no deal closed", () => {
        const months = reportMonths(
            aTrend({ gmv: [], deals: [] }),
            REPORT_TODAY,
        );

        expect(measureTotal(months, "average")).toBeNull();
        expect(
            formatMeasure("average", measureTotal(months, "average")),
        ).toBeNull();
    });
});

describe("reportYears", () => {
    it("lists years newest first and opens only the newest, with a month count for each", () => {
        const years = reportYears(reportMonths(aTrend(), REPORT_TODAY));

        expect(years).toEqual([
            {
                id: "2026",
                label: "2026",
                caption: "10 months",
                collapsed: false,
            },
            { id: "2025", label: "2025", caption: "1 month", collapsed: true },
        ]);
    });
});

describe("reportWindowLabel", () => {
    it("names the first and last month of the window with their years", () => {
        expect(reportWindowLabel(reportMonths(aTrend(), REPORT_TODAY))).toBe(
            "Dec 2025 – Oct 2026",
        );
    });
});
