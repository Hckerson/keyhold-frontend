import type { Payout } from "@/lib/types";

export const aPayout = (overrides: Partial<Payout> = {}): Payout => ({
    id: "esc_1",
    recipient: "Noor Hale",
    deal: "12 Harbour Row",
    locality: "Malibu",
    buyer: "Ada Vance",
    state: "HELD",
    gross: 100_000,
    ageMinutes: 60,
    inspectionEndsAt: null,
    settledAt: null,
    href: "/admin/transactions",
    ...overrides,
});
