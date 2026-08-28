import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    aConnection,
    aViewingRecord,
    anOfferRecord,
} from "@/lib/data/__fixtures__/connections";
import {
    confirmableTimes,
    expiryLabel,
    isExpired,
    isStale,
    isUrgent,
    rankOffers,
    rankViewings,
    requestStats,
    requestsSummary,
} from "@/lib/data/agent-requests";
import { toRequestBook } from "@/lib/utils/to-agent-request";

const NOW = new Date("2026-08-01T09:00:00.000Z");
const SOON = "2026-08-05T15:00:00.000Z";
const LATER = "2026-08-06T15:00:00.000Z";
const PAST = "2026-07-01T15:00:00.000Z";

const bookOf = (...connections: ReturnType<typeof aConnection>[]) =>
    toRequestBook(connections);

const statValue = (id: string, book: ReturnType<typeof bookOf>) =>
    requestStats(book).find((stat) => stat.id === id)?.value;

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
});

afterEach(() => {
    vi.useRealTimers();
});

describe("toRequestBook · what is actually waiting on the agent", () => {
    it("collects a pending viewing as work to do", () => {
        const book = bookOf(aConnection({ viewings: [aViewingRecord()] }));
        expect(book.viewings).toHaveLength(1);
    });

    it("ignores a viewing the agent has already confirmed", () => {
        const book = bookOf(
            aConnection({
                viewings: [
                    aViewingRecord({
                        status: "CONFIRMED",
                        confirmedTime: SOON,
                    }),
                ],
            }),
        );
        expect(book.viewings).toHaveLength(0);
    });

    it("collects a pending offer as work to do", () => {
        const book = bookOf(aConnection({ offers: [anOfferRecord()] }));
        expect(book.offers).toHaveLength(1);
    });

    it.each(["ACCEPTED", "REJECTED", "COUNTERED", "EXPIRED"] as const)(
        "ignores an offer already answered as %s",
        (status) => {
            const book = bookOf(
                aConnection({ offers: [anOfferRecord({ status })] }),
            );
            expect(book.offers).toHaveLength(0);
        },
    );

    it("names the buyer, not the agent, as the counterparty", () => {
        const book = bookOf(aConnection({ offers: [anOfferRecord()] }));
        expect(book.offers[0].buyerName).toBe("Ada Iwu");
    });

    it("gathers requests across every connection", () => {
        const book = bookOf(
            aConnection({ viewings: [aViewingRecord()] }),
            aConnection({ id: "con_2", offers: [anOfferRecord()] }),
        );
        expect(book.viewings).toHaveLength(1);
        expect(book.offers).toHaveLength(1);
    });
});

describe("confirmableTimes · only slots the backend will accept", () => {
    it("keeps every proposed time still in the future", () => {
        const book = bookOf(
            aConnection({
                viewings: [aViewingRecord({ proposedTimes: [SOON, LATER] })],
            }),
        );
        expect(confirmableTimes(book.viewings[0])).toEqual([SOON, LATER]);
    });

    it("drops a proposed time that has already passed", () => {
        const book = bookOf(
            aConnection({
                viewings: [aViewingRecord({ proposedTimes: [PAST, SOON] })],
            }),
        );
        expect(confirmableTimes(book.viewings[0])).toEqual([SOON]);
    });

    it("marks a request stale when every proposed time has passed", () => {
        const book = bookOf(
            aConnection({
                viewings: [aViewingRecord({ proposedTimes: [PAST] })],
            }),
        );
        expect(isStale(book.viewings[0])).toBe(true);
    });
});

describe("offer expiry · how long the agent has left", () => {
    const anOffer = (expiresAt: string) =>
        bookOf(aConnection({ offers: [anOfferRecord({ expiresAt })] }))
            .offers[0];

    it("counts a lapsed offer as expired", () => {
        expect(isExpired(anOffer("2026-07-30T09:00:00.000Z"))).toBe(true);
    });

    it("flags an offer lapsing inside a day as urgent", () => {
        expect(isUrgent(anOffer("2026-08-01T20:00:00.000Z"))).toBe(true);
    });

    it("does not flag an offer with days left as urgent", () => {
        expect(isUrgent(anOffer("2026-08-10T09:00:00.000Z"))).toBe(false);
    });

    it("labels remaining time in hours when the deadline is close", () => {
        expect(expiryLabel(anOffer("2026-08-01T20:00:00.000Z"))).toBe(
            "11h left",
        );
    });

    it("labels a lapsed offer as expired rather than a negative count", () => {
        expect(expiryLabel(anOffer("2026-07-30T09:00:00.000Z"))).toBe(
            "Expired",
        );
    });
});

describe("ranking · what the agent should handle first", () => {
    it("sinks a stale viewing below one that can still be confirmed", () => {
        const book = bookOf(
            aConnection({
                viewings: [
                    aViewingRecord({
                        id: "vwg_stale",
                        proposedTimes: [PAST],
                        createdAt: "2026-07-01T09:00:00.000Z",
                    }),
                    aViewingRecord({ id: "vwg_live", proposedTimes: [SOON] }),
                ],
            }),
        );
        expect(rankViewings(book.viewings)[0].id).toBe("vwg_live");
    });

    it("sinks an expired offer below one still open", () => {
        const book = bookOf(
            aConnection({
                offers: [
                    anOfferRecord({
                        id: "off_gone",
                        expiresAt: "2026-07-30T09:00:00.000Z",
                        createdAt: "2026-07-01T09:00:00.000Z",
                    }),
                    anOfferRecord({
                        id: "off_live",
                        expiresAt: "2026-08-10T09:00:00.000Z",
                    }),
                ],
            }),
        );
        expect(rankOffers(book.offers)[0].id).toBe("off_live");
    });

    it("puts the longest-waiting open offer first", () => {
        const book = bookOf(
            aConnection({
                offers: [
                    anOfferRecord({
                        id: "off_new",
                        createdAt: "2026-08-01T08:00:00.000Z",
                        expiresAt: "2026-08-10T09:00:00.000Z",
                    }),
                    anOfferRecord({
                        id: "off_old",
                        createdAt: "2026-07-25T09:00:00.000Z",
                        expiresAt: "2026-08-10T09:00:00.000Z",
                    }),
                ],
            }),
        );
        expect(rankOffers(book.offers)[0].id).toBe("off_old");
    });
});

describe("summary and stats · the headline the agent reads", () => {
    it("says plainly when nothing is waiting", () => {
        expect(requestsSummary(bookOf())).toBe("Nothing waiting on you");
    });

    it("counts viewings and offers separately in the headline", () => {
        const book = bookOf(
            aConnection({
                viewings: [aViewingRecord()],
                offers: [anOfferRecord()],
            }),
        );
        expect(requestsSummary(book)).toBe(
            "1 viewings · 1 offers awaiting your reply",
        );
    });

    it("shows no longest wait rather than a bogus one when idle", () => {
        expect(statValue("longest", bookOf())).toBe("—");
    });

    it("reports the longest wait across both kinds of request", () => {
        const book = bookOf(
            aConnection({
                viewings: [
                    aViewingRecord({ createdAt: "2026-07-30T09:00:00.000Z" }),
                ],
                offers: [anOfferRecord()],
            }),
        );
        expect(statValue("longest", book)).toBe("2d");
    });

    it("counts only offers lapsing within a day as urgent", () => {
        const book = bookOf(
            aConnection({
                offers: [
                    anOfferRecord({
                        id: "a",
                        expiresAt: "2026-08-01T20:00:00.000Z",
                    }),
                    anOfferRecord({
                        id: "b",
                        expiresAt: "2026-08-20T09:00:00.000Z",
                    }),
                ],
            }),
        );
        expect(statValue("urgent", book)).toBe("1");
    });
});
