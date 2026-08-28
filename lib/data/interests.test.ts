import { describe, expect, it } from "vitest";
import { aConnection } from "@/lib/data/__fixtures__/connections";
import {
    countByStage,
    interestsSummary,
    matchesFilters,
    rankInterests,
    trackedValue,
    tractionOf,
} from "@/lib/data/interests";
import { toInterest, toInterestBook } from "@/lib/utils/to-interest";

const interest = (overrides: Parameters<typeof aConnection>[0] = {}) =>
    toInterest(aConnection(overrides));

describe("toInterest · reading a connection as an introduction", () => {
    it("maps a pending connection to an awaiting-reply interest", () => {
        expect(interest({ status: "PENDING" }).status).toBe("pending");
    });

    it("maps an accepted connection to an introduced interest", () => {
        expect(interest({ status: "ACCEPTED" }).status).toBe("connected");
    });

    it("maps a rejected connection to a declined interest", () => {
        expect(interest({ status: "REJECTED" }).status).toBe("declined");
    });

    it("falls back to a null photo when the listing carries no images", () => {
        expect(interest().photo).toBeNull();
    });
});

describe("tractionOf · how far an introduction has moved", () => {
    it("reads as quiet when nothing has happened since the enquiry", () => {
        expect(tractionOf(interest())).toBe("quiet");
    });

    it("reads as talking once messages have been exchanged", () => {
        expect(
            tractionOf(
                interest({ _count: { messages: 3, viewings: 0, offers: 0 } }),
            ),
        ).toBe("talking");
    });

    it("reads as touring once a viewing exists, whatever the message count", () => {
        expect(
            tractionOf(
                interest({ _count: { messages: 9, viewings: 1, offers: 0 } }),
            ),
        ).toBe("touring");
    });

    it("reads as bidding once an offer is on the table", () => {
        expect(
            tractionOf(
                interest({ _count: { messages: 9, viewings: 4, offers: 1 } }),
            ),
        ).toBe("bidding");
    });
});

describe("rankInterests · which introduction leads the book", () => {
    it("puts the furthest-along introduction ahead of a newer quiet one", () => {
        const quiet = interest({ id: "con_quiet" });
        const bidding = interest({
            id: "con_bidding",
            _count: { messages: 1, viewings: 1, offers: 1 },
        });

        expect(rankInterests([quiet, bidding])[0].id).toBe("con_bidding");
    });

    it("breaks a traction tie on status, awaiting-reply first", () => {
        const introduced = interest({ id: "con_in", status: "ACCEPTED" });
        const awaiting = interest({ id: "con_await", status: "PENDING" });

        expect(rankInterests([introduced, awaiting])[0].id).toBe("con_await");
    });
});

describe("countByStage · what the stage filters report", () => {
    it("counts a declined introduction as closed, not live", () => {
        const book = toInterestBook([
            aConnection({ id: "a", status: "PENDING" }),
            aConnection({ id: "b", status: "REJECTED" }),
        ]);

        expect(countByStage(book)).toEqual({ all: 2, open: 1, closed: 1 });
    });
});

describe("matchesFilters · what survives the toolbar", () => {
    it("hides a declined introduction behind the live filter", () => {
        expect(
            matchesFilters(interest({ status: "REJECTED" }), "open", "all"),
        ).toBe(false);
    });

    it("keeps a status match that also satisfies the stage", () => {
        expect(
            matchesFilters(interest({ status: "PENDING" }), "open", "pending"),
        ).toBe(true);
    });
});

describe("trackedValue · what the live book is worth", () => {
    it("excludes declined introductions from the tracked total", () => {
        const book = toInterestBook([
            aConnection({ id: "a", status: "PENDING" }),
            aConnection({ id: "b", status: "REJECTED" }),
        ]);

        expect(trackedValue(book)).toBe(4_200_000);
    });

    it("summarises the book as live count and tracked value", () => {
        expect(interestsSummary(toInterestBook([aConnection()]))).toBe(
            "1 live · $4.20M tracked",
        );
    });
});
