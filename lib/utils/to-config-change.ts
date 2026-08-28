import type { ConfigChange } from "@/lib/types/admin";
import type { AuditLog } from "@/lib/validations/audit-log";
import { minutesSince } from "@/lib/utils/elapsed";

const UNKNOWN_ACTOR = "System";
const NO_VALUE = "—";

type Scalar = string | number | boolean | null;

interface ChangeDiff {
    from?: Scalar;
    to?: Scalar;
}

const parseDiff = (changes: string | null): ChangeDiff => {
    if (!changes) return {};
    try {
        return JSON.parse(changes) as ChangeDiff;
    } catch {
        return {};
    }
};

const render = (value: Scalar | undefined) =>
    value === undefined || value === null ? NO_VALUE : String(value);

export const toConfigChange = (log: AuditLog): ConfigChange => {
    const diff = parseDiff(log.changes);

    return {
        id: log.id,
        actor: log.actor?.fullName ?? UNKNOWN_ACTOR,
        role: log.actor?.role ?? UNKNOWN_ACTOR,
        field: log.entityType,
        from: render(diff.from),
        to: render(diff.to),
        ageMinutes: minutesSince(log.createdAt),
    };
};

export const toConfigChanges = (logs: AuditLog[]): ConfigChange[] =>
    logs.map(toConfigChange);
