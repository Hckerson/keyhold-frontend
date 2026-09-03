"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
    type QueryClient,
} from "@tanstack/react-query";
import { suspensionsAPI } from "@/lib/api/suspensions";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreateSuspensionInput,
    SuspensionQuery,
} from "@/lib/validations/suspension";
import { FEEDBACK } from "@/lib/config/feedback";

export function useSuspensions(input: SuspensionQuery = {}, enabled = true) {
    return useQuery({
        queryKey: queryKeys.suspensions.list(input),
        queryFn: () => suspensionsAPI.list(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUserSuspensions(userId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.suspensions.byUser(userId ?? ""),
        queryFn: () => suspensionsAPI.byUser(userId as string),
        enabled: Boolean(userId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

const DIRECTORY_KEYS = [
    queryKeys.suspensions.all,
    queryKeys.users.all,
    queryKeys.stats.users,
] as const;

const refreshDirectory = (client: QueryClient) =>
    Promise.all(
        DIRECTORY_KEYS.map((queryKey) =>
            client.invalidateQueries({ queryKey }),
        ),
    );

export function useSuspendUser() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.suspendUser,
        mutationFn: (input: CreateSuspensionInput) =>
            suspensionsAPI.create(input),
        onSuccess: () => refreshDirectory(client),
    });
}

export function useLiftSuspension() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.liftSuspension,
        mutationFn: (id: string) => suspensionsAPI.lift(id),
        onSuccess: () => refreshDirectory(client),
    });
}
