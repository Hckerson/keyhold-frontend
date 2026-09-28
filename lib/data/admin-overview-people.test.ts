import { describe, expect, it } from "vitest";
import { anAuditLog } from "@/lib/data/__fixtures__/admin";
import { peopleReading, recordReading } from "@/lib/data/admin-overview-people";
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

describe("peopleReading", () => {
    it("says the counts are unavailable rather than showing zeros", () => {
        expect(peopleReading(undefined)).toBe("Account counts unavailable");
    });
});
