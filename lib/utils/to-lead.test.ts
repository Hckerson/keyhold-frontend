import { describe, expect, it } from "vitest";
import {
    aConnection,
    aContactActivity,
} from "@/lib/data/__fixtures__/connections";
import { toLead } from "@/lib/utils/to-lead";

const CONNECTION_TOUCHED = "2026-08-01T09:00:00.000Z";
const CALLED_LATER = "2026-08-04T09:00:00.000Z";

describe("toLead · last touch", () => {
    it("reads the newest contact activity rather than the connection's own timestamp", () => {
        const withActivity = toLead(
            aConnection({
                updatedAt: CONNECTION_TOUCHED,
                contactActivities: [
                    aContactActivity({
                        channel: "CALL",
                        occurredAt: CALLED_LATER,
                    }),
                ],
            }),
        );

        const withoutActivity = toLead(
            aConnection({ updatedAt: CONNECTION_TOUCHED }),
        );

        expect(withActivity.lastContact).not.toBe(withoutActivity.lastContact);
    });

    it("falls back to the connection timestamp when nobody has reached out yet", () => {
        expect(
            toLead(
                aConnection({
                    updatedAt: CONNECTION_TOUCHED,
                    contactActivities: [],
                }),
            ).lastContact,
        ).toBe(
            toLead(aConnection({ updatedAt: CONNECTION_TOUCHED })).lastContact,
        );
    });
});
