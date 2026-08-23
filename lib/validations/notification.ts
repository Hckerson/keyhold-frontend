import { z } from "zod";
import { NOTIFICATION_CHANNELS, NOTIFICATION_TYPES } from "@/lib/enums/enums";
import { pageOf, pageQuerySchema } from "@/lib/validations/pagination";

export const notificationPropertySchema = z.object({
    id: z.string(),
    title: z.string(),
    address: z.string(),
    locality: z.string(),
    price: z.number(),
    image: z.string().nullable(),
});

export const notificationSchema = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean(),
    type: z.enum(NOTIFICATION_TYPES),
    channel: z.enum(NOTIFICATION_CHANNELS),
    entityType: z.string().nullable(),
    entityId: z.string().nullable(),
    userId: z.string(),
    property: notificationPropertySchema.nullable().optional(),
    readAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export const notificationPageSchema = pageOf(notificationSchema);

export const unreadCountSchema = z.object({
    count: z.number().int(),
});

export const notificationPreferenceSchema = z.object({
    type: z.enum(NOTIFICATION_TYPES),
    enabled: z.boolean(),
    email: z.boolean(),
    sms: z.boolean(),
    inApp: z.boolean(),
});

export const updatePreferencesSchema = z.object({
    preferences: z.array(notificationPreferenceSchema),
});

export const notificationQuerySchema = pageQuerySchema.extend({
    type: z.enum(NOTIFICATION_TYPES).optional(),
    isRead: z.boolean().optional(),
});

export type NotificationProperty = z.infer<typeof notificationPropertySchema>;
export type Notification = z.infer<typeof notificationSchema>;
export type NotificationPage = z.infer<typeof notificationPageSchema>;
export type UnreadCount = z.infer<typeof unreadCountSchema>;
export type NotificationPreference = z.infer<
    typeof notificationPreferenceSchema
>;
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
export type NotificationQuery = z.infer<typeof notificationQuerySchema>;
