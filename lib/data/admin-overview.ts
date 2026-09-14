import {
    ArrowLeftRight,
    ClipboardCheck,
    Home,
    TrendingUp,
    Users,
    Wallet,
} from "lucide-react";
import type { ColumnSeries } from "@/components/ui/charts/column-chart";
import type { StatDatum } from "@/components/patterns/stat-cell";
import { MODERATION_QUEUES } from "@/lib/config/admin-tones";
import { ADMIN_ROUTES, DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import type {
    MetricItem,
    ModerationQueueLoad,
    QuickAction,
    ModerationQueueId,
    PlatformSignal,
    ServiceHealth as ServiceHealthRow,
} from "@/lib/types";
import type { DisputeCounts } from "@/lib/validations/dispute";
import type { FlagCounts } from "@/lib/validations/flag";
import type { KycCounts } from "@/lib/validations/kyc";
import type {
    IntegrationStatus,
    ServiceHealth,
} from "@/lib/validations/service-health";
import type {
    PlatformStats,
    TrendStats,
    UserStats,
} from "@/lib/validations/stats";
import { minutesSince } from "@/lib/utils/elapsed";
import {
    formatCount,
    formatMillions,
    formatThousands,
    formatUsd,
} from "@/lib/utils";

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

const CRITICAL_AGE_MINUTES = 24 * 60;
const ELEVATED_AGE_MINUTES = 4 * 60;
const REVIEWER_CAPACITY = 12;

const monthLabel = (key: string) => MONTH_LABELS[Number(key.slice(5, 7)) - 1];

const ageOf = (iso: string | null) => (iso ? minutesSince(iso) : 0);

const severityFor = (ageMinutes: number) => {
    if (ageMinutes >= CRITICAL_AGE_MINUTES) return "critical" as const;
    if (ageMinutes >= ELEVATED_AGE_MINUTES) return "elevated" as const;
    return "routine" as const;
};

export const moderationLoad = (
    flags: FlagCounts | undefined,
    kyc: KycCounts | undefined,
    disputes: DisputeCounts | undefined,
): ModerationQueueLoad[] => [
    {
        id: "verifications",
        backlog: kyc?.pending ?? 0,
        capacity: REVIEWER_CAPACITY,
        oldestMinutes: ageOf(kyc?.oldestPendingAt ?? null),
    },
    {
        id: "listings",
        backlog: flags?.byType.properties ?? 0,
        capacity: REVIEWER_CAPACITY,
        oldestMinutes: ageOf(flags?.oldestActiveAt ?? null),
    },
    {
        id: "flags",
        backlog: flags?.active ?? 0,
        capacity: REVIEWER_CAPACITY,
        oldestMinutes: ageOf(flags?.oldestActiveAt ?? null),
    },
    {
        id: "disputes",
        backlog: disputes?.byStatus.OPEN ?? 0,
        capacity: REVIEWER_CAPACITY,
        oldestMinutes: ageOf(disputes?.oldestOpenAt ?? null),
    },
];

export const openBacklog = (queues: ModerationQueueLoad[]) =>
    queues.reduce((total, queue) => total + queue.backlog, 0);

export const queueShare = (queue: ModerationQueueLoad) =>
    Math.round((queue.backlog / queue.capacity) * 100);

const SIGNAL_DOMAIN: Record<ModerationQueueId, PlatformSignal["domain"]> = {
    verifications: "verification",
    listings: "moderation",
    flags: "moderation",
    disputes: "transaction",
};

export const platformSignals = (
    queues: ModerationQueueLoad[],
): PlatformSignal[] =>
    queues
        .filter((queue) => queue.backlog > 0)
        .map((queue) => ({
            id: queue.id,
            severity: severityFor(queue.oldestMinutes),
            domain: SIGNAL_DOMAIN[queue.id],
            title: `${MODERATION_QUEUES[queue.id].label} awaiting review`,
            subject: `${queue.backlog} in queue`,
            ageMinutes: queue.oldestMinutes,
            href: MODERATION_QUEUES[queue.id].href,
        }))
        .sort((a, b) => b.ageMinutes - a.ageMinutes);

export const signalExposureLabel = (platform: PlatformStats | undefined) =>
    formatUsd(platform?.volume ?? 0);

export const toServiceRows = (
    health: ServiceHealth | undefined,
): ServiceHealthRow[] =>
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
    health: ServiceHealth | undefined,
): IntegrationStatus[] =>
    [...(health?.integrations ?? [])].sort(
        (a, b) => integrationRank(a) - integrationRank(b),
    );

export const integrationSummary = (health: ServiceHealth | undefined) => {
    const rows = health?.integrations ?? [];
    const missing = rows.filter(
        (integration) => integration.required && !integration.configured,
    );

    if (rows.length === 0) return "Credential state unavailable";
    if (missing.length === 0) return "Every required credential is in place";
    return `${missing.length} required credential${missing.length === 1 ? "" : "s"} missing`;
};

export const serviceSummary = (health: ServiceHealth | undefined) => {
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
        tone: "accent",
        href: "/admin/users",
    },
    {
        id: "listings",
        icon: Home,
        label: "Live listings",
        value: formatCount(platform?.activeProperties ?? 0),
        tone: "info",
        href: "/admin/listings",
    },
    {
        id: "deals",
        icon: ArrowLeftRight,
        label: "Deals closed",
        value: formatCount(platform?.completedTransactions ?? 0),
        tone: "highlight",
        href: "/admin/transactions",
    },
    {
        id: "gmv",
        icon: Wallet,
        label: "Settled volume",
        value: formatMillions(platform?.volume ?? 0, 0),
        tone: "success",
        href: "/admin/reports",
    },
    {
        id: "pending",
        icon: ClipboardCheck,
        label: "Pending accounts",
        value: formatCount(users?.pending ?? 0),
        tone: "warning",
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

export const gmvLatest = (trend: TrendStats | undefined) => {
    const points = trend?.gmv ?? [];
    return points[points.length - 1]?.value ?? 0;
};

export const gmvGrowthLabel = (trend: TrendStats | undefined) => {
    const points = trend?.gmv ?? [];
    const latest = points[points.length - 1]?.value ?? 0;
    const previous = points[points.length - 2]?.value ?? 0;
    if (previous <= 0) return "";
    const change = Math.round(((latest - previous) / previous) * 100);
    return `${change > 0 ? "+" : ""}${change}% vs prior month`;
};

export const commissionsFor = (volume: number, rate: number) => volume * rate;

export const revenueMetrics = (
    trend: TrendStats | undefined,
    platform: PlatformStats | undefined,
    rate = DEFAULT_COMMISSION_RATE,
): MetricItem[] => {
    const settled = platform?.volume ?? 0;
    const deals = platform?.completedTransactions ?? 0;
    const latest = gmvLatest(trend);

    return [
        {
            label: "Commissions this month",
            value: formatMillions(commissionsFor(latest, rate), 1),
        },
        { label: "Settled volume", value: formatMillions(settled, 0) },
        { label: "Take rate", value: `${(rate * 100).toFixed(2)}%` },
        {
            label: "Avg per deal",
            value: deals
                ? formatThousands(commissionsFor(settled, rate) / deals, 1)
                : formatThousands(0, 1),
        },
    ];
};

export const commissionsLabel = (
    platform: PlatformStats | undefined,
    rate = DEFAULT_COMMISSION_RATE,
) => formatMillions(commissionsFor(platform?.volume ?? 0, rate), 1);

export const overviewSummary = (
    platform: PlatformStats | undefined,
    users: UserStats | undefined,
) =>
    `${formatCount(users?.active ?? 0)} active · ${formatCount(
        platform?.connections ?? 0,
    )} connections · ${formatMillions(platform?.volume ?? 0, 0)} settled`;

export const adminQuickActions: QuickAction[] = [
    {
        id: "manage-users",
        label: "Manage users",
        href: ADMIN_ROUTES.users,
        icon: Users,
        tone: "accent",
    },
    {
        id: "review-listings",
        label: "Review listings",
        href: ADMIN_ROUTES.listings,
        icon: Home,
        tone: "warning",
    },
    {
        id: "process-verifications",
        label: "Process verifications",
        href: ADMIN_ROUTES.verifications,
        icon: ClipboardCheck,
        tone: "info",
    },
    {
        id: "view-reports",
        label: "View reports",
        href: ADMIN_ROUTES.reports,
        icon: TrendingUp,
        tone: "highlight",
    },
];
