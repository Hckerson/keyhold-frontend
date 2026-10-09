import { describe, expect, it } from "vitest";
import { aTrend, REPORT_TODAY } from "@/lib/data/__fixtures__/reports";
import {
    reportMonths,
    reportYears,
    statementNotes,
} from "@/lib/data/admin-reports";
import { toReportSections } from "@/lib/data/admin-reports-csv";
import { trendGrain } from "@/lib/data/admin-reports-days";
import { reportMeasures } from "@/lib/data/admin-reports-measures";

const DAILY = aTrend({
    gmv: [
        { name: "2026-10-03", value: 1_500 },
        { name: "2026-10-06", value: 2_000 },
    ],
    deals: [
        { name: "2026-10-03", value: 2 },
        { name: "2026-10-06", value: 1 },
    ],
    listings: [],
    users: [{ name: "2026-10-07", value: 4 }],
});

const days = () => reportMonths(DAILY, REPORT_TODAY, "day");

describe("the seven-day window", () => {
    it("lays out the seven days ending today, quiet days included", () => {
        expect(days().map((day) => day.key)).toEqual([
            "2026-10-01",
            "2026-10-02",
            "2026-10-03",
            "2026-10-04",
            "2026-10-05",
            "2026-10-06",
            "2026-10-07",
        ]);
        expect(days().map((day) => day.gmv)).toEqual([
            0, 0, 1_500, 0, 0, 2_000, 0,
        ]);
    });

    it("names each day and marks only today as still in progress", () => {
        const [first, , , , , , today] = days();

        expect(first).toMatchObject({ name: "1 October", short: "1 Oct" });
        expect(today).toMatchObject({ label: "7 Oct 2026", partial: true });
        expect(days().filter((day) => day.partial)).toHaveLength(1);
    });

    it("compares the last complete day with the day before, not with a month", () => {
        const gmv = reportMeasures(days()).find(
            (measure) => measure.id === "gmv",
        );

        expect(gmv?.latest).toMatch(/^6 Oct /);
        expect(gmv?.against).toBe("5 Oct");
    });

    it("speaks of days, not months, in the notes and the export", () => {
        const [statement] = toReportSections(["periods"], days(), []);

        expect(statementNotes(days())).toContain("in each day");
        expect(statementNotes(days())).toContain(
            "7 Oct 2026 is still in progress.",
        );
        expect(statement.title).toBe("Daily statement");
        expect(statement.columns[0]).toBe("Day");
        expect(reportYears(days())[0].caption).toBe("7 days");
    });

    it("reads a trend keyed by day as daily, whatever window is picked", () => {
        expect(trendGrain(DAILY, "month")).toBe("day");
        expect(trendGrain(aTrend(), "day")).toBe("month");
    });

    it("falls back to the picked window when the trend has no points yet", () => {
        const empty = aTrend({ gmv: [], deals: [], listings: [], users: [] });

        expect(trendGrain(empty, "day")).toBe("day");
        expect(reportMonths(empty, REPORT_TODAY, "day")).toHaveLength(7);
    });
});
