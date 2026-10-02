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
import type { CreateSuspensionInput } from "@/lib/validations/suspension";
import { FEEDBACK } from "@/lib/config/feedback";

const NO_ACTIVE_SUSPENSION = "This account has no active suspension to lift.";

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

export function useReactivateUser() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.liftSuspension,
        mutationFn: async (userId: string) => {
            const suspensions = await suspensionsAPI.byUser(userId);
            const active = suspensions.find(
                (suspension) => suspension.liftedAt === null,
            );
            if (!active) throw new Error(NO_ACTIVE_SUSPENSION);
            return suspensionsAPI.lift(active.id);
        },
        onSuccess: () => refreshDirectory(client),
    });
}
