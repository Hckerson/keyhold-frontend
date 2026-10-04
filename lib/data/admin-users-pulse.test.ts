import { subDays } from "date-fns";
import { describe, expect, it } from "vitest";
import { aMemberRecord } from "@/lib/data/__fixtures__/users";
import {
    leadingAccounts,
    recencyBands,
    signupTrend,
    waitingAccounts,
    waitingReading,
} from "@/lib/data/admin-users-pulse";
import { toManagedUser } from "@/lib/utils/to-managed-user";
import type { User } from "@/lib/validations/user";

const NOW = new Date(2026, 8, 15);

const anAccount = (overrides: Partial<User> = {}) =>
    toManagedUser(aMemberRecord(overrides));

const seenDaysAgo = (days: number, overrides: Partial<User> = {}) =>
    anAccount({
        lastActive: subDays(new Date(), days).toISOString(),
        ...overrides,
    });

describe("signupTrend", () => {
    it("counts sign-ups in each of the last twelve months, ending with the current one", () => {
        const trend = signupTrend(
            [
                anAccount({ createdAt: "2026-09-02T09:00:00.000Z" }),
                anAccount({ createdAt: "2026-09-10T09:00:00.000Z" }),
                anAccount({ createdAt: "2026-08-20T09:00:00.000Z" }),
            ],
            NOW,
        );

        expect(trend.months).toHaveLength(12);
        expect(trend.months.slice(-2)).toEqual([1, 2]);
        expect(trend).toMatchObject({ latest: 2, latestLabel: "Sep" });
    });

    it("leaves the change unstated when the prior month had no sign-ups", () => {
        expect(signupTrend([], NOW).delta).toBeNull();
    });
});

describe("recencyBands", () => {
    it("places each live account in exactly one sign-in band and ignores deleted ones", () => {
        const bands = recencyBands([
            seenDaysAgo(2),
            seenDaysAgo(20),
            seenDaysAgo(60),
            seenDaysAgo(200),
            seenDaysAgo(1, { status: "DELETED" }),
        ]);

        expect(bands.map((band) => band.count)).toEqual([1, 1, 1, 1]);
        expect(bands.map((band) => band.percent)).toEqual([25, 25, 25, 25]);
    });
});

describe("leadingAccounts", () => {
    it("ranks accounts by lifetime volume and leaves out those with none", () => {
        const leaders = leadingAccounts([
            anAccount({ id: "a", volume: 1_000 }),
            anAccount({ id: "b", volume: 0 }),
            anAccount({ id: "c", volume: 5_000 }),
        ]);

        expect(leaders.map((user) => user.id)).toEqual(["c", "a"]);
    });
});

describe("waitingAccounts", () => {
    it("holds only suspended and pending accounts, suspended first", () => {
        const waiting = waitingAccounts([
            anAccount({ id: "active" }),
            anAccount({ id: "pending", status: "PENDING" }),
            anAccount({ id: "gone", status: "DELETED" }),
            anAccount({ id: "held", status: "SUSPENDED" }),
        ]);

        expect(waiting.map((user) => user.id)).toEqual(["held", "pending"]);
    });

    it("says nothing is waiting rather than listing zero counts", () => {
        expect(waitingReading([anAccount()])).toBe(
            "No account is waiting on a decision",
        );
    });
});
