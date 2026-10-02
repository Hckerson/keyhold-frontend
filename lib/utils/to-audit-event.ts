import {
    AUDIT_ACTIONS,
    AUDIT_SUBJECTS,
    SECURITY_ACTIONS,
} from "@/lib/config/audit-actions";
import type { AuditEvent } from "@/lib/types/admin";
import type { AuditLog } from "@/lib/validations/audit-log";
import { minutesSince } from "@/lib/utils/elapsed";
import { initialsOf } from "@/lib/utils/format";

const UNKNOWN_ACTOR = "System";

export const toAuditEvent = (log: AuditLog): AuditEvent => {
    const actor = log.actor?.fullName ?? UNKNOWN_ACTOR;
    const { label, tone } = AUDIT_ACTIONS[log.action];

    return {
        id: log.id,
        action: label,
        tone,
        security: SECURITY_ACTIONS.includes(log.action),
        actor,
        initials: initialsOf(actor),
        subject: AUDIT_SUBJECTS[log.entityType.toUpperCase()] ?? log.entityType,
        ageMinutes: minutesSince(log.createdAt),
    };
};

export const toAuditEvents = (logs: AuditLog[]): AuditEvent[] =>
    logs.map(toAuditEvent);
