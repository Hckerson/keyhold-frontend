import { describe, expect, it } from "vitest";
import {
    dealFlow,
    ledgerReading,
    ledgerTotals,
    toTransactionStages,
} from "@/lib/data/admin-transactions";
import type { LedgerTransaction } from "@/lib/types";

const aDeal = (
    overrides: Partial<LedgerTransaction> = {},
): LedgerTransaction => ({
    id: "txn_1",
    reference: "TXN-1",
    property: "12 Harbour Row",
    buyer: "Ada Vance",
    agent: "Noor Hale",
    price: 1_000_000,
    status: "IN_PROGRESS",
    cleared: ["agreement"],
    initiatedDate: "2026-08-01",
    completedDate: null,
    ageMinutes: 60,
    ...overrides,
});

describe("dealFlow", () => {
    it("lists every stage in pipeline order, even ones the API left out", () => {
        const flow = dealFlow(
            toTransactionStages([
                { status: "COMPLETED", count: 2, volume: 4_000_000 },
            ]),
        );

        expect(flow.map((stage) => stage.id)).toEqual([
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
        ]);
        expect(flow[0]).toMatchObject({ count: 0, volume: 0 });
    });

    it("earns commission on settled volume at the take rate and none on cancelled deals", () => {
        const flow = dealFlow(
            toTransactionStages([
                { status: "COMPLETED", count: 1, volume: 4_000_000 },
                { status: "CANCELLED", count: 1, volume: 2_000_000 },
            ]),
        );

        expect(flow[2].commission).toBe(100_000);
        expect(flow[3].commission).toBe(0);
    });
});

describe("ledgerTotals", () => {
    it("adds up the deals in view, their volume and their commission", () => {
        expect(
            ledgerTotals([aDeal(), aDeal({ id: "txn_2", price: 3_000_000 })]),
        ).toEqual({ count: 2, volume: 4_000_000, commission: 100_000 });
    });
});

describe("ledgerReading", () => {
    it("counts only open deals as in flight", () => {
        expect(
            ledgerReading([
                aDeal(),
                aDeal({ id: "txn_2", status: "COMPLETED" }),
            ]),
        ).toBe("1 in flight worth $1.00M · ranked by settlement risk");
    });

    it("says the ledger is empty rather than reporting zero in flight", () => {
        expect(ledgerReading([])).toBe("No deals on the ledger yet");
    });
});
