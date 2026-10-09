import { describe, expect, it } from "vitest";
import { disputeOutcome, stakeGroups } from "@/lib/data/admin-dispute-detail";
import { aDisputeCase } from "@/lib/data/__fixtures__/disputes";

describe("stakeGroups", () => {
    it("1.2 shows the escrow figure only when the hold was loaded, never as zero", () => {
        const loaded = stakeGroups(aDisputeCase())[0].facts;
        const unloaded = aDisputeCase();
        unloaded.deals[0].escrow = null;

        expect(loaded).toContainEqual({
            label: "Escrow",
            value: "$67,200 · Disputed",
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
