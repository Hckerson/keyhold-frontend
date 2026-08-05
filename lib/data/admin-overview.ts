import {
    ArrowLeftRight,
    ClipboardCheck,
    Home,
    Users,
    Wallet,
} from "lucide-react";
import type { ColumnSeries } from "@/components/ui/charts/column-chart";
import type { StatDatum } from "@/components/patterns/stat-cell";
import {
    QUEUE_SEED_BACKLOG,
    SIGNAL_SEVERITIES,
} from "@/lib/config/admin-tones";
import type {
    MetricItem,
    ModerationQueueLoad,
    PlatformSignal,
    ServiceHealth,
} from "@/lib/types";
import {
    AVG_COMMISSION_PER_DEAL,
    CLOSED_DEALS_30D,
    COMMISSIONS_30D,
    COMMISSIONS_YTD,
    GMV_30D,
    GMV_YTD,
    TAKE_RATE_LABEL,
} from "@/lib/data/admin-platform";
import { ACTIVE_LISTINGS } from "@/lib/data/admin-reports";
import { TOTAL_USERS } from "@/lib/data/admin-users";
import {
    formatCount,
    formatMillions,
    formatThousands,
    formatUsd,
} from "@/lib/utils";

export const MODERATION_LOAD: ModerationQueueLoad[] = [
    {
        id: "verifications",
        backlog: QUEUE_SEED_BACKLOG.verifications,
        capacity: 12,
        oldestMinutes: 190,
    },
    {
        id: "listings",
        backlog: QUEUE_SEED_BACKLOG.listings,
        capacity: 16,
        oldestMinutes: 640,
    },
    {
        id: "flags",
        backlog: QUEUE_SEED_BACKLOG.flags,
        capacity: 6,
        oldestMinutes: 95,
    },
    {
        id: "disputes",
        backlog: QUEUE_SEED_BACKLOG.disputes,
        capacity: 4,
        oldestMinutes: 2_760,
    },
];

export const OPEN_BACKLOG = MODERATION_LOAD.reduce(
    (total, queue) => total + queue.backlog,
    0,
);

export const queueShare = (queue: ModerationQueueLoad) =>
    Math.round((queue.backlog / queue.capacity) * 100);

export const PLATFORM_STATS: StatDatum[] = [
    {
        id: "members",
        icon: Users,
        label: "Members",
        value: formatCount(TOTAL_USERS),
        tone: "accent",
        href: "/admin/users",
    },
    {
        id: "listings",
        icon: Home,
        label: "Live listings",
        value: formatCount(ACTIVE_LISTINGS),
        tone: "info",
        href: "/admin/listings",
    },
    {
        id: "deals",
        icon: ArrowLeftRight,
        label: "Deals 30d",
        value: formatCount(CLOSED_DEALS_30D),
        tone: "highlight",
        href: "/admin/transactions",
    },
    {
        id: "gmv",
        icon: Wallet,
        label: "GMV 30d",
        value: formatMillions(GMV_30D, 0),
        tone: "success",
        href: "/admin/reports",
    },
    {
        id: "backlog",
        icon: ClipboardCheck,
        label: "Open queue",
        value: formatCount(OPEN_BACKLOG),
        tone: "warning",
        href: "/admin/verifications",
    },
];

export const GMV_MONTHS: Record<string, string | number>[] = [
    { month: "Feb", gmv: 231_000_000 },
    { month: "Mar", gmv: 248_000_000 },
    { month: "Apr", gmv: 267_000_000 },
    { month: "May", gmv: 289_000_000 },
    { month: "Jun", gmv: 304_000_000 },
    { month: "Jul", gmv: GMV_30D },
];

export const GMV_SERIES: ColumnSeries[] = [
    { key: "gmv", name: "Gross merchandise value", tone: "accent" },
];

export const GMV_GROWTH_LABEL = "+22% vs prior month";

export const REVENUE_METRICS: MetricItem[] = [
    { label: "Commissions 30d", value: formatMillions(COMMISSIONS_30D, 1) },
    { label: "GMV year to date", value: formatMillions(GMV_YTD, 0) },
    { label: "Take rate", value: TAKE_RATE_LABEL },
    {
        label: "Avg per deal",
        value: formatThousands(AVG_COMMISSION_PER_DEAL, 1),
    },
];

export const COMMISSIONS_YTD_LABEL = formatMillions(COMMISSIONS_YTD, 1);

export const PLATFORM_SIGNALS: PlatformSignal[] = [
    {
        id: "sig-escrow-8m",
        severity: "critical",
        domain: "transaction",
        title: "Escrow confirmation overdue",
        subject: "Ravenswood Estate",
        exposure: 8_500_000,
        ageMinutes: 245,
        href: "/admin/transactions",
    },
    {
        id: "sig-explicit-image",
        severity: "critical",
        domain: "moderation",
        title: "Explicit image reported",
        subject: "Listing #4521",
        ageMinutes: 118,
        href: "/admin/listings",
    },
    {
        id: "sig-payout-retry",
        severity: "elevated",
        domain: "payout",
        title: "Payout retried twice",
        subject: "Marcus Webb",
        exposure: 184_000,
        ageMinutes: 52,
        href: "/admin/payments",
    },
    {
        id: "sig-platinum-tier",
        severity: "elevated",
        domain: "verification",
        title: "Platinum tier requested",
        subject: "Robert Chen",
        ageMinutes: 64,
        href: "/admin/verifications",
    },
    {
        id: "sig-storage-latency",
        severity: "elevated",
        domain: "infrastructure",
        title: "File storage latency spike",
        subject: "eu-west-1",
        ageMinutes: 26,
        href: "/admin/settings",
    },
    {
        id: "sig-licence-expiry",
        severity: "routine",
        domain: "verification",
        title: "Licence expires in 14 days",
        subject: "Elena Vasquez",
        ageMinutes: 1_560,
        href: "/admin/verifications",
    },
];

const CRITICAL_SIGNALS = PLATFORM_SIGNALS.filter(
    (signal) => SIGNAL_SEVERITIES[signal.severity].rank > 1,
).length;

const SIGNAL_EXPOSURE = PLATFORM_SIGNALS.reduce(
    (total, signal) => total + (signal.exposure ?? 0),
    0,
);

export const SIGNAL_EXPOSURE_LABEL = formatUsd(SIGNAL_EXPOSURE);

export const SERVICES: ServiceHealth[] = [
    {
        id: "database",
        label: "Database",
        state: "operational",
        uptime: 99.99,
        errorRate: 0.01,
        latencyMs: 38,
    },
    {
        id: "api",
        label: "API gateway",
        state: "operational",
        uptime: 99.96,
        errorRate: 0.04,
        latencyMs: 112,
    },
    {
        id: "search",
        label: "Search index",
        state: "operational",
        uptime: 99.94,
        errorRate: 0.06,
        latencyMs: 187,
    },
    {
        id: "storage",
        label: "File storage",
        state: "degraded",
        uptime: 99.82,
        errorRate: 0.21,
        latencyMs: 640,
    },
    {
        id: "payments",
        label: "Payments webhook",
        state: "operational",
        uptime: 99.91,
        errorRate: 0.09,
        latencyMs: 296,
    },
];

const averageUptime =
    SERVICES.reduce((total, service) => total + service.uptime, 0) /
    SERVICES.length;

export const SERVICE_SUMMARY = `Uptime ${averageUptime.toFixed(2)}% · ${
    SERVICES.filter((service) => service.state !== "operational").length
} degraded (24h)`;

export const OVERVIEW_SUMMARY = `${CRITICAL_SIGNALS} critical · ${OPEN_BACKLOG} queued · ${SIGNAL_EXPOSURE_LABEL} exposed`;
