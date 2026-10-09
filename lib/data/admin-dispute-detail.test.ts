import { describe, expect, it } from "vitest";
import {
    decisionCopy,
    disputeOutcome,
    openLine,
    partyFacts,
    stakeGroups,
} from "@/lib/data/admin-dispute-detail";
import { DISPUTE_TODAY, aDisputeCase } from "@/lib/data/__fixtures__/disputes";

const UNLOADED = aDisputeCase({
    deals: [{ ...aDisputeCase().deals[0], escrow: null, parties: null }],
});

describe("stakeGroups", () => {
    it("1.2 shows the escrow figure only when the hold was loaded, never as zero", () => {
        const loaded = stakeGroups(aDisputeCase())[0].facts;
        const unloaded = aDisputeCase();
        unloaded.deals[0].escrow = null;

        expect(loaded).toContainEqual({
            label: "Escrow",
            value: "$67,200 frozen",
        });
        expect(
            stakeGroups(unloaded)[0].facts.map((fact) => fact.label),
        ).not.toContain("Escrow");
    });

    it("says no deal is attached instead of leaving the stake empty", () => {
        expect(stakeGroups(aDisputeCase({ deals: [] }))).toEqual([
            { id: "none", facts: [{ label: "Deal", value: "None attached" }] },
        ]);
    });
});

describe("partyFacts", () => {
    it("1.5 names the buyer and the seller and marks the one who raised it", () => {
        expect(partyFacts(aDisputeCase()).slice(0, 2)).toEqual([
            { label: "Buyer", value: "Christ Streich · raised it" },
            { label: "Seller", value: "Marta Vance" },
        ]);
    });

    it("falls back to the raiser alone when the deal's hold did not load", () => {
        expect(partyFacts(UNLOADED)[0]).toEqual({
            label: "Raised by",
            value: "Christ Streich",
        });
    });
});

describe("openLine", () => {
    it("states how long the dispute has been open and how much it froze", () => {
        expect(openLine(aDisputeCase(), DISPUTE_TODAY)).toBe(
            "In review · open 43 days · $67,200 frozen",
        );
        expect(openLine(UNLOADED, DISPUTE_TODAY)).toBe(
            "In review · open 43 days",
        );
    });
});

describe("decisionCopy", () => {
    it("3.2 names the amount and the person a release pays", () => {
        expect(decisionCopy("release", aDisputeCase()).title).toBe(
            "Release $67,200 to Marta Vance",
        );
    });

    it("3.2 names the amount and the person a refund repays", () => {
        expect(decisionCopy("refund", aDisputeCase()).title).toBe(
            "Refund $67,200 to Christ Streich",
        );
    });

    it("3.2 still names the side the money goes to when the hold did not load", () => {
        expect(decisionCopy("refund", UNLOADED).title).toBe("Refund the buyer");
    });
});

describe("disputeOutcome", () => {
    it("names what happened to the escrow beside the decision", () => {
        const outcome = disputeOutcome(
            aDisputeCase({
                status: "RESOLVED",
                decidedAt: "2026-09-02T12:00:00Z",
                resolution: "Credit reissued to the buyer.",
                deals: [
                    {
                        ...aDisputeCase().deals[0],
                        escrow: { amount: 67_200, status: "REFUNDED" },
                    },
                ],
            }),
        );

        expect(outcome).toMatchObject({
            label: "Resolved",
            date: "Sep 2, 2026",
            detail: "Escrow refunded",
            note: "Credit reissued to the buyer.",
        });
    });

    it("says plainly when a decided dispute left its escrow frozen", () => {
        expect(
            disputeOutcome(
                aDisputeCase({
                    status: "RESOLVED",
                    decidedAt: "2026-09-02T12:00:00Z",
                }),
            ).detail,
        ).toBe("Escrow still frozen");
    });
});
