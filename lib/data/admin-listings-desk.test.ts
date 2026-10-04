import { describe, expect, it } from "vitest";
import { aModerationListing } from "@/lib/data/__fixtures__/moderation";
import {
    checkBreakdown,
    queueReading,
    statusTiles,
} from "@/lib/data/admin-listings-desk";

const aQueue = () => [
    aModerationListing({
        id: "flg_1",
        status: "flagged",
        compliance: { photos: "fail", accuracy: "warn", licence: "pass" },
        reports: 3,
        queuedMinutes: 2_880,
    }),
    aModerationListing({
        id: "flg_2",
        status: "pending",
        compliance: { photos: "warn", accuracy: "pass", licence: "pass" },
    }),
    aModerationListing({ id: "flg_3", status: "approved", reports: 5 }),
    aModerationListing({ id: "flg_4", status: "approved" }),
];

describe("statusTiles", () => {
    it("leads with every submission, then one tile per review status", () => {
        expect(statusTiles(aQueue()).map((tile) => tile.id)).toEqual([
            "all",
            "flagged",
            "pending",
            "changes",
            "approved",
            "rejected",
        ]);
    });

    it("gives each status its count and its share of the whole queue", () => {
        const approved = statusTiles(aQueue()).find(
            (tile) => tile.id === "approved",
        );

        expect(approved).toMatchObject({ count: 2, percent: 50 });
    });

    it("shows empty shares rather than dividing by zero on an empty queue", () => {
        expect(statusTiles([]).every((tile) => tile.percent === 0)).toBe(true);
    });
});

describe("checkBreakdown", () => {
    it("counts clear, flagged and failing listings separately for each check", () => {
        expect(checkBreakdown(aQueue())).toEqual([
            { id: "photos", pass: 2, warn: 1, fail: 1 },
            { id: "accuracy", pass: 3, warn: 1, fail: 0 },
            { id: "licence", pass: 4, warn: 0, fail: 0 },
        ]);
    });
});

describe("queueReading", () => {
    it("counts only open listings toward reports, value held and the oldest wait", () => {
        expect(queueReading(aQueue())).toBe(
            "2 open · 4 reports · $4.80M held · oldest 2d",
        );
    });

    it("leaves out the oldest wait when nothing is open", () => {
        expect(queueReading([])).not.toMatch(/oldest/);
    });
});
