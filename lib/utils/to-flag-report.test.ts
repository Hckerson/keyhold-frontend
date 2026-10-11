import { describe, expect, it } from "vitest";
import { toFlagReport } from "@/lib/utils/to-flag-report";
import { aMemberFlag, aMessageFlag } from "@/lib/data/__fixtures__/flags";

describe("toFlagReport", () => {
    it("keeps the reported member's name, email and account state", () => {
        expect(toFlagReport(aMemberFlag()).target).toEqual({
            kind: "USER",
            id: "usr_9",
            name: "Marcus Reyes",
            email: "marcus@example.com",
            status: "ACTIVE",
        });
    });

    it("keeps the reported message's words and who sent it", () => {
        expect(toFlagReport(aMessageFlag()).target).toEqual({
            kind: "MESSAGE",
            id: "msg_4",
            content: "Take it or leave it, you are wasting my time.",
            senderId: "usr_12",
        });
    });

    it("leaves the target empty when what was reported no longer exists", () => {
        expect(toFlagReport(aMemberFlag({ target: null })).target).toBeNull();
    });

    it("dates a decision by when the report was settled", () => {
        expect(
            toFlagReport(
                aMemberFlag({
                    status: "RESOLVED",
                    resolvedAt: "2026-10-03T12:00:00.000Z",
                }),
            ).decidedAt,
        ).toBe("2026-10-03T12:00:00.000Z");
    });
});
