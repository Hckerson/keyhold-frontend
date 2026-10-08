import { describe, expect, it } from "vitest";
import {
    escrowTiles,
    pipelineFlow,
    pipelineReading,
    queueSegments,
    statusSegments,
} from "@/lib/data/admin-analytics-snapshot";
import { dealFlow } from "@/lib/data/admin-transactions";

const flow = dealFlow([
    { id: "PENDING", count: 1, volume: 500_000 },
    { id: "IN_PROGRESS", count: 2, volume: 1_500_000 },
    { id: "COMPLETED", count: 6, volume: 25_700_000 },
    { id: "CANCELLED", count: 1, volume: 900_000 },
]);

describe("pipelineFlow", () => {
    it("keeps the stages in pipeline order and sets cancelled deals aside as an off-ramp", () => {
        const { stages, aside } = pipelineFlow(flow);

        expect(stages.map((stage) => stage.id)).toEqual([
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED",
        ]);
        expect(aside).toMatchObject({ id: "CANCELLED", display: "1 deal" });
    });

    it("colours each stage by its state, so only the settled one reads as positive", () => {
        const { stages } = pipelineFlow(flow);

        expect(stages.map((stage) => stage.tone)).toEqual([
            "neutral",
            "neutral",
            "accent",
        ]);
    });
});

describe("pipelineReading", () => {
    it("leads with how many enquiries became deals, then what is still in flight", () => {
        expect(
            pipelineReading(flow, {
                users: 0,
                properties: 0,
                activeProperties: 0,
                connections: 200,
                transactions: 10,
                completedTransactions: 6,
                volume: 0,
            }),
        ).toBe("5% of enquiries became deals · 3 deals in flight worth $2.00M");
    });

    it("drops the conversion when no enquiry has been made", () => {
        expect(pipelineReading(flow, undefined)).toBe(
            "3 deals in flight worth $2.00M",
        );
    });
});

describe("escrowTiles", () => {
    it("sizes each escrow state by its money and colours it by state: disputed is the alarm, released is positive", () => {
        const tiles = escrowTiles([
            { id: "DISPUTED", count: 3, amount: 448_000, oldestMinutes: 0 },
            { id: "HELD", count: 1, amount: 375_000, oldestMinutes: 0 },
            { id: "RELEASED", count: 4, amount: 542_000, oldestMinutes: 0 },
        ]);

        expect(
            tiles.map((tile) => [tile.label, tile.value, tile.tone]),
        ).toEqual([
            ["Disputed", 448_000, "error"],
            ["Held", 375_000, "neutral"],
            ["Released", 542_000, "accent"],
        ]);
    });
});

describe("queueSegments", () => {
    it("reports each queue's oldest wait, or that it is clear", () => {
        const segments = queueSegments([
            {
                id: "verifications",
                backlog: 5,
                oldestMinutes: 1_440 * 58,
                share: 45,
            },
            { id: "listings", backlog: 6, oldestMinutes: null, share: 55 },
            { id: "disputes", backlog: 0, oldestMinutes: null, share: 0 },
        ]);

        expect(segments.map((segment) => segment.detail)).toEqual([
            "58d",
            "—",
            "Clear",
        ]);
    });

    it("colours a queue by its oldest item: brick after a day, forest while waiting, quiet when clear", () => {
        const segments = queueSegments([
            {
                id: "verifications",
                backlog: 5,
                oldestMinutes: 1_440 * 2,
                share: 45,
            },
            { id: "listings", backlog: 6, oldestMinutes: 30, share: 55 },
            { id: "disputes", backlog: 0, oldestMinutes: null, share: 0 },
        ]);

        expect(segments.map((segment) => segment.tone)).toEqual([
            "error",
            "accent",
            "neutral",
        ]);
    });
});

describe("statusSegments", () => {
    it("reads suspended accounts as the state at risk", () => {
        expect(
            statusSegments({
                total: 100,
                active: 80,
                pending: 15,
                suspended: 5,
            }).map((segment) => [segment.name, segment.value, segment.tone]),
        ).toEqual([
            ["Active", 80, "accent"],
            ["Pending", 15, "neutral"],
            ["Suspended", 5, "error"],
        ]);
    });
});
