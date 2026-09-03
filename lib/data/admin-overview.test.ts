import { describe, expect, it } from "vitest";
import {
    integrationSummary,
    toIntegrationRows,
} from "@/lib/data/admin-overview";
import type {
    IntegrationStatus,
    ServiceHealth,
} from "@/lib/validations/service-health";

const anIntegration = (
    overrides: Partial<IntegrationStatus> & Pick<IntegrationStatus, "id">,
): IntegrationStatus => ({
    label: "Stripe",
    capability: "Card payments and refunds",
    configured: true,
    required: true,
    ...overrides,
});

const aHealth = (integrations: IntegrationStatus[]): ServiceHealth => ({
    windowHours: 24,
    since: "2026-08-01T00:00:00.000Z",
    averageUptime: 100,
    services: [],
    integrations,
});

describe("toIntegrationRows", () => {
    it("puts a missing required credential ahead of everything else", () => {
        const rows = toIntegrationRows(
            aHealth([
                anIntegration({ id: "cloudinary" }),
                anIntegration({
                    id: "twilio",
                    configured: false,
                    required: false,
                }),
                anIntegration({ id: "stripe", configured: false }),
            ]),
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
        const health = aHealth([
            anIntegration({ id: "cloudinary" }),
            anIntegration({ id: "stripe", configured: false }),
        ]);

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
                aHealth([
                    anIntegration({ id: "stripe", configured: false }),
                    anIntegration({
                        id: "twilio",
                        configured: false,
                        required: false,
                    }),
                ]),
            ),
        ).toBe("1 required credential missing");
    });

    it("says every required credential is in place when none are missing", () => {
        expect(
            integrationSummary(aHealth([anIntegration({ id: "stripe" })])),
        ).toBe("Every required credential is in place");
    });

    it("reports the readout as unavailable when the API sent no integrations", () => {
        expect(integrationSummary(undefined)).toBe(
            "Credential state unavailable",
        );
    });
});
