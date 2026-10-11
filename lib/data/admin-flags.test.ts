import { describe, expect, it } from "vitest";
import {
    flagCounts,
    flagQueueItems,
    flagsIn,
    subjectLink,
    subjectOf,
} from "@/lib/data/admin-flags";
import { FLAG_TODAY, aFlagReport } from "@/lib/data/__fixtures__/flags";

const MESSAGE = aFlagReport({
    type: "MESSAGE",
    target: {
        kind: "MESSAGE",
        id: "msg_4",
        content: "You are wasting my time.",
        senderId: "usr_12",
    },
});

const QUEUE = [
    aFlagReport({ id: "new", openedAt: "2026-10-07T12:00:00Z" }),
    aFlagReport({
        id: "old-decision",
        status: "DISMISSED",
        decidedAt: "2026-08-01T12:00:00Z",
    }),
    aFlagReport({ id: "old", openedAt: "2026-09-01T12:00:00Z" }),
    aFlagReport({
        id: "new-decision",
        status: "RESOLVED",
        decidedAt: "2026-10-02T12:00:00Z",
    }),
];

describe("flagsIn", () => {
    it("puts open reports first, longest open at the top, then the latest decisions", () => {
        expect(flagsIn(QUEUE, "all").map((item) => item.id)).toEqual([
            "old",
            "new",
            "new-decision",
            "old-decision",
        ]);
    });

    it("counts every state and the whole queue", () => {
        expect(flagCounts(QUEUE)).toEqual({
            ACTIVE: 2,
            RESOLVED: 1,
            DISMISSED: 1,
            all: 4,
        });
    });
});

describe("subjectOf", () => {
    it("names a member, quotes a message, and says when the target is gone", () => {
        expect(subjectOf(aFlagReport())).toBe("Marcus Reyes");
        expect(subjectOf(MESSAGE)).toBe("“You are wasting my time.”");
        expect(subjectOf(aFlagReport({ target: null }))).toBe(
            "No longer on the platform",
        );
    });
});

describe("subjectLink", () => {
    it("opens the reported member's profile, or the profile of the message's sender", () => {
        expect(subjectLink(aFlagReport())).toEqual({
            href: "/admin/users/usr_9",
            label: "Open profile",
        });
        expect(subjectLink(MESSAGE)).toEqual({
            href: "/admin/users/usr_12",
            label: "Open sender",
        });
    });

    it("offers no link once the target is gone", () => {
        expect(subjectLink(aFlagReport({ target: null }))).toBeUndefined();
    });
});

describe("flagQueueItems", () => {
    it("names the kind and reason, and badges decisions only when states are mixed", () => {
        const items = flagQueueItems(QUEUE, true, FLAG_TODAY);

        expect(items[0]).toMatchObject({
            caption: "Member · Asked for a deposit off the platform",
            moment: "2d",
            status: undefined,
        });
        expect(items[1].status?.label).toBe("Dismissed");
        expect(
            flagQueueItems(QUEUE, false, FLAG_TODAY).every(
                (item) => item.status === undefined,
            ),
        ).toBe(true);
    });
});
