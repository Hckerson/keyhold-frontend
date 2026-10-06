import { describe, expect, it } from "vitest";
import {
    escrowPosition,
    matchesPayoutQuery,
    payoutTotals,
    payoutsReading,
    toPayoutStages,
} from "@/lib/data/admin-payments";
import type { Payout } from "@/lib/types";

const aPayout = (overrides: Partial<Payout> = {}): Payout => ({
    id: "esc_1",
    recipient: "Noor Hale",
    deal: "12 Harbour Row",
    state: "HELD",
    gross: 100_000,
    ageMinutes: 60,
    inspectionEndsAt: null,
    href: "/admin/transactions",
    ...overrides,
});

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
    it("finds a payout by agent or by deal, ignoring case", () => {
        const payout = aPayout();

        expect(matchesPayoutQuery(payout, "noor")).toBe(true);
        expect(matchesPayoutQuery(payout, "HARBOUR")).toBe(true);
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
    it("says every payout is settled once nothing is held", () => {
        expect(payoutsReading([aPayout({ state: "RELEASED" })])).toBe(
            "Every payout has been settled",
        );
    });
});
