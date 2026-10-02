import type { ModerationQueueLoad } from "@/lib/types";
import type { AuditLog, AuditLogPage } from "@/lib/validations/audit-log";
import type { DisputeCounts } from "@/lib/validations/dispute";
import type { FlagCounts } from "@/lib/validations/flag";
import type { KycCounts } from "@/lib/validations/kyc";
import type {
    IntegrationStatus,
    ServiceComponentHealth,
    ServiceHealth,
} from "@/lib/validations/service-health";
import type {
    PlatformStats,
    TrendStats,
    UserStats,
} from "@/lib/validations/stats";

const AT = "2026-08-01T09:00:00.000Z";

export const aPlatform = (
    overrides: Partial<PlatformStats> = {},
): PlatformStats => ({
    users: 0,
    properties: 0,
    activeProperties: 0,
    connections: 0,
    transactions: 0,
    completedTransactions: 0,
    volume: 0,
    ...overrides,
});

export const aUserCount = (overrides: Partial<UserStats> = {}): UserStats => ({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0,
    ...overrides,
});

export const aQueueLoad = (
    overrides: Partial<ModerationQueueLoad> & Pick<ModerationQueueLoad, "id">,
): ModerationQueueLoad => ({
    backlog: 0,
    oldestMinutes: 0,
    ...overrides,
});

export const anIntegration = (
    overrides: Partial<IntegrationStatus> & Pick<IntegrationStatus, "id">,
): IntegrationStatus => ({
    label: "Stripe",
    capability: "Card payments and refunds",
    configured: true,
    required: true,
    ...overrides,
});

export const aServiceComponent = (
    overrides: Partial<ServiceComponentHealth> = {},
): ServiceComponentHealth => ({
    id: "API",
    label: "API",
    state: "operational",
    uptime: 100,
    errorRate: 0,
    latencyMs: 80,
    latencyP95: 120,
    latencyP99: 200,
    samples: 10,
    ...overrides,
});

export const aHealthReadout = (
    overrides: Partial<ServiceHealth> = {},
): ServiceHealth => ({
    windowHours: 24,
    since: AT,
    averageUptime: 100,
    services: [],
    integrations: [],
    ...overrides,
});

export const anAuditLog = (overrides: Partial<AuditLog> = {}): AuditLog => ({
    id: "aud_1",
    action: "LOGIN",
    entityType: "AUTH",
    entityId: "usr_1",
    changes: null,
    ipAddress: null,
    userAgent: null,
    actorId: "usr_1",
    actor: {
        id: "usr_1",
        fullName: "Ada Vance",
        email: "ada@keyhol.me",
        role: "ADMIN",
    },
    createdAt: AT,
    ...overrides,
});

export const aTrend = (overrides: Partial<TrendStats> = {}): TrendStats => ({
    gmv: [],
    deals: [],
    users: [],
    listings: [],
    ...overrides,
});

export const aFlagCount = (
    overrides: Partial<FlagCounts> = {},
): FlagCounts => ({
    active: 0,
    resolved: 0,
    dismissed: 0,
    byType: { users: 0, properties: 0, messages: 0 },
    oldestActiveAt: null,
    ...overrides,
});

export const aKycCount = (overrides: Partial<KycCounts> = {}): KycCounts => ({
    pending: 0,
    verified: 0,
    rejected: 0,
    total: 0,
    oldestPendingAt: null,
    ...overrides,
});

export const aDisputeCount = (
    overrides: Partial<DisputeCounts> = {},
): DisputeCounts => ({
    byStatus: { OPEN: 0, PENDING_REVIEW: 0, RESOLVED: 0, DISMISSED: 0 },
    oldestOpenAt: null,
    ...overrides,
});

export const anAuditPage = (items: AuditLog[] = []): AuditLogPage => ({
    items,
    total: items.length,
    page: 1,
    limit: items.length,
    pageCount: 1,
});
