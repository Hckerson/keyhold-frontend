import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { anAuditLog } from "@/lib/data/__fixtures__/admin";
import { toAuditEvent } from "@/lib/utils/to-audit-event";

const NOW = new Date("2026-08-01T10:00:00.000Z");

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
});

afterEach(() => {
    vi.useRealTimers();
});

describe("toAuditEvent", () => {
    it("names the subject in UI words rather than the backend code", () => {
        expect(
            toAuditEvent(anAuditLog({ entityType: "PROPERTY" })).subject,
        ).toBe("Listing");
    });

    it("passes through a subject the UI has no label for", () => {
        expect(toAuditEvent(anAuditLog({ entityType: "WIDGET" })).subject).toBe(
            "WIDGET",
        );
    });

    it("credits an action with no recorded actor to the system", () => {
        expect(toAuditEvent(anAuditLog({ actor: undefined })).actor).toBe(
            "System",
        );
    });

    it("marks failed sign-ins as security events", () => {
        expect(
            toAuditEvent(anAuditLog({ action: "LOGIN_FAILED" })).security,
        ).toBe(true);
    });

    it("measures age from when the action was recorded", () => {
        expect(toAuditEvent(anAuditLog()).ageMinutes).toBe(60);
    });
});
