import { describe, expect, it } from "vitest";
import {
    joinersLine,
    supplyReading,
    volumeReading,
} from "@/lib/data/admin-analytics";
import { reportMonths } from "@/lib/data/admin-reports";
import { aTrend, REPORT_TODAY } from "@/lib/data/__fixtures__/reports";
import { aMemberRecord } from "@/lib/data/__fixtures__/users";

const months = reportMonths(aTrend(), REPORT_TODAY);

describe("joinersLine", () => {
    it("splits the window's sign-ups by role, buyers first", () => {
        expect(
            joinersLine(
                [
                    aMemberRecord({
                        role: "SELLER",
                        createdAt: "2026-09-21T10:00:00.000Z",
                    }),
                    aMemberRecord({
                        role: "BUYER",
                        createdAt: "2026-09-02T10:00:00.000Z",
                    }),
                    aMemberRecord({
                        role: "BUYER",
                        createdAt: "2026-09-20T10:00:00.000Z",
                    }),
                ],
                "month",
                REPORT_TODAY,
            ),
        ).toBe("2 buyers · 1 agent");
    });

    it("ignores sign-ups before the window opens, matching the trend the backend counts", () => {
        expect(
            joinersLine(
                [
                    aMemberRecord({
                        role: "BUYER",
                        createdAt: "2025-10-02T10:00:00.000Z",
                    }),
                    aMemberRecord({
                        role: "BUYER",
                        createdAt: "2025-10-20T10:00:00.000Z",
                    }),
                ],
                "month",
                REPORT_TODAY,
            ),
        ).toBe("1 buyer");
    });
});

describe("volumeReading", () => {
    it("reads settled volume, deal count and the average deal in one line", () => {
        expect(volumeReading(months)).toBe(
            "$11.50M across 3 deals, $3.83M a deal",
        );
    });

    it("says so when nothing settled in the window", () => {
        expect(
            volumeReading(
                reportMonths(aTrend({ gmv: [], deals: [] }), REPORT_TODAY),
            ),
        ).toBe("No settled volume in this window");
    });
});

describe("supplyReading", () => {
    it("compares new members with new listings", () => {
        expect(supplyReading(months)).toBe(
            "13 new members for every new listing",
        );
    });

    it("names the missing side when no listing was added", () => {
        expect(
            supplyReading(reportMonths(aTrend({ listings: [] }), REPORT_TODAY)),
        ).toBe("39 new members, no new listings");
    });
});
