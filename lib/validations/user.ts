import { z } from "zod";
import { USER_ACCOUNT_STATUSES, USER_ROLES } from "@/lib/enums/enums";

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
    bio: z.string().nullable().optional(),
    jobTitle: z.string().nullable().optional(),
    agencyName: z.string().nullable().optional(),
    licenseNumber: z.string().nullable().optional(),
    emailVerified: z.boolean().optional(),
    phoneVerified: z.boolean().optional(),
    kycVerified: z.boolean().optional(),
    lastActive: z.iso.datetime().nullable().optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().optional(),
});

export const updateUserSchema = z.object({
    fullName: z.string().min(3).optional(),
    phoneNumber: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    jobTitle: z.string().optional(),
    agencyName: z.string().optional(),
    licenseNumber: z.string().optional(),
});

export type UserSummary = z.infer<typeof userSummarySchema>;
export type User = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
