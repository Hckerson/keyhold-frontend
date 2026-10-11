import { describe, expect, it } from "vitest";
import {
    memberFacts,
    paneTitle,
    reportedLine,
} from "@/lib/data/admin-flag-detail";
import { aFlagReport } from "@/lib/data/__fixtures__/flags";

describe("paneTitle", () => {
    it("titles a message report plainly, so the message itself is shown once", () => {
        expect(
            paneTitle(
                aFlagReport({
                    type: "MESSAGE",
                    target: {
                        kind: "MESSAGE",
                        id: "msg_4",
                        content: "You are wasting my time.",
                        senderId: "usr_12",
                    },
                }),
            ),
        ).toBe("Reported message");
        expect(paneTitle(aFlagReport())).toBe("Marcus Reyes");
    });

    it("dates the report in the caption", () => {
        expect(reportedLine(aFlagReport())).toBe("Reported Oct 1, 2026");
    });
});

describe("memberFacts", () => {
    it("names the reported member's account state in words", () => {
        expect(
            memberFacts({
                kind: "USER",
                id: "usr_9",
                name: "Marcus Reyes",
                email: "marcus@example.com",
                status: "SUSPENDED",
            }),
        ).toContainEqual({ label: "Account", value: "Suspended" });
    });
});
