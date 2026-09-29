import { describe, expect, it } from "vitest";
import { anAuditLog, aUserCount } from "@/lib/data/__fixtures__/admin";
import { aMemberRecord } from "@/lib/data/__fixtures__/users";
import {
    coverageReading,
    recordReading,
    statusShares,
} from "@/lib/data/admin-overview-people";
import { toAuditEvents } from "@/lib/utils/to-audit-event";

describe("recordReading", () => {
    it("counts failed sign-ins and denials among the latest actions", () => {
        const events = toAuditEvents([
            anAuditLog({ id: "aud_1", action: "LOGIN_FAILED" }),
            anAuditLog({ id: "aud_2", action: "PERMISSION_DENIED" }),
            anAuditLog({ id: "aud_3", action: "LOGIN" }),
        ]);

        expect(recordReading(events)).toBe(
            "2 of the latest 3 were failed sign-ins or denials",
        );
    });

    it("does not count a deletion as a security event even though it reads as an error", () => {
        const events = toAuditEvents([anAuditLog({ action: "USER_DELETED" })]);

        expect(recordReading(events)).toBe(
            "No failed sign-ins or denials in the latest 1",
        );
    });

    it("says nothing is recorded when the log is empty", () => {
        expect(recordReading([])).toBe("No recorded actions yet");
    });
});

describe("statusShares", () => {
    it("gives each account state its share of every account", () => {
        const shares = statusShares(
            aUserCount({ total: 10, active: 7, pending: 2, suspended: 1 }),
        );

        expect(shares.map((share) => share.percent)).toEqual([70, 20, 10]);
    });

    it("shows empty meters rather than dividing by zero when counts are unknown", () => {
        expect(statusShares(undefined).map((share) => share.percent)).toEqual([
            0, 0, 0,
        ]);
    });
});

describe("coverageReading", () => {
    it("states how many buyers each agent serves", () => {
        const users = [
            ...Array.from({ length: 6 }, () =>
                aMemberRecord({ role: "BUYER" }),
            ),
            aMemberRecord({ role: "SELLER" }),
            aMemberRecord({ role: "SELLER" }),
        ];

        expect(coverageReading(users)).toBe("3 buyers for every agent");
    });

    it("says there are no agents instead of dividing by zero", () => {
        expect(coverageReading([aMemberRecord({ role: "BUYER" })])).toBe(
            "No agents on the platform yet",
        );
    });
});
