import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    Notification,
    NotificationPage,
    NotificationPreference,
    NotificationQuery,
    UnreadCount,
    UpdatePreferencesInput,
} from "@/lib/validations/notification";

export const notificationsAPI = {
    list: (input: NotificationQuery = {}) =>
        query.get<NotificationPage>(config.api.notifications.list, {
            params: input,
        }),

    unreadCount: () =>
        query.get<UnreadCount>(config.api.notifications.unreadCount),

    preferences: () =>
        query.get<NotificationPreference[]>(
            config.api.notifications.preferences,
        ),

    updatePreferences: (input: UpdatePreferencesInput) =>
        query.put<NotificationPreference[]>(
            config.api.notifications.preferences,
            input,
        ),

    markRead: (id: string) =>
        query.patch<Notification>(config.api.notifications.read(id)),

    markAllRead: () =>
        query.patch<{ updated: number }>(config.api.notifications.readAll),

    remove: (id: string) =>
        query.delete<{ removed: boolean }>(config.api.notifications.entry(id)),
};
