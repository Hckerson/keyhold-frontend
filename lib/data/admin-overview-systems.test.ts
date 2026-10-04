import { describe, expect, it } from "vitest";
import {
    aHealthReadout,
    anIntegration,
    aServiceComponent,
} from "@/lib/data/__fixtures__/admin";
import {
    integrationSummary,
    systemsReading,
    toIntegrationRows,
} from "@/lib/data/admin-overview-systems";

describe("toIntegrationRows", () => {
    it("puts a missing required credential ahead of everything else", () => {
        const rows = toIntegrationRows(
            aHealthReadout({
                integrations: [
                    anIntegration({ id: "cloudinary" }),
                    anIntegration({
                        id: "twilio",
                        configured: false,
                        required: false,
                    }),
                    anIntegration({ id: "stripe", configured: false }),
                ],
            }),
        );

        expect(rows.map((row) => row.id)).toEqual([
            "stripe",
            "twilio",
            "cloudinary",
        ]);
    });

    it("returns an empty list when the health readout is unavailable", () => {
        expect(toIntegrationRows(undefined)).toEqual([]);
    });

    it("leaves the readout it was given untouched", () => {
        const health = aHealthReadout({
            integrations: [
                anIntegration({ id: "cloudinary" }),
                anIntegration({ id: "stripe", configured: false }),
            ],
        });

        toIntegrationRows(health);

        expect(health.integrations.map((row) => row.id)).toEqual([
            "cloudinary",
            "stripe",
        ]);
    });
});

describe("integrationSummary", () => {
    it("counts only the required credentials that are missing", () => {
        expect(
            integrationSummary(
                aHealthReadout({
                    integrations: [
                        anIntegration({ id: "stripe", configured: false }),
                        anIntegration({
                            id: "twilio",
                            configured: false,
                            required: false,
                        }),
                    ],
                }),
            ),
        ).toBe("1 required credential missing");
    });

    it("says every required credential is in place when none are missing", () => {
        expect(
            integrationSummary(
                aHealthReadout({
                    integrations: [anIntegration({ id: "stripe" })],
                }),
            ),
        ).toBe("Every required credential is in place");
    });

    it("reports the readout as unavailable when the API sent no integrations", () => {
        expect(integrationSummary(undefined)).toBe(
            "Credential state unavailable",
        );
    });
});

describe("systemsReading", () => {
    it("shows no uptime figure until a service has seen traffic", () => {
        const reading = systemsReading(
            aHealthReadout({
                services: [aServiceComponent({ samples: 0 })],
            }),
        );

        expect(reading).toBeNull();
    });

    it("flags uptime that falls under the SLO", () => {
        const reading = systemsReading(
            aHealthReadout({
                averageUptime: 99.5,
                services: [aServiceComponent()],
            }),
        );

        expect(reading?.figure).toBe("99.50%");
        expect(reading?.belowSlo).toBe(true);
    });

    it("counts degradation only among services that saw traffic", () => {
        const reading = systemsReading(
            aHealthReadout({
                services: [
                    aServiceComponent({ id: "API" }),
                    aServiceComponent({ id: "SEARCH", state: "degraded" }),
                    aServiceComponent({
                        id: "STORAGE",
                        state: "degraded",
                        samples: 0,
                    }),
                ],
            }),
        );

        expect(reading?.reading).toContain("1 of 2 services degraded");
    });
});
