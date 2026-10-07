import type { TrendStats } from "@/lib/validations/stats";

export const REPORT_TODAY = new Date("2026-10-07T12:00:00Z");

export const aTrend = (overrides: Partial<TrendStats> = {}): TrendStats => ({
    gmv: [
        { name: "2026-08", value: 5_400_000 },
        { name: "2026-09", value: 6_100_000 },
    ],
    deals: [
        { name: "2026-08", value: 1 },
        { name: "2026-09", value: 2 },
    ],
    users: [
        { name: "2025-12", value: 20 },
        { name: "2026-09", value: 18 },
        { name: "2026-10", value: 1 },
    ],
    listings: [{ name: "2026-10", value: 3 }],
    ...overrides,
});
