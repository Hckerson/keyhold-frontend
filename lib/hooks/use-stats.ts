"use client";

import { useQuery } from "@tanstack/react-query";
import { statsAPI } from "@/lib/api/stats";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";

export function useSellerStats(enabled = true) {
    return useQuery({
        queryKey: queryKeys.stats.seller,
        queryFn: () => statsAPI.seller(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function usePlatformStats(enabled = true) {
    return useQuery({
        queryKey: queryKeys.stats.platform,
        queryFn: () => statsAPI.platform(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUserStats(enabled = true) {
    return useQuery({
        queryKey: queryKeys.stats.users,
        queryFn: () => statsAPI.users(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}
