import { describe, expect, it } from "vitest";
import {
    byReviewOrder,
    reviewMoment,
    reviewReading,
} from "@/lib/data/review-queue";
import type { ReviewClock } from "@/lib/types";

const NOW = new Date("2026-10-09T12:00:00Z");
const COPY = { open: "waiting", none: "Nothing waiting" };

const open = (openedAt: string): ReviewClock => ({
    open: true,
    openedAt,
    decidedAt: null,
});

const decided = (decidedAt: string): ReviewClock => ({
    open: false,
    openedAt: "2026-01-01T12:00:00Z",
    decidedAt,
});

describe("byReviewOrder", () => {
    it("ranks every open item above every decided one, oldest open and newest decision first", () => {
        const clocks = [
            decided("2026-08-01T12:00:00Z"),
            open("2026-10-01T12:00:00Z"),
            decided("2026-09-30T12:00:00Z"),
            open("2026-09-01T12:00:00Z"),
        ];

        expect([...clocks].sort(byReviewOrder)).toEqual([
            clocks[3],
            clocks[1],
            clocks[2],
            clocks[0],
        ]);
    });
});

describe("reviewMoment", () => {
    it("reads an open item by its age and a decided one by its decision day", () => {
        expect(reviewMoment(open("2026-09-29T12:00:00Z"), NOW)).toBe("10d");
        expect(reviewMoment(decided("2026-09-30T12:00:00Z"), NOW)).toBe(
            "Sep 30",
        );
    });
});

describe("reviewReading", () => {
    it("states how many items are open and how long the oldest has been", () => {
        expect(
            reviewReading(
                [open("2026-10-08T12:00:00Z"), open("2026-09-09T12:00:00Z")],
                COPY,
                NOW,
            ),
        ).toBe("2 waiting · oldest 30 days");
    });

    it("says so plainly when nothing is open", () => {
        expect(
            reviewReading([decided("2026-09-30T12:00:00Z")], COPY, NOW),
        ).toBe("Nothing waiting");
    });
});
