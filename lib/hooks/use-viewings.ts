"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { viewingsAPI } from "@/lib/api/viewings";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    ConfirmViewingInput,
    CreateViewingInput,
} from "@/lib/validations/viewing";

export function useConnectionViewings(connectionId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.viewings.byConnection(connectionId ?? ""),
        queryFn: () => viewingsAPI.byConnection(connectionId as string),
        enabled: Boolean(connectionId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useViewing(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.viewings.detail(id ?? ""),
        queryFn: () => viewingsAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useRequestViewing() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (input: CreateViewingInput) => viewingsAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.viewings.all }),
    });
}

export function useConfirmViewing() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...input }: ConfirmViewingInput & { id: string }) =>
            viewingsAPI.confirm(id, input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.viewings.all }),
    });
}
