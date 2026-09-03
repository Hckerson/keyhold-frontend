"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { settingsAPI } from "@/lib/api/settings";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type { UpdateSettingsInput } from "@/lib/validations/setting";
import { FEEDBACK } from "@/lib/config/feedback";

export function usePlatformSettings(enabled = true) {
    return useQuery({
        queryKey: queryKeys.settings.all,
        queryFn: () => settingsAPI.list(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUpdatePlatformSettings() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.updatePlatformSettings,
        mutationFn: (input: UpdateSettingsInput) => settingsAPI.update(input),
        onSuccess: (settings) =>
            client.setQueryData(queryKeys.settings.all, settings),
    });
}
