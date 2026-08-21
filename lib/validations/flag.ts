import { z } from "zod";
import {
    FLAG_STATUSES,
    FLAG_TYPES,
    PROPERTY_STATUSES,
    USER_ACCOUNT_STATUSES,
} from "@/lib/enums/enums";
import { pageOf, pageQuerySchema } from "@/lib/validations/pagination";
import { userSummarySchema } from "@/lib/validations/user";

export const flagPropertyTargetSchema = z.object({
    kind: z.literal("PROPERTY"),
    id: z.string(),
    title: z.string(),
    address: z.string(),
    locality: z.string(),
    price: z.number(),
    status: z.enum(PROPERTY_STATUSES),
    image: z.string().nullable(),
    sellerId: z.string(),
    sellerName: z.string(),
    sellerEmail: z.string(),
    sellerPhone: z.string().nullable(),
});

export const flagUserTargetSchema = z.object({
    kind: z.literal("USER"),
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    avatar: z.string().nullable(),
    status: z.enum(USER_ACCOUNT_STATUSES),
});

export const flagMessageTargetSchema = z.object({
    kind: z.literal("MESSAGE"),
    id: z.string(),
    content: z.string(),
    senderId: z.string(),
    connectionId: z.string(),
});

export const flagTargetSchema = z.discriminatedUnion("kind", [
    flagPropertyTargetSchema,
    flagUserTargetSchema,
    flagMessageTargetSchema,
]);

export const flagSchema = z.object({
    id: z.string(),
    type: z.enum(FLAG_TYPES),
    reason: z.string(),
    details: z.string().nullable(),
    status: z.enum(FLAG_STATUSES),
    targetId: z.string(),
    creatorId: z.string(),
    creator: userSummarySchema.optional(),
    target: flagTargetSchema.nullish(),
    resolvedAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const flagPageSchema = pageOf(flagSchema);

export const flagCountsSchema = z.object({
    active: z.number().int(),
    resolved: z.number().int(),
    dismissed: z.number().int(),
    byType: z.object({
        users: z.number().int(),
        properties: z.number().int(),
        messages: z.number().int(),
    }),
    oldestActiveAt: z.iso.datetime().nullable(),
});

export const createFlagSchema = z.object({
    type: z.enum(FLAG_TYPES),
    targetId: z.string().min(1),
    reason: z.string().min(4, "Give a reason of at least four characters"),
    details: z.string().optional(),
});

export const resolveFlagSchema = z.object({
    note: z.string().optional(),
});

export const flagQuerySchema = pageQuerySchema.extend({
    status: z.enum(FLAG_STATUSES).optional(),
    type: z.enum(FLAG_TYPES).optional(),
});

export type FlagPropertyTarget = z.infer<typeof flagPropertyTargetSchema>;
export type FlagUserTarget = z.infer<typeof flagUserTargetSchema>;
export type FlagMessageTarget = z.infer<typeof flagMessageTargetSchema>;
export type FlagTarget = z.infer<typeof flagTargetSchema>;
export type Flag = z.infer<typeof flagSchema>;
export type FlagPage = z.infer<typeof flagPageSchema>;
export type FlagCounts = z.infer<typeof flagCountsSchema>;
export type CreateFlagInput = z.infer<typeof createFlagSchema>;
export type ResolveFlagInput = z.infer<typeof resolveFlagSchema>;
export type FlagQuery = z.infer<typeof flagQuerySchema>;
