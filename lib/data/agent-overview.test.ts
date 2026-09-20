import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    aConnection,
    aPurchaseRecord,
} from "@/lib/data/__fixtures__/connections";
import {
    agentStats,
    closedSalesFrom,
    pipelineStagesFrom,
    recentLeadsFrom,
} from "@/lib/data/agent-overview";
import { rankLeads } from "@/lib/data/agent-leads";
import { toLead } from "@/lib/utils/to-lead";

const NOW = new Date("2026-08-01T09:00:00.000Z");
const HOUR_AGO = "2026-08-01T08:00:00.000Z";
const WEEK_AGO = "2026-07-25T09:00:00.000Z";
const MONTH_AGO = "2026-07-01T09:00:00.000Z";

const rankedLeadsOf = (...connections: ReturnType<typeof aConnection>[]) =>
    rankLeads(connections.map(toLead));

const statValue = (id: string, stats: ReturnType<typeof agentStats>) =>
    stats.find((stat) => stat.id === id)?.value;

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
});

afterEach(() => {
    vi.useRealTimers();
});

describe("closedSalesFrom · comps are ranked by settlement", () => {
    it("puts the most recently settled sale first even when it opened first", () => {
        const sales = closedSalesFrom([
            aPurchaseRecord({
                id: "trx_opened_late",
                status: "COMPLETED",
                createdAt: WEEK_AGO,
                completedAt: MONTH_AGO,
            }),
            aPurchaseRecord({
                id: "trx_settled_late",
                status: "COMPLETED",
                createdAt: MONTH_AGO,
                completedAt: HOUR_AGO,
            }),
        ]);

        expect(sales.map((sale) => sale.id)).toEqual([
            "trx_settled_late",
            "trx_opened_late",
        ]);
    });

    it("leaves a sale that has not settled out of the comps entirely", () => {
        expect(
            closedSalesFrom([
                aPurchaseRecord({ status: "IN_PROGRESS", completedAt: null }),
            ]),
        ).toEqual([]);
    });
});

describe("recentLeadsFrom · the panel is ordered by recency, not by score", () => {
    it("leads with the freshest enquiry even when a colder one outranks it", () => {
        const hot = aConnection({
            id: "con_hot",
            status: "PENDING",
            updatedAt: MONTH_AGO,
            _count: { messages: 4, viewings: 2, offers: 2 },
        });
        const fresh = aConnection({
            id: "con_fresh",
            status: "PENDING",
            updatedAt: HOUR_AGO,
            _count: { messages: 0, viewings: 0, offers: 0 },
        });

        const ranked = rankedLeadsOf(hot, fresh);

        expect(ranked[0]?.id).toBe("con_hot");
        expect(recentLeadsFrom(ranked)[0]?.id).toBe("con_fresh");
    });

    it("caps the panel at the three most recent enquiries", () => {
        const connections = [
            MONTH_AGO,
            WEEK_AGO,
            HOUR_AGO,
            NOW.toISOString(),
        ].map((updatedAt, index) =>
            aConnection({ id: `con_${index}`, status: "PENDING", updatedAt }),
        );

        expect(recentLeadsFrom(rankedLeadsOf(...connections))).toHaveLength(3);
    });
});

describe("agentStats · the stat band agrees with the rest of the screen", () => {
    it("counts open enquiries exactly as the pipeline counts its enquiry stage", () => {
        const connections = [
            aConnection({ id: "con_a", status: "PENDING" }),
            aConnection({ id: "con_b", status: "PENDING" }),
            aConnection({ id: "con_c", status: "ACCEPTED" }),
            aConnection({ id: "con_d", status: "REJECTED" }),
        ];

        const stageCount = pipelineStagesFrom(connections, []).find(
            (stage) => stage.id === "leads",
        )?.count;

        const stats = agentStats(undefined, rankLeads(connections.map(toLead)));

        expect(statValue("leads", stats)).toBe(`${stageCount}`);
    });

    it("reports no closed volume as a plain zero rather than a zero in thousands", () => {
        expect(statValue("closed", agentStats(undefined, []))).toBe("$0");
    });
});
