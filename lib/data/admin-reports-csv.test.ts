import { describe, expect, it } from "vitest";
import { reportMonths } from "@/lib/data/admin-reports";
import { toReportSections } from "@/lib/data/admin-reports-csv";
import { aTrend, REPORT_TODAY } from "@/lib/data/__fixtures__/reports";

const months = reportMonths(aTrend(), REPORT_TODAY);
const markets = [
    {
        region: "CA",
        listings: 34,
        avgPrice: 4_439_705.88,
        volume: 25_700_000,
        share: 100,
    },
];

describe("toReportSections", () => {
    it("exports only the tables that were chosen, statement before markets", () => {
        expect(
            toReportSections(["regions"], months, markets).map(
                (section) => section.title,
            ),
        ).toEqual(["Markets"]);
        expect(
            toReportSections(["regions", "periods"], months, markets).map(
                (section) => section.title,
            ),
        ).toEqual(["Monthly statement", "Markets"]);
    });

    it("labels the month still accruing and leaves the average blank where no deal closed", () => {
        const [statement] = toReportSections(["periods"], months, markets);
        const october = statement.rows[statement.rows.length - 1];
        const september = statement.rows[statement.rows.length - 2];

        expect(october[0]).toBe("Oct 2026 (to date)");
        expect(october[3]).toBeNull();
        expect(september).toEqual([
            "Sep 2026",
            6_100_000,
            2,
            3_050_000,
            152_500,
            0,
            18,
        ]);
    });
});
