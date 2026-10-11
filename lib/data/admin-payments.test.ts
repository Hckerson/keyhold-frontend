import { describe, expect, it } from "vitest";
import {
    escrowCountLabel,
    escrowPosition,
    matchesPayoutQuery,
    payoutTotals,
    payoutsReading,
    toPayoutStages,
} from "@/lib/data/admin-payments";
import { aPayout } from "@/lib/data/__fixtures__/payouts";

describe("escrowPosition", () => {
    it("counts only held and disputed escrow, and splits it into fee and what agents are owed", () => {
        const position = escrowPosition(
            toPayoutStages([
                { status: "HELD", count: 1, amount: 300_000, oldestAt: null },
                {
                    status: "DISPUTED",
                    count: 2,
                    amount: 100_000,
                    oldestAt: null,
                },
                {
                    status: "RELEASED",
                    count: 4,
                    amount: 900_000,
                    oldestAt: null,
                },
            ]),
        );

        expect(position).toEqual({
            held: 400_000,
            holds: 3,
            fee: 20_000,
            net: 380_000,
        });
    });
});

describe("matchesPayoutQuery", () => {
    it("finds a payout by agent, deal, locality or buyer, ignoring case", () => {
        const payout = aPayout();

        expect(matchesPayoutQuery(payout, "noor")).toBe(true);
        expect(matchesPayoutQuery(payout, "HARBOUR")).toBe(true);
        expect(matchesPayoutQuery(payout, "malibu")).toBe(true);
        expect(matchesPayoutQuery(payout, "vance")).toBe(true);
        expect(matchesPayoutQuery(payout, "someone else")).toBe(false);
    });
});

describe("payoutTotals", () => {
    it("adds up gross, the platform fee and what agents net", () => {
        expect(
            payoutTotals([aPayout(), aPayout({ id: "esc_2", gross: 300_000 })]),
        ).toEqual({ count: 2, gross: 400_000, fee: 20_000, net: 380_000 });
    });
});

describe("payoutsReading", () => {
    it("counts what is still held and how long the oldest has waited", () => {
        expect(
            payoutsReading([
                aPayout({ ageMinutes: 1_440 * 3 }),
                aPayout({
                    id: "esc_2",
                    state: "DISPUTED",
                    ageMinutes: 1_440 * 9,
                }),
                aPayout({
                    id: "esc_3",
                    state: "RELEASED",
                    ageMinutes: 1_440 * 40,
                }),
            ]),
        ).toBe("2 payouts still held · the oldest has waited 9d");
    });

    it("says every payout is settled once nothing is held", () => {
        expect(payoutsReading([aPayout({ state: "RELEASED" })])).toBe(
            "Every payout has been settled",
        );
    });
});

describe("payoutsReading with a state picked", () => {
    it("describes only the payouts in that state", () => {
        expect(
            payoutsReading(
                [
                    aPayout({ state: "DISPUTED", gross: 200_000 }),
                    aPayout({ id: "esc_2", state: "HELD" }),
                ],
                "DISPUTED",
            ),
        ).toBe("Disputed · 1 payout, $200K gross");
    });
});

describe("escrowCountLabel", () => {
    it("counts money still in escrow as holds and settled money as payouts", () => {
        expect(
            escrowCountLabel({
                id: "HELD",
                count: 1,
                amount: 0,
                oldestMinutes: 0,
            }),
        ).toBe("1 hold");
        expect(
            escrowCountLabel({
                id: "RELEASED",
                count: 4,
                amount: 0,
                oldestMinutes: 0,
            }),
        ).toBe("4 payouts");
    });
});
