"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { connectionsAPI } from "@/lib/api/connections";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type { CreateConnectionInput } from "@/lib/validations/connection";

export function useMyInterests(enabled = true) {
    return useQuery({
        queryKey: queryKeys.connections.myInterests,
        queryFn: () => connectionsAPI.myInterests(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useIncomingConnections(enabled = true) {
    return useQuery({
        queryKey: queryKeys.connections.incoming,
        queryFn: () => connectionsAPI.incoming(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useConnection(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.connections.detail(id ?? ""),
        queryFn: () => connectionsAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateConnection() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (input: CreateConnectionInput) =>
            connectionsAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.connections.all }),
    });
}

export function useRespondToConnection() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, accept }: { id: string; accept: boolean }) =>
            accept ? connectionsAPI.accept(id) : connectionsAPI.reject(id),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.connections.all }),
    });
}
