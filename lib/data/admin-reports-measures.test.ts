import { describe, expect, it } from "vitest";
import { reportMonths } from "@/lib/data/admin-reports";
import {
    measureReading,
    reportMeasures,
} from "@/lib/data/admin-reports-measures";
import { aTrend, REPORT_TODAY } from "@/lib/data/__fixtures__/reports";

const months = reportMonths(aTrend(), REPORT_TODAY);
const measureOf = (id: string) =>
    reportMeasures(months).find((measure) => measure.id === id);

describe("reportMeasures", () => {
    it("compares the last complete month with the one before it, never the month still accruing", () => {
        expect(measureOf("gmv")).toMatchObject({
            total: "$11.50M",
            latest: "Sep $6.10M",
            delta: { label: "+13%", direction: "up" },
            against: "Aug",
        });
    });

    it("leaves the latest reading blank when the last complete month recorded nothing", () => {
        expect(measureOf("listings")).toMatchObject({
            total: "3",
            latest: null,
            delta: null,
        });
    });

    it("estimates commission from settled volume at the platform rate", () => {
        expect(measureOf("commission")?.total).toBe("$288K");
    });
});

describe("measureReading", () => {
    it("names the best month and flags the month still accruing", () => {
        expect(measureReading(months, "gmv")).toBe(
            "Best month Sep 2026 at $6.10M · Oct 2026 is month to date",
        );
    });

    it("says nothing was recorded when the measure is empty across the window", () => {
        const quiet = reportMonths(aTrend({ gmv: [] }), REPORT_TODAY);

        expect(measureReading(quiet, "gmv")).toBe(
            "Nothing recorded in this window · Oct 2026 is month to date",
        );
    });
});
