import { z } from "zod";
import { USER_ACCOUNT_STATUSES, USER_ROLES } from "@/lib/enums/enums";
import { pageOf, pageQuerySchema } from "@/lib/validations/pagination";

export const suspendedAccountSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    avatar: z.string().nullable(),
    role: z.enum(USER_ROLES),
    status: z.enum(USER_ACCOUNT_STATUSES),
});

export const suspensionSchema = z.object({
    id: z.string(),
    reason: z.string(),
    duration: z.number().int().nullable(),
    notes: z.string().nullable(),
    userId: z.string(),
    user: suspendedAccountSchema.optional(),
    liftedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const suspensionPageSchema = pageOf(suspensionSchema);

export const createSuspensionSchema = z.object({
    userId: z.string().min(1),
    reason: z.string().min(4, "Give a reason of at least four characters"),
    duration: z.number().int().positive().optional(),
    notes: z.string().optional(),
});

export const suspensionQuerySchema = pageQuerySchema.extend({
    userId: z.string().optional(),
    active: z.boolean().optional(),
});

export type SuspendedAccount = z.infer<typeof suspendedAccountSchema>;
export type Suspension = z.infer<typeof suspensionSchema>;
export type SuspensionPage = z.infer<typeof suspensionPageSchema>;
export type CreateSuspensionInput = z.infer<typeof createSuspensionSchema>;
export type SuspensionQuery = z.infer<typeof suspensionQuerySchema>;
