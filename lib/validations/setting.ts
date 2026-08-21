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

export type SettingEditor = z.infer<typeof settingEditorSchema>;
export type PlatformSetting = z.infer<typeof platformSettingSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
