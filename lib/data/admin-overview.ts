import {
    ArrowLeftRight,
    ClipboardCheck,
    Home,
    Users,
    Wallet,
} from "lucide-react";
import type { ColumnSeries } from "@/components/ui/charts/column-chart";
import type { StatDatum } from "@/components/patterns/stat-cell";
import { DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import type { ModerationQueueLoad, Trend } from "@/lib/types";
import type { DisputeCounts } from "@/lib/validations/dispute";
import type { FlagCounts } from "@/lib/validations/flag";
import type { KycCounts } from "@/lib/validations/kyc";
import type {
    IntegrationStatus,
    ServiceHealth as ServiceHealthReadout,
} from "@/lib/validations/service-health";
import type { ServiceHealth } from "@/lib/types";
import type {
    PlatformStats,
    TrendStats,
    UserStats,
} from "@/lib/validations/stats";
import { minutesSince } from "@/lib/utils/elapsed";
import { formatCount, formatMillions } from "@/lib/utils";

const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const monthLabel = (key: string) => MONTH_LABELS[Number(key.slice(5, 7)) - 1];

const ageOf = (iso: string | null) => (iso ? minutesSince(iso) : 0);

export const moderationLoad = (
    flags: FlagCounts | undefined,
    kyc: KycCounts | undefined,
    disputes: DisputeCounts | undefined,
): ModerationQueueLoad[] => [
    {
        id: "verifications",
        backlog: kyc?.pending ?? 0,
        oldestMinutes: ageOf(kyc?.oldestPendingAt ?? null),
    },
    {
        id: "listings",
        backlog: flags?.byType.properties ?? 0,
        oldestMinutes: ageOf(flags?.oldestActiveAt ?? null),
    },
    {
        id: "flags",
        backlog: (flags?.byType.users ?? 0) + (flags?.byType.messages ?? 0),
        oldestMinutes: ageOf(flags?.oldestActiveAt ?? null),
    },
    {
        id: "disputes",
        backlog: disputes?.byStatus.OPEN ?? 0,
        oldestMinutes: ageOf(disputes?.oldestOpenAt ?? null),
    },
];

export const openBacklog = (queues: ModerationQueueLoad[]) =>
    queues.reduce((total, queue) => total + queue.backlog, 0);

export const decisionQueues = (queues: ModerationQueueLoad[]) =>
    [...queues].sort(
        (a, b) =>
            Number(b.backlog > 0) - Number(a.backlog > 0) ||
            b.oldestMinutes - a.oldestMinutes,
    );

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

    if (rows.length === 0) return "Credential state unavailable";
    if (missing.length === 0) return "Every required credential is in place";
    return `${missing.length} required credential${missing.length === 1 ? "" : "s"} missing`;
};

export const serviceSummary = (health: ServiceHealthReadout | undefined) => {
    const rows = health?.services ?? [];
    const measured = rows.filter((service) => service.samples > 0);
    const degraded = measured.filter(
        (service) => service.state !== "operational",
    ).length;

    if (measured.length === 0) return "No traffic recorded yet";
    return `Uptime ${(health?.averageUptime ?? 0).toFixed(2)}% · ${degraded} degraded (${health?.windowHours ?? 0}h)`;
};

export const platformStatBand = (
    platform: PlatformStats | undefined,
    users: UserStats | undefined,
): StatDatum[] => [
    {
        id: "members",
        icon: Users,
        label: "Members",
        value: formatCount(platform?.users ?? 0),
        tone: "neutral",
        href: "/admin/users",
    },
    {
        id: "listings",
        icon: Home,
        label: "Live listings",
        value: formatCount(platform?.activeProperties ?? 0),
        tone: "neutral",
        href: "/admin/listings",
    },
    {
        id: "deals",
        icon: ArrowLeftRight,
        label: "Deals closed",
        value: formatCount(platform?.completedTransactions ?? 0),
        tone: "neutral",
        href: "/admin/transactions",
    },
    {
        id: "gmv",
        icon: Wallet,
        label: "Settled volume",
        value: formatMillions(platform?.volume ?? 0, 0),
        tone: "neutral",
        href: "/admin/reports",
    },
    {
        id: "pending",
        icon: ClipboardCheck,
        label: "Pending accounts",
        value: formatCount(users?.pending ?? 0),
        tone: users?.pending ? "warning" : "neutral",
        href: "/admin/users",
    },
];

export const GMV_SERIES: ColumnSeries[] = [
    { key: "gmv", name: "Gross merchandise value", tone: "accent" },
];

export const gmvMonths = (
    trend: TrendStats | undefined,
): Record<string, string | number>[] =>
    (trend?.gmv ?? []).map((point) => ({
        month: monthLabel(point.name),
        gmv: point.value,
    }));

export interface GmvReading {
    value: number;
    month: string;
    delta: { label: string; direction: Trend } | null;
    commissionEstimate: string;
    commissionRate: string;
}

export const gmvReading = (
    trend: TrendStats | undefined,
    rate = DEFAULT_COMMISSION_RATE,
): GmvReading | null => {
    const points = trend?.gmv ?? [];
    const latest = points[points.length - 1];
    if (!latest) return null;

    const previous = points[points.length - 2]?.value ?? 0;
    const change =
        previous > 0
            ? Math.round(((latest.value - previous) / previous) * 100)
            : null;

    return {
        value: latest.value,
        month: monthLabel(latest.name),
        delta:
            change === null
                ? null
                : {
                      label: `${change > 0 ? "+" : ""}${change}%`,
                      direction: change < 0 ? "down" : "up",
                  },
        commissionEstimate: formatMillions(latest.value * rate, 1),
        commissionRate: `${(rate * 100).toFixed(1)}%`,
    };
};
