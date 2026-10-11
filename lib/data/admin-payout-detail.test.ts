import { describe, expect, it } from "vitest";
import { aPayout } from "@/lib/data/__fixtures__/payouts";
import { payoutSteps } from "@/lib/data/admin-payout-detail";
import type { Payout } from "@/lib/types";

const NOW = new Date("2026-10-06T12:00:00.000Z");

const states = (payout: Payout) =>
    payoutSteps(payout, NOW).map((step) => step.state);

describe("payoutSteps", () => {
    it("keeps release waiting while the inspection window is still open", () => {
        expect(
            states(aPayout({ inspectionEndsAt: "2026-10-09T00:00:00.000Z" })),
        ).toEqual(["done", "current", "waiting"]);
    });

    it("makes release the current step once inspection has closed", () => {
        expect(
            states(aPayout({ inspectionEndsAt: "2026-10-01T00:00:00.000Z" })),
        ).toEqual(["done", "done", "current"]);
    });

    it("blocks release while a dispute is open", () => {
        expect(states(aPayout({ state: "DISPUTED" }))[2]).toBe("blocked");
    });

    it("shows a released payout as complete", () => {
        expect(states(aPayout({ state: "RELEASED" }))).toEqual([
            "done",
            "done",
            "done",
        ]);
    });
});
