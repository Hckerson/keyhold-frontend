import { describe, expect, it } from "vitest";
import { aPlatform, aUserCount } from "@/lib/data/__fixtures__/admin";
import {
    businessFigures,
    lifetimeVolume,
} from "@/lib/data/admin-overview-business";
import type { BusinessFigure } from "@/lib/types";
import type { TrendStats } from "@/lib/validations/stats";

const aTrend = (overrides: Partial<TrendStats> = {}): TrendStats => ({
    gmv: [],
    deals: [],
    users: [],
    listings: [],
    ...overrides,
});

const figureOf = (figures: BusinessFigure[], id: BusinessFigure["id"]) =>
    figures.find((figure) => figure.id === id);

describe("businessFigures", () => {
    it("totals listings against the whole stock, not only the live share", () => {
        const listings = figureOf(
            businessFigures(
                undefined,
                aPlatform({ properties: 40, activeProperties: 30 }),
                undefined,
            ),
            "listings",
        );

        expect(listings?.total).toBe("40");
        expect(listings?.ratio.percent).toBe(75);
    });

    it("reads the latest month and its change on the month before", () => {
        const deals = figureOf(
            businessFigures(
                aTrend({
                    deals: [
                        { name: "2026-07", value: 10 },
                        { name: "2026-08", value: 15 },
                    ],
                }),
                undefined,
                undefined,
            ),
            "deals",
        );

        expect(deals?.latest).toBe("15 in Aug");
        expect(deals?.delta).toEqual({ label: "+50%", direction: "up" });
    });

    it("shows no change when there is no prior month to compare against", () => {
        const deals = figureOf(
            businessFigures(
                aTrend({ deals: [{ name: "2026-08", value: 15 }] }),
                undefined,
                undefined,
            ),
            "deals",
        );

        expect(deals?.delta).toBeNull();
    });

    it("draws a month with no activity as zero instead of skipping it", () => {
        const listings = figureOf(
            businessFigures(
                aTrend({
                    listings: [
                        { name: "2025-11", value: 2 },
                        { name: "2026-02", value: 5 },
                    ],
                }),
                undefined,
                undefined,
            ),
            "listings",
        );

        expect(listings?.points).toEqual([2, 0, 0, 5]);
        expect(listings?.delta).toBeNull();
    });

    it("shows no change when the latest month matches the one before", () => {
        const deals = figureOf(
            businessFigures(
                aTrend({
                    deals: [
                        { name: "2026-08", value: 11 },
                        { name: "2026-09", value: 11 },
                    ],
                }),
                undefined,
                undefined,
            ),
            "deals",
        );

        expect(deals?.delta).toBeNull();
    });

    it("measures the member ratio as active over all accounts", () => {
        const members = figureOf(
            businessFigures(
                undefined,
                undefined,
                aUserCount({ total: 8, active: 6 }),
            ),
            "members",
        );

        expect(members?.ratio.percent).toBe(75);
    });
});

describe("lifetimeVolume", () => {
    it("divides settled volume across the deals that completed", () => {
        expect(
            lifetimeVolume(
                aPlatform({ volume: 12_000_000, completedTransactions: 4 }),
            )?.averageDeal,
        ).toBe("$3.0M");
    });

    it("leaves the per-deal average out until a deal has settled", () => {
        expect(lifetimeVolume(aPlatform())?.averageDeal).toBeNull();
    });
});
