import { z } from "zod";
import { SETTING_CATEGORIES, USER_ROLES } from "@/lib/enums/enums";

export const settingEditorSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    role: z.enum(USER_ROLES),
});

export const platformSettingSchema = z.object({
    key: z.string(),
    value: z.string(),
    category: z.enum(SETTING_CATEGORIES),
    updatedBy: settingEditorSchema.nullable(),
    updatedAt: z.iso.datetime().nullable(),
});

export const updateSettingsSchema = z.object({
    settings: z.array(
        z.object({
            key: z.string().min(1),
            value: z.string(),
            category: z.enum(SETTING_CATEGORIES),
        }),
    ),
});

const PERCENT_MAX = 100;
const EXPIRY_MAX_DAYS = 365;
const PHOTOS_MAX = 100;
const ESCROW_MAX_DAYS = 90;
const CURRENCY_CODE = /^[A-Z]{3}$/;
const WHOLE = /^\d+$/;

const amountFrom = (min: number, max: number, message: string) =>
    z
        .string()
        .trim()
        .refine((value) => {
            const amount = Number(value);
            return value !== "" && amount >= min && amount <= max;
        }, message);

const wholeFrom = (min: number, max: number, message: string) =>
    z
        .string()
        .trim()
        .refine(
            (value) =>
                WHOLE.test(value) &&
                Number(value) >= min &&
                Number(value) <= max,
            message,
        );

export const adminConfigSchema = z.object({
    platformName: z.string().trim().min(1, "Give the platform a name"),
    supportEmail: z.email("Enter a valid email address"),
    baseCurrency: z
        .string()
        .regex(CURRENCY_CODE, "Use a three-letter code, like USD"),
    reportingTimezone: z.string().min(1, "Pick a timezone"),
    commissionRate: amountFrom(
        0,
        PERCENT_MAX,
        `Enter a rate from 0 to ${PERCENT_MAX}`,
    ),
    platformFee: amountFrom(
        0,
        Number.MAX_SAFE_INTEGER,
        "Enter a fee of 0 or more",
    ),
    listingExpiryDays: wholeFrom(
        1,
        EXPIRY_MAX_DAYS,
        `Enter whole days from 1 to ${EXPIRY_MAX_DAYS}`,
    ),
    maxPhotosPerListing: wholeFrom(
        1,
        PHOTOS_MAX,
        `Enter a whole number from 1 to ${PHOTOS_MAX}`,
    ),
    autoApproveThreshold: amountFrom(
        0,
        Number.MAX_SAFE_INTEGER,
        "Enter an amount of 0 or more",
    ),
    escrowHoldDays: wholeFrom(
        0,
        ESCROW_MAX_DAYS,
        `Enter whole days from 0 to ${ESCROW_MAX_DAYS}`,
    ),
});

export const purgeResultSchema = z.object({
    purged: z.number().int().nonnegative(),
});

export type SettingEditor = z.infer<typeof settingEditorSchema>;
export type PurgeResult = z.infer<typeof purgeResultSchema>;
export type PlatformSetting = z.infer<typeof platformSettingSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
