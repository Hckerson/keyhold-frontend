"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { savedPropertiesAPI } from "@/lib/api/saved-properties";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";

export function useSavedProperties(enabled = true) {
    return useQuery({
        queryKey: queryKeys.savedProperties.all,
        queryFn: () => savedPropertiesAPI.list(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useSavedPropertyIds(enabled = true) {
    return useQuery({
        queryKey: queryKeys.savedProperties.ids,
        queryFn: () => savedPropertiesAPI.ids(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useToggleSavedProperty() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: async ({
            propertyId,
            saved,
        }: {
            propertyId: string;
            saved: boolean;
        }) => {
            if (saved) {
                await savedPropertiesAPI.unsave(propertyId);
                return { propertyId, saved: false };
            }
            await savedPropertiesAPI.save(propertyId);
            return { propertyId, saved: true };
        },
        onSuccess: async () => {
            await Promise.all([
                client.invalidateQueries({
                    queryKey: queryKeys.savedProperties.all,
                }),
                client.invalidateQueries({
                    queryKey: queryKeys.properties.all,
                }),
            ]);
        },
    });
}
