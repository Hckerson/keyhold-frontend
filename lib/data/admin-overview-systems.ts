import { UPTIME_SLO } from "@/lib/config/admin-tones";
import type { ServiceHealth, SystemsReading } from "@/lib/types";
import type {
    IntegrationStatus,
    ServiceHealth as ServiceHealthReadout,
} from "@/lib/validations/service-health";

export const CREDENTIALS_UNAVAILABLE = "Credential state unavailable";

export const toServiceRows = (
    health: ServiceHealthReadout | undefined,
): ServiceHealth[] =>
    (health?.services ?? []).flatMap((service) =>
        service.state === "unknown"
            ? []
            : [
                  {
                      id: service.id,
                      label: service.label,
                      state: service.state,
                      uptime: service.uptime,
                      errorRate: service.errorRate,
                      latencyMs: service.latencyMs,
                      latencyP95: service.latencyP95,
                      latencyP99: service.latencyP99,
                  },
              ],
    );

const integrationRank = (integration: IntegrationStatus) => {
    if (integration.configured) return 2;
    return integration.required ? 0 : 1;
};

export const toIntegrationRows = (
    health: ServiceHealthReadout | undefined,
): IntegrationStatus[] =>
    [...(health?.integrations ?? [])].sort(
        (a, b) => integrationRank(a) - integrationRank(b),
    );

export const integrationSummary = (
    health: ServiceHealthReadout | undefined,
) => {
    const rows = health?.integrations ?? [];
    const missing = rows.filter(
        (integration) => integration.required && !integration.configured,
    );

    if (rows.length === 0) return CREDENTIALS_UNAVAILABLE;
    if (missing.length === 0) return "Every required credential is in place";
    return `${missing.length} required credential${missing.length === 1 ? "" : "s"} missing`;
};

export const systemsReading = (
    health: ServiceHealthReadout | undefined,
): SystemsReading | null => {
    const measured = (health?.services ?? []).filter(
        (service) => service.samples > 0,
    );
    const degraded = measured.filter(
        (service) => service.state !== "operational",
    ).length;

    if (!health || measured.length === 0) return null;

    return {
        figure: `${health.averageUptime.toFixed(2)}%`,
        belowSlo: health.averageUptime < UPTIME_SLO,
        reading: `Uptime over ${health.windowHours}h against a ${UPTIME_SLO}% target · ${degraded} of ${measured.length} services degraded`,
    };
};

export const systemsDeck = (health: ServiceHealthReadout | undefined) => ({
    reading: systemsReading(health),
    services: toServiceRows(health),
    integrations: toIntegrationRows(health),
    summary: integrationSummary(health),
});
