import { describe, expect, it } from "vitest";
import { aQueueLoad, aUserCount } from "@/lib/data/__fixtures__/admin";
import {
    decisionLanes,
    oldestWait,
    triageReading,
} from "@/lib/data/admin-overview-triage";

const aBacklog = () => [
    aQueueLoad({ id: "verifications" }),
    aQueueLoad({ id: "listings", backlog: 2, oldestMinutes: 30 }),
    aQueueLoad({ id: "flags", backlog: 1, oldestMinutes: 500 }),
    aQueueLoad({ id: "disputes" }),
];

const shareOf = (lanes: ReturnType<typeof decisionLanes>, id: string) =>
    lanes.find((lane) => lane.id === id)?.share;

describe("decisionLanes", () => {
    it("puts waiting queues ahead of clear ones, longest wait first", () => {
        const lanes = decisionLanes(aBacklog(), aUserCount({ pending: 3 }));

        expect(lanes.map((lane) => lane.id)).toEqual([
            "flags",
            "listings",
            "accounts",
            "verifications",
            "disputes",
        ]);
    });

    it("splits the share of open decisions across the queues holding them", () => {
        const lanes = decisionLanes(aBacklog(), aUserCount({ pending: 3 }));

        expect(shareOf(lanes, "flags")).toBe(17);
        expect(shareOf(lanes, "listings")).toBe(33);
        expect(shareOf(lanes, "accounts")).toBe(50);
    });

    it("reports no age for account approvals, whose age is not tracked", () => {
        const lanes = decisionLanes([], aUserCount({ pending: 3 }));

        expect(lanes[0]).toMatchObject({
            id: "accounts",
            oldestMinutes: null,
        });
    });

    it("treats unknown account counts as nothing waiting", () => {
        expect(decisionLanes([], undefined)[0].backlog).toBe(0);
    });
});

describe("oldestWait", () => {
    it("ignores the stale age on a queue that has since cleared", () => {
        const lanes = decisionLanes(
            [
                aQueueLoad({ id: "flags", oldestMinutes: 9_999 }),
                aQueueLoad({ id: "listings", backlog: 1, oldestMinutes: 45 }),
            ],
            undefined,
        );

        expect(oldestWait(lanes)).toBe(45);
    });
});

describe("triageReading", () => {
    it("summarises open decisions, waiting queues and the longest wait", () => {
        const lanes = decisionLanes(aBacklog(), aUserCount({ pending: 3 }));

        expect(triageReading(lanes, "ready")).toBe(
            "6 open across 3 of 5 queues · oldest waiting 8h",
        );
    });

    it("says every queue is clear when nothing is open", () => {
        expect(triageReading(decisionLanes([], undefined), "ready")).toBe(
            "Every queue is clear",
        );
    });

    it("does not claim a count while a queue has not reported", () => {
        const lanes = decisionLanes(aBacklog(), undefined);

        expect(triageReading(lanes, "pending")).not.toMatch(/\d/);
        expect(triageReading(lanes, "error")).not.toMatch(/\d/);
    });
});
