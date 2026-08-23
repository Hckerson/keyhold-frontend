import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { aPurchase } from "@/lib/data/__fixtures__/purchases";
import {
    canRelease,
    countByFilter,
    heldValue,
    inspectionLabel,
    matchesFilter,
    purchaseStats,
    rankPurchases,
    PURCHASE_FILTERS,
} from "@/lib/data/purchases";

const NOW = new Date("2026-08-01T00:00:00.000Z");

const statValue = (id: string, purchases = [aPurchase()]) =>
    purchaseStats(purchases).find((stat) => stat.id === id)?.value;

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
});

afterEach(() => {
    vi.useRealTimers();
});

describe("canRelease · what is releasable", () => {
    it("2.1 releases only a held escrow that carries an id", () => {
        expect(canRelease(aPurchase())).toBe(true);
    });

    it("2.1 refuses a held escrow with no id", () => {
        expect(canRelease(aPurchase({ escrowId: null }))).toBe(false);
    });

    it.each(["RELEASED", "REFUNDED", "DISPUTED"] as const)(
        "2.2 refuses an escrow that is already %s",
        (escrowStatus) => {
            expect(canRelease(aPurchase({ escrowStatus }))).toBe(false);
        },
    );

    it("2.3 refuses a purchase with no escrow at all", () => {
        expect(
            canRelease(
                aPurchase({
                    escrowId: null,
                    escrowStatus: null,
                    escrowAmount: null,
                }),
            ),
        ).toBe(false);
    });

    it("2.4 is unaffected by a closed inspection window", () => {
        const closed = aPurchase({
            inspectionEndsAt: "2026-07-01T00:00:00.000Z",
        });

        expect(inspectionLabel(closed)).toBe("Window closed");
        expect(canRelease(closed)).toBe(true);
    });
});

describe("inspectionLabel", () => {
    it("2.5 counts whole days down to the window's end", () => {
        expect(
            inspectionLabel(
                aPurchase({ inspectionEndsAt: "2026-08-04T00:00:00.000Z" }),
            ),
        ).toBe("3d left");
    });

    it("2.5 reads as closed the moment the window ends", () => {
        expect(
            inspectionLabel(aPurchase({ inspectionEndsAt: NOW.toISOString() })),
        ).toBe("Window closed");
    });

    it("2.5 falls back to an em-dash when there is no window", () => {
        expect(inspectionLabel(aPurchase({ inspectionEndsAt: null }))).toBe(
            "—",
        );
    });
});

describe("rankPurchases · ordering", () => {
    const releasable = aPurchase({ id: "releasable" });
    const openHold = aPurchase({ id: "open", escrowStatus: "RELEASED" });
    const settled = aPurchase({
        id: "settled",
        status: "COMPLETED",
        escrowStatus: "RELEASED",
    });

    it("6.1 puts releasable first, then unsettled, then settled", () => {
        expect(
            rankPurchases([settled, openHold, releasable]).map(
                (purchase) => purchase.id,
            ),
        ).toEqual(["releasable", "open", "settled"]);
    });

    it("6.1 orders newest first inside a tier", () => {
        const older = aPurchase({
            id: "older",
            escrowStatus: "RELEASED",
            startedAt: "2026-01-01T00:00:00.000Z",
        });
        const newer = aPurchase({
            id: "newer",
            escrowStatus: "RELEASED",
            startedAt: "2026-06-01T00:00:00.000Z",
        });

        expect(
            rankPurchases([older, newer]).map((purchase) => purchase.id),
        ).toEqual(["newer", "older"]);
    });

    it("6.2 does not mutate the array it was given", () => {
        const given = [settled, releasable];

        rankPurchases(given);

        expect(given.map((purchase) => purchase.id)).toEqual([
            "settled",
            "releasable",
        ]);
    });
});

describe("totals", () => {
    it("6.3 totals held escrow only", () => {
        expect(
            heldValue([
                aPurchase({ escrowAmount: 100 }),
                aPurchase({ escrowStatus: "RELEASED", escrowAmount: 900 }),
            ]),
        ).toBe(100);
    });

    it("6.3 counts a missing amount as zero, not NaN", () => {
        const total = heldValue([
            aPurchase({ escrowAmount: null }),
            aPurchase({ escrowAmount: 250 }),
        ]);

        expect(total).toBe(250);
        expect(Number.isNaN(total)).toBe(false);
    });

    it("6.4 counts escrow, releasable and settled against the same rules", () => {
        const purchases = [
            aPurchase({ id: "a" }),
            aPurchase({ id: "b", escrowId: null }),
            aPurchase({
                id: "c",
                status: "COMPLETED",
                escrowStatus: "RELEASED",
            }),
        ];

        expect(statValue("held", purchases)).toBe("2");
        expect(statValue("releasable", purchases)).toBe("1");
        expect(statValue("settled", purchases)).toBe("1");
    });
});

describe("filters", () => {
    it("6.5 counts each filter exactly as that filter selects", () => {
        const purchases = [
            aPurchase({ id: "open" }),
            aPurchase({ id: "done", status: "COMPLETED" }),
            aPurchase({ id: "void", status: "CANCELLED" }),
        ];
        const counts = countByFilter(purchases);

        for (const { id } of PURCHASE_FILTERS) {
            expect(counts[id]).toBe(
                purchases.filter((purchase) => matchesFilter(purchase, id))
                    .length,
            );
        }
    });

    it("6.5 treats both completed and cancelled as settled", () => {
        expect(
            countByFilter([
                aPurchase({ status: "COMPLETED" }),
                aPurchase({ status: "CANCELLED" }),
                aPurchase({ status: "PENDING" }),
            ]),
        ).toEqual({ all: 3, open: 1, settled: 2 });
    });
});

describe("an empty list", () => {
    it("6.6 totals to zero without NaN", () => {
        expect(heldValue([])).toBe(0);
        expect(countByFilter([])).toEqual({ all: 0, open: 0, settled: 0 });
    });

    it("6.6 renders every stat as a finite figure", () => {
        for (const stat of purchaseStats([])) {
            expect(stat.value).not.toMatch(/NaN|Infinity|^$/);
        }
    });
});
