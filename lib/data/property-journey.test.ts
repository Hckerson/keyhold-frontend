import { describe, expect, it } from "vitest";
import {
    PROPERTY_ID,
    aConnection,
    aPurchaseRecord,
    aViewingRecord,
    anOfferRecord,
} from "@/lib/data/__fixtures__/connections";
import { journeyActions, propertyJourney } from "@/lib/data/property-journey";
import { isGated } from "@/lib/config/property-journey";
import { BUYER_ROUTES } from "@/lib/constants";

const stageOf = (
    connections = [aConnection()],
    purchases: ReturnType<typeof aPurchaseRecord>[] = [],
    savedIds: string[] = [],
) => propertyJourney(PROPERTY_ID, connections, savedIds, purchases).stage;

describe("propertyJourney · where the buyer stands", () => {
    it("reads as browsing when no interest has been registered", () => {
        expect(stageOf([])).toBe("browsing");
    });

    it("reads as requested while the seller has not answered", () => {
        expect(stageOf([aConnection({ status: "PENDING" })])).toBe("requested");
    });

    it("reads as declined once the seller rejects the introduction", () => {
        expect(stageOf([aConnection({ status: "REJECTED" })])).toBe("declined");
    });

    it("reads as connected once accepted with nothing else in flight", () => {
        expect(stageOf()).toBe("connected");
    });

    it("reads as viewing while a requested viewing is still open", () => {
        expect(stageOf([aConnection({ viewings: [aViewingRecord()] })])).toBe(
            "viewing",
        );
    });

    it("prefers a live offer over an open viewing", () => {
        expect(
            stageOf([
                aConnection({
                    viewings: [aViewingRecord()],
                    offers: [anOfferRecord()],
                }),
            ]),
        ).toBe("offered");
    });

    it("reads as countered when the seller answers with new terms", () => {
        expect(
            stageOf([
                aConnection({
                    offers: [anOfferRecord({ status: "COUNTERED" })],
                }),
            ]),
        ).toBe("countered");
    });

    it.each(["REJECTED", "EXPIRED"] as const)(
        "ignores a %s offer and falls back to the connection",
        (status) => {
            expect(
                stageOf([aConnection({ offers: [anOfferRecord({ status })] })]),
            ).toBe("connected");
        },
    );

    it("reads as closing once a transaction is underway", () => {
        expect(stageOf([aConnection()], [aPurchaseRecord()])).toBe("closing");
    });

    it("reads as owned once the transaction completes", () => {
        expect(
            stageOf(
                [aConnection()],
                [aPurchaseRecord({ status: "COMPLETED" })],
            ),
        ).toBe("owned");
    });

    it("lets a completed purchase outrank a stale live offer", () => {
        expect(
            stageOf(
                [aConnection({ offers: [anOfferRecord()] })],
                [aPurchaseRecord({ status: "COMPLETED" })],
            ),
        ).toBe("owned");
    });

    it("reports the save state independently of the stage", () => {
        expect(propertyJourney(PROPERTY_ID, [], [PROPERTY_ID], []).saved).toBe(
            true,
        );
    });

    it("ignores connections and purchases belonging to other properties", () => {
        expect(
            propertyJourney(
                "prp_other",
                [aConnection()],
                [],
                [aPurchaseRecord()],
            ).stage,
        ).toBe("browsing");
    });
});

describe("journeyActions · what the buyer may do next", () => {
    it("offers only interest registration before an introduction", () => {
        const actions = journeyActions(
            propertyJourney(PROPERTY_ID, [], [], []),
        );
        expect(actions.primary.kind).toBe("interest");
        expect(actions.secondary).toBeNull();
    });

    it("withholds every action while the request is pending", () => {
        const journey = propertyJourney(
            PROPERTY_ID,
            [aConnection({ status: "PENDING" })],
            [],
            [],
        );
        expect(journeyActions(journey).primary.kind).toBe("none");
    });

    it("opens viewing and offer together once accepted", () => {
        const actions = journeyActions(
            propertyJourney(PROPERTY_ID, [aConnection()], [], []),
        );
        expect(actions.primary.kind).toBe("viewing");
        expect(actions.secondary?.kind).toBe("offer");
    });

    it("points a live offer at its own detail route", () => {
        const journey = propertyJourney(
            PROPERTY_ID,
            [aConnection({ offers: [anOfferRecord()] })],
            [],
            [],
        );
        expect(journeyActions(journey).primary.href).toBe(
            BUYER_ROUTES.offer("off_1"),
        );
    });

    it("points a closing at the transactions ledger", () => {
        const journey = propertyJourney(
            PROPERTY_ID,
            [aConnection()],
            [],
            [aPurchaseRecord()],
        );
        expect(journeyActions(journey).primary.href).toBe(
            BUYER_ROUTES.transactions,
        );
    });
});

describe("isGated · stages that cannot transact", () => {
    it.each(["browsing", "requested", "declined"] as const)(
        "gates %s",
        (stage) => expect(isGated(stage)).toBe(true),
    );

    it.each(["connected", "viewing", "offered", "owned"] as const)(
        "opens %s",
        (stage) => expect(isGated(stage)).toBe(false),
    );
});
