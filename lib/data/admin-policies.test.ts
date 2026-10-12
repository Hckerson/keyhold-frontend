import { describe, expect, it } from "vitest";
import { changedFrom, pendingWarnings } from "@/lib/data/admin-policies";
import { EMPTY_POLICY_STATE } from "@/lib/data/admin-settings";

describe("pendingWarnings", () => {
    it("warns before saving a switch that takes the marketplace offline", () => {
        expect(
            pendingWarnings(
                { ...EMPTY_POLICY_STATE, "maintenance-mode": true },
                EMPTY_POLICY_STATE,
            ),
        ).toEqual([
            "Saving takes the marketplace offline for everyone but admins.",
        ]);
    });

    it("stays quiet when a risky switch moves the safe way", () => {
        expect(
            pendingWarnings(EMPTY_POLICY_STATE, {
                ...EMPTY_POLICY_STATE,
                "maintenance-mode": true,
            }),
        ).toEqual([]);
    });
});

describe("changedFrom", () => {
    it("gives the saved value of a toggled policy and nothing for an untouched one", () => {
        const toggled = { ...EMPTY_POLICY_STATE, "open-signups": true };

        expect(changedFrom(toggled, EMPTY_POLICY_STATE, "open-signups")).toBe(
            false,
        );
        expect(
            changedFrom(toggled, EMPTY_POLICY_STATE, "payout-automation"),
        ).toBeUndefined();
    });
});
