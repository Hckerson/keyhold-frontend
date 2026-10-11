import { describe, expect, it } from "vitest";
import { analyticsSnapshot } from "@/lib/data/admin-analytics-panels";
import type { ReportMarket } from "@/lib/types";

const aMarket = (overrides: Partial<ReportMarket> = {}): ReportMarket => ({
    region: "CA",
    listings: 34,
    avgPrice: 4_440_000,
    volume: 25_700_000,
    share: 100,
    ...overrides,
});

const snapshotOf = (markets: ReportMarket[]) =>
    analyticsSnapshot({
        flow: [],
        platform: undefined,
        escrow: [],
        lanes: [],
        queueReading: "Every queue is clear",
        users: undefined,
        tiers: [],
        markets,
    });

describe("analyticsSnapshot", () => {
    it("shows a lone region as a figure, never a single-tile chart", () => {
        expect(snapshotOf([aMarket()]).markets.visual).toEqual({
            kind: "figure",
            figure: {
                value: "$25.70M",
                caption:
                    "CA holds all settled volume · 34 listings · avg $4.44M",
            },
        });
    });

    it("maps several regions to treemap tiles sized by settled volume", () => {
        const { visual } = snapshotOf([
            aMarket({ region: "CA", volume: 3_000_000, share: 75 }),
            aMarket({ region: "NV", volume: 1_000_000, share: 25 }),
        ]).markets;

        expect(visual.kind).toBe("treemap");
        expect(
            visual.kind === "treemap" &&
                visual.tiles.map((tile) => [tile.label, tile.value]),
        ).toEqual([
            ["CA", 3_000_000],
            ["NV", 1_000_000],
        ]);
    });

    it("draws each kind of datum in the form that suits it", () => {
        const snapshot = snapshotOf([]);

        expect(
            Object.fromEntries(
                Object.entries(snapshot).map(([id, panel]) => [
                    id,
                    panel.visual.kind,
                ]),
            ),
        ).toEqual({
            pipeline: "flow",
            escrow: "treemap",
            queues: "donut",
            status: "waffle",
            tiers: "waffle",
            markets: "figure",
        });
    });
});
