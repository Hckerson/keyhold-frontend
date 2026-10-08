import { describe, expect, it } from "vitest";
import {
    marketLine,
    reportMarkets,
    reportShares,
    rolesLine,
} from "@/lib/data/admin-reports-audience";

describe("reportMarkets", () => {
    it("ranks regions by settled volume and gives each its share of the total", () => {
        const markets = reportMarkets([
            { region: "NV", listings: 4, avgPrice: 900_000, volume: 1_000_000 },
            {
                region: "CA",
                listings: 30,
                avgPrice: 4_000_000,
                volume: 3_000_000,
            },
        ]);

        expect(markets.map((market) => [market.region, market.share])).toEqual([
            ["CA", 75],
            ["NV", 25],
        ]);
    });

    it("describes a market by its listing count and average price", () => {
        expect(
            marketLine({
                region: "CA",
                listings: 1,
                avgPrice: 4_440_000,
                volume: 0,
                share: 0,
            }),
        ).toBe("1 listing · avg $4.44M");
    });
});

describe("reportShares", () => {
    it("orders segments largest first with whole-number shares", () => {
        const shares = reportShares([
            { name: "Platinum", value: 1, tone: "neutral" },
            { name: "Standard", value: 3, tone: "neutral" },
        ]);

        expect(shares).toEqual([
            { id: "Standard", label: "Standard", count: 3, share: 75 },
            { id: "Platinum", label: "Platinum", count: 1, share: 25 },
        ]);
    });
});

describe("rolesLine", () => {
    it("reads the role split as one quiet sentence", () => {
        expect(
            rolesLine([
                { name: "Buyers", value: 562, tone: "accent" },
                { name: "Agents", value: 5, tone: "neutral" },
            ]),
        ).toBe("562 buyers · 5 agents");
    });
});
