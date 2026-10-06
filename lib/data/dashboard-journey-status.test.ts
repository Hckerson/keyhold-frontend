import { describe, expect, it } from "vitest";
import { journeyStatus } from "@/lib/data/dashboard-journey-status";
import { aTransaction, anEscrowHold } from "@/lib/data/__fixtures__/purchases";

describe("journeyStatus", () => {
    it("reports nothing rather than inventing an idle headline", () => {
        expect(journeyStatus([], [])).toBeNull();
    });

    it("names the property whose funds are sitting in escrow", () => {
        expect(journeyStatus([], [aTransaction()])).toEqual({
            title: "Funds in escrow",
            detail: "18 Cypress Point · awaiting release",
        });
    });

    it("ignores a purchase whose escrow has already been released", () => {
        const released = aTransaction({
            escrowHold: anEscrowHold({ status: "RELEASED" }),
        });

        expect(journeyStatus([], [released])).toBeNull();
    });
});
