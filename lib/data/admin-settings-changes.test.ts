import { describe, expect, it } from "vitest";
import {
    configErrors,
    errorCount,
    fixLine,
    lastEditLine,
    recentSettingChanges,
    unsavedLabels,
    unsavedLine,
    withBaselineHints,
} from "@/lib/data/admin-settings-changes";
import { MARKETPLACE_FIELDS } from "@/lib/config/admin-settings";
import {
    EMPTY_ADMIN_CONFIG,
    EMPTY_POLICY_STATE,
} from "@/lib/data/admin-settings";
import {
    SETTINGS_TODAY,
    aPlatformSetting,
} from "@/lib/data/__fixtures__/settings";

const SETTINGS = [
    aPlatformSetting(),
    aPlatformSetting({
        key: "platformFee",
        value: "495",
        updatedAt: "2026-10-12T09:00:00.000Z",
    }),
    aPlatformSetting({
        key: "maintenanceMode",
        value: "true",
        updatedAt: "2026-10-01T12:00:00.000Z",
    }),
    aPlatformSetting({
        key: "listingExpiryDays",
        value: "90",
        updatedAt: null,
        updatedBy: null,
    }),
    aPlatformSetting({ key: "retiredKey", value: "x" }),
];

describe("recentSettingChanges", () => {
    it("lists edited settings newest first, named and valued the way the form shows them", () => {
        expect(
            recentSettingChanges(SETTINGS, SETTINGS_TODAY).map((change) => [
                change.label,
                change.value,
            ]),
        ).toEqual([
            ["Listing Fee", "$495"],
            ["Commission Rate", "2.5%"],
            ["Maintenance Mode", "On"],
        ]);
    });

    it("leaves out settings nobody has edited and keys the page does not show", () => {
        const keys = recentSettingChanges(SETTINGS, SETTINGS_TODAY).map(
            (change) => change.key,
        );

        expect(keys).not.toContain("listingExpiryDays");
        expect(keys).not.toContain("retiredKey");
    });

    it("says how long ago the newest setting changed", () => {
        expect(
            lastEditLine(recentSettingChanges(SETTINGS, SETTINGS_TODAY)),
        ).toBe("Last changed 3h ago");
        expect(lastEditLine([])).toBeUndefined();
    });
});

describe("unsavedLabels", () => {
    it("names every edited field and toggled policy", () => {
        const labels = unsavedLabels(
            { ...EMPTY_ADMIN_CONFIG, commissionRate: "3" },
            EMPTY_ADMIN_CONFIG,
            { ...EMPTY_POLICY_STATE, "open-signups": true },
            EMPTY_POLICY_STATE,
        );

        expect(labels).toEqual(["Commission Rate", "Open Signups"]);
        expect(unsavedLine(labels)).toBe("2 unsaved changes");
    });
});

describe("withBaselineHints", () => {
    it("tells an edited field what it was, and leaves untouched fields alone", () => {
        const baseline = {
            ...EMPTY_ADMIN_CONFIG,
            platformFee: "495",
            escrowHoldDays: "10",
        };
        const hinted = withBaselineHints(
            MARKETPLACE_FIELDS,
            { ...baseline, platformFee: "550" },
            baseline,
        );

        expect(hinted.find((field) => field.name === "platformFee")?.hint).toBe(
            "Was $495",
        );
        expect(
            hinted.find((field) => field.name === "escrowHoldDays")?.hint,
        ).toBeUndefined();
    });
});

describe("configErrors", () => {
    const VALID = {
        ...EMPTY_ADMIN_CONFIG,
        platformName: "Keyhold",
        supportEmail: "support@keyhol.me",
        baseCurrency: "USD",
        reportingTimezone: "America/Los_Angeles",
        commissionRate: "2.5",
        platformFee: "495",
        listingExpiryDays: "90",
        maxPhotosPerListing: "24",
        autoApproveThreshold: "85",
        escrowHoldDays: "10",
    };

    it("accepts the values the platform ships with", () => {
        expect(errorCount(configErrors(VALID))).toBe(0);
    });

    it("refuses values that would break fees, payments or listings", () => {
        const errors = configErrors({
            ...VALID,
            commissionRate: "abc",
            baseCurrency: "usd",
            listingExpiryDays: "1.5",
        });

        expect(errors).toMatchObject({
            commissionRate: "Enter a rate from 0 to 100",
            baseCurrency: "Use a three-letter code, like USD",
            listingExpiryDays: "Enter whole days from 1 to 365",
        });
        expect(fixLine(errorCount(errors))).toBe("Fix 3 fields before saving");
    });
});
