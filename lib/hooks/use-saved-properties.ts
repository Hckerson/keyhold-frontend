"use client";

import {
    useMutation,
    useMutationState,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { savedPropertiesAPI } from "@/lib/api/saved-properties";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import { FEEDBACK } from "@/lib/config/feedback";

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

interface ToggleSavedInput {
    propertyId: string;
    saved: boolean;
}

const togglingPropertyId = (variables: unknown) =>
    typeof variables === "object" &&
    variables !== null &&
    "propertyId" in variables &&
    typeof variables.propertyId === "string"
        ? variables.propertyId
        : undefined;

export function useTogglingPropertyIds() {
    return useMutationState({
        filters: {
            mutationKey: queryKeys.savedProperties.toggle,
            status: "pending",
        },
        select: (mutation) => togglingPropertyId(mutation.state.variables),
    });
}

export function useToggleSavedProperty() {
    const client = useQueryClient();
    return useMutation({
        mutationKey: queryKeys.savedProperties.toggle,
        meta: FEEDBACK.toggleSavedProperty,
        mutationFn: async ({ propertyId, saved }: ToggleSavedInput) => {
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
