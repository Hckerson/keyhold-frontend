"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { connectionsAPI } from "@/lib/api/connections";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreateConnectionInput,
    CreateLeadInput,
} from "@/lib/validations/connection";
import { FEEDBACK } from "@/lib/config/feedback";

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
        meta: FEEDBACK.createConnection,
        mutationFn: (input: CreateConnectionInput) =>
            connectionsAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.connections.all }),
    });
}

export function useRecordLead() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.recordLead,
        mutationFn: (input: CreateLeadInput) =>
            connectionsAPI.recordLead(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.connections.all }),
    });
}

export function useRespondToConnection() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.respondToConnection,
        mutationFn: ({ id, accept }: { id: string; accept: boolean }) =>
            accept ? connectionsAPI.accept(id) : connectionsAPI.reject(id),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.connections.all }),
    });
}
