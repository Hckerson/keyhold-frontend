import { z } from "zod";
import {
    USER_ACCOUNT_STATUSES,
    USER_ROLES,
    USER_TIERS,
} from "@/lib/enums/enums";

export const userSummarySchema = z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.email().optional(),
    phoneNumber: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
});

export const userSchema = userSummarySchema.extend({
    role: z.enum(USER_ROLES),
    status: z.enum(USER_ACCOUNT_STATUSES),
    tier: z.enum(USER_TIERS).optional(),
    bio: z.string().nullable().optional(),
    jobTitle: z.string().nullable().optional(),
    agencyName: z.string().nullable().optional(),
    licenseNumber: z.string().nullable().optional(),
    emailVerified: z.boolean().optional(),
    phoneVerified: z.boolean().optional(),
    kycVerified: z.boolean().optional(),
    transactions: z.number().int().optional(),
    volume: z.number().optional(),
    lastActive: z.iso.datetime().nullable().optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().optional(),
});

export const updateUserSchema = z.object({
    fullName: z.string().min(3).optional(),
    email: z.email().optional(),
    phoneNumber: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    jobTitle: z.string().optional(),
    agencyName: z.string().optional(),
    licenseNumber: z.string().optional(),
    status: z.enum(USER_ACCOUNT_STATUSES).optional(),
});

export const tierDistributionSchema = z.object({
    total: z.number().int(),
    segments: z.array(
        z.object({
            tier: z.enum(USER_TIERS),
            count: z.number().int(),
        }),
    ),
});

export type UserSummary = z.infer<typeof userSummarySchema>;
export type TierDistribution = z.infer<typeof tierDistributionSchema>;
export type User = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
