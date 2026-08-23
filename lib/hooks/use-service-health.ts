"use client";

import { useQuery } from "@tanstack/react-query";
import { serviceHealthAPI } from "@/lib/api/service-health";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";

export function useServiceHealth(windowHours: number, enabled = true) {
    return useQuery({
        queryKey: queryKeys.serviceHealth.window(windowHours),
        queryFn: () => serviceHealthAPI.list(windowHours),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}
