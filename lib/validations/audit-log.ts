import { z } from "zod";
import { AUDIT_ACTION_TYPES, USER_ROLES } from "@/lib/enums/enums";
import { pageOf, pageQuerySchema } from "@/lib/validations/pagination";

export const auditActorSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    role: z.enum(USER_ROLES),
});

export const auditLogSchema = z.object({
    id: z.string(),
    action: z.enum(AUDIT_ACTION_TYPES),
    entityType: z.string(),
    entityId: z.string(),
    changes: z.string().nullable(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    actorId: z.string(),
    actor: auditActorSchema.optional(),
    createdAt: z.iso.datetime(),
});

export const auditLogPageSchema = pageOf(auditLogSchema);

export const auditLogQuerySchema = pageQuerySchema.extend({
    action: z.enum(AUDIT_ACTION_TYPES).optional(),
    entityType: z.string().optional(),
    entityId: z.string().optional(),
    actorId: z.string().optional(),
});

export type AuditActor = z.infer<typeof auditActorSchema>;
export type AuditLog = z.infer<typeof auditLogSchema>;
export type AuditLogPage = z.infer<typeof auditLogPageSchema>;
export type AuditLogQuery = z.infer<typeof auditLogQuerySchema>;
