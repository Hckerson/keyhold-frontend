import { describe, expect, it } from "vitest";
import {
    disputeActions,
    disputeCounts,
    disputesIn,
    noteReady,
} from "@/lib/data/admin-disputes";
import { aDisputeCase } from "@/lib/data/__fixtures__/disputes";

const QUEUE = [
    aDisputeCase({
        id: "new",
        status: "OPEN",
        openedAt: "2026-10-01T12:00:00Z",
    }),
    aDisputeCase({
        id: "old-decision",
        status: "RESOLVED",
        decidedAt: "2026-08-01T12:00:00Z",
    }),
    aDisputeCase({ id: "old", openedAt: "2026-08-20T12:00:00Z" }),
    aDisputeCase({
        id: "new-decision",
        status: "DISMISSED",
        decidedAt: "2026-09-20T12:00:00Z",
    }),
];

describe("disputesIn", () => {
    it("1.4 puts open disputes first, longest open at the top, then the latest decisions", () => {
        expect(disputesIn(QUEUE, "all").map((item) => item.id)).toEqual([
            "old",
            "new",
            "new-decision",
            "old-decision",
        ]);
    });

    it("counts new and in-review disputes together as open", () => {
        expect(disputesIn(QUEUE, "open").map((item) => item.id)).toEqual([
            "old",
            "new",
        ]);
        expect(disputeCounts(QUEUE)).toEqual({
            open: 2,
            RESOLVED: 1,
            DISMISSED: 1,
            all: 4,
        });
    });
});

describe("disputeActions", () => {
    const modes = (dispute: Parameters<typeof disputeActions>[0]) =>
        disputeActions(dispute).map((action) => action.mode);

    it("2.1 offers no decision once a dispute is resolved or dismissed", () => {
        expect(modes(QUEUE[1])).toEqual([]);
        expect(modes(QUEUE[3])).toEqual([]);
    });

    it("2.2 offers dismiss, release and refund when the deal froze a hold", () => {
        expect(modes(aDisputeCase())).toEqual(["dismiss", "release", "refund"]);
    });

    it("2.2 still offers release and refund when the hold's figures failed to load", () => {
        const unloaded = aDisputeCase();
        unloaded.deals[0].escrow = null;

        expect(modes(unloaded)).toEqual(["dismiss", "release", "refund"]);
    });

    it("2.3 offers only dismiss and resolve when no hold was frozen", () => {
        expect(modes(aDisputeCase({ deals: [] }))).toEqual([
            "dismiss",
            "resolve",
        ]);
    });
});

describe("noteReady", () => {
    it("3.3 needs at least four characters that are not blank", () => {
        expect(noteReady("   ok   ")).toBe(false);
        expect(noteReady("    ")).toBe(false);
        expect(noteReady(" done ")).toBe(true);
    });
});
