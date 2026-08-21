"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsAPI } from "@/lib/api/notifications";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import type {
    NotificationQuery,
    UpdatePreferencesInput,
} from "@/lib/validations/notification";

export function useNotifications(
    input: NotificationQuery = {},
    enabled = true,
) {
    return useQuery({
        queryKey: queryKeys.notifications.list(input),
        queryFn: () => notificationsAPI.list(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUnreadNotificationCount() {
    const accessToken = useAuthStore((state) => state.accessToken);
    return useQuery({
        queryKey: queryKeys.notifications.unreadCount,
        queryFn: () => notificationsAPI.unreadCount(),
        enabled: Boolean(accessToken),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useNotificationPreferences(enabled = true) {
    return useQuery({
        queryKey: queryKeys.notifications.preferences,
        queryFn: () => notificationsAPI.preferences(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUpdateNotificationPreferences() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (input: UpdatePreferencesInput) =>
            notificationsAPI.updatePreferences(input),
        onSuccess: (preferences) =>
            client.setQueryData(
                queryKeys.notifications.preferences,
                preferences,
            ),
    });
}

export function useMarkNotificationRead() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => notificationsAPI.markRead(id),
        onSuccess: () =>
            client.invalidateQueries({
                queryKey: queryKeys.notifications.all,
            }),
    });
}

export function useMarkAllNotificationsRead() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: () => notificationsAPI.markAllRead(),
        onSuccess: () =>
            client.invalidateQueries({
                queryKey: queryKeys.notifications.all,
            }),
    });
}

export function useRemoveNotification() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => notificationsAPI.remove(id),
        onSuccess: () =>
            client.invalidateQueries({
                queryKey: queryKeys.notifications.all,
            }),
    });
}
