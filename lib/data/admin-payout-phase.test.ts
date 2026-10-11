import { describe, expect, it } from "vitest";
import {
    orderPayouts,
    payoutPhaseOf,
    payoutTiming,
} from "@/lib/data/admin-payout-phase";
import { aPayout } from "@/lib/data/__fixtures__/payouts";

const NOW = new Date("2026-10-06T12:00:00.000Z");
const DAY = 1_440;

describe("payoutPhaseOf", () => {
    it("separates holds whose inspection has closed from those still inside it", () => {
        expect(
            payoutPhaseOf(
                aPayout({ inspectionEndsAt: "2026-10-01T00:00:00.000Z" }),
                NOW,
            ),
        ).toBe("ready");
        expect(
            payoutPhaseOf(
                aPayout({ inspectionEndsAt: "2026-10-09T00:00:00.000Z" }),
                NOW,
            ),
        ).toBe("inspecting");
    });

    it("keeps disputes, paid-out money and refunds apart", () => {
        expect(payoutPhaseOf(aPayout({ state: "DISPUTED" }), NOW)).toBe(
            "disputed",
        );
        expect(payoutPhaseOf(aPayout({ state: "RELEASED" }), NOW)).toBe("paid");
        expect(payoutPhaseOf(aPayout({ state: "REFUNDED" }), NOW)).toBe(
            "refunded",
        );
    });
});

describe("payoutTiming", () => {
    it("reads how long a dispute has held the money", () => {
        expect(
            payoutTiming(
                aPayout({ state: "DISPUTED", ageMinutes: DAY * 44 }),
                NOW,
            ),
        ).toBe("44d held");
    });

    it("counts down an open inspection window in whole days, rounding up", () => {
        expect(
            payoutTiming(
                aPayout({ inspectionEndsAt: "2026-10-09T00:00:00.000Z" }),
                NOW,
            ),
        ).toBe("Closes in 3d");
        expect(
            payoutTiming(
                aPayout({ inspectionEndsAt: "2026-10-06T18:00:00.000Z" }),
                NOW,
            ),
        ).toBe("Closes in 1d");
    });

    it("reads how long a release has been waiting once the window closed", () => {
        expect(
            payoutTiming(
                aPayout({ inspectionEndsAt: "2026-10-03T12:00:00.000Z" }),
                NOW,
            ),
        ).toBe("Ready 3d");
    });

    it("dates money that has already moved", () => {
        expect(
            payoutTiming(
                aPayout({
                    state: "RELEASED",
                    settledAt: "2026-09-04T10:00:00.000Z",
                }),
                NOW,
            ),
        ).toBe("Sep 4");
    });
});

describe("orderPayouts", () => {
    it("puts what needs a decision first, oldest wait first, then the most recent payments", () => {
        const order = orderPayouts(
            [
                aPayout({
                    id: "paid-old",
                    state: "RELEASED",
                    settledAt: "2026-06-01T00:00:00.000Z",
                }),
                aPayout({
                    id: "ready",
                    inspectionEndsAt: "2026-10-01T00:00:00.000Z",
                }),
                aPayout({
                    id: "dispute-new",
                    state: "DISPUTED",
                    ageMinutes: DAY,
                }),
                aPayout({
                    id: "paid-new",
                    state: "RELEASED",
                    settledAt: "2026-10-01T00:00:00.000Z",
                }),
                aPayout({
                    id: "dispute-old",
                    state: "DISPUTED",
                    ageMinutes: DAY * 40,
                }),
            ],
            NOW,
        ).map((payout) => payout.id);

        expect(order).toEqual([
            "dispute-old",
            "dispute-new",
            "ready",
            "paid-new",
            "paid-old",
        ]);
    });
});
