"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { savedSearchesAPI } from "@/lib/api/saved-searches";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreateSavedSearchInput,
    UpdateSavedSearchInput,
} from "@/lib/validations/saved-search";
import { FEEDBACK } from "@/lib/config/feedback";

export function useSavedSearches(enabled = true) {
    return useQuery({
        queryKey: queryKeys.savedSearches.all,
        queryFn: () => savedSearchesAPI.list(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useSavedSearchMatches(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.savedSearches.matches(id ?? ""),
        queryFn: () => savedSearchesAPI.matches(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateSavedSearch() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createSavedSearch,
        mutationFn: (input: CreateSavedSearchInput) =>
            savedSearchesAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.savedSearches.all }),
    });
}

export function useUpdateSavedSearch() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.updateSavedSearch,
        mutationFn: ({
            id,
            input,
        }: {
            id: string;
            input: UpdateSavedSearchInput;
        }) => savedSearchesAPI.update(id, input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.savedSearches.all }),
    });
}

export function useRemoveSavedSearch() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.removeSavedSearch,
        mutationFn: (id: string) => savedSearchesAPI.remove(id),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.savedSearches.all }),
    });
}
