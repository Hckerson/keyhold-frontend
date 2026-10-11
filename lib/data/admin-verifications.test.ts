import { describe, expect, it } from "vitest";
import {
    documentFacts,
    verificationCounts,
    verificationQueueItems,
    verificationReading,
    verificationsIn,
} from "@/lib/data/admin-verifications";
import {
    VERIFICATION_TODAY,
    aVerification,
} from "@/lib/data/__fixtures__/verifications";

const QUEUE = [
    aVerification({ id: "new", submittedAt: "2026-10-07T12:00:00Z" }),
    aVerification({
        id: "old-decision",
        status: "VERIFIED",
        decidedAt: "2026-08-01T12:00:00Z",
    }),
    aVerification({ id: "old", submittedAt: "2026-08-10T12:00:00Z" }),
    aVerification({
        id: "new-decision",
        status: "REJECTED",
        decidedAt: "2026-10-01T12:00:00Z",
    }),
];

describe("verificationsIn", () => {
    it("puts open requests first, longest waiting at the top, then the latest decisions", () => {
        expect(verificationsIn(QUEUE, "all").map((item) => item.id)).toEqual([
            "old",
            "new",
            "new-decision",
            "old-decision",
        ]);
    });

    it("keeps only the requests in the chosen state", () => {
        expect(
            verificationsIn(QUEUE, "PENDING").map((item) => item.id),
        ).toEqual(["old", "new"]);
    });
});

describe("verificationCounts", () => {
    it("counts every state and the whole queue", () => {
        expect(verificationCounts(QUEUE)).toEqual({
            all: 4,
            PENDING: 2,
            VERIFIED: 1,
            REJECTED: 1,
        });
    });
});

describe("verificationReading", () => {
    it("states how many requests wait and how long the oldest has waited", () => {
        expect(verificationReading(QUEUE, VERIFICATION_TODAY)).toBe(
            "2 waiting · oldest 60 days",
        );
    });

    it("says nothing is waiting once every request is decided", () => {
        expect(
            verificationReading(
                [aVerification({ status: "VERIFIED" })],
                VERIFICATION_TODAY,
            ),
        ).toBe("Nothing is waiting for review");
    });
});

describe("verificationQueueItems", () => {
    it("shows an open request's wait and a decided request's decision date", () => {
        const [open, , , decided] = verificationQueueItems(
            QUEUE,
            false,
            VERIFICATION_TODAY,
        );

        expect(open.moment).toBe("2d");
        expect(decided.moment).toBe("Oct 1");
    });

    it("badges a decided request only when the view mixes states", () => {
        const badged = (mixed: boolean) =>
            verificationQueueItems(QUEUE, mixed, VERIFICATION_TODAY).map(
                (item) => item.status?.label,
            );

        expect(badged(true)).toEqual([
            undefined,
            "Verified",
            undefined,
            "Rejected",
        ]);
        expect(badged(false).every((label) => label === undefined)).toBe(true);
    });
});

describe("documentFacts", () => {
    it("flags a document that expired before the review", () => {
        const expiry = documentFacts(
            aVerification({ expiresAt: "2026-01-04T12:00:00Z" }),
            VERIFICATION_TODAY,
        ).find((fact) => fact.alarm);

        expect(expiry).toEqual({
            label: "Expired",
            value: "Jan 4, 2026",
            alarm: true,
        });
    });

    it("leaves a document still in date unflagged", () => {
        expect(
            documentFacts(aVerification(), VERIFICATION_TODAY).some(
                (fact) => fact.alarm,
            ),
        ).toBe(false);
    });
});
