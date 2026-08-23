"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersAPI } from "@/lib/api/users";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { UpdateUserInput } from "@/lib/validations/user";
import type { UserTier } from "@/lib/enums/enums";

export function useCurrentUser() {
    const accessToken = useAuthStore((state) => state.accessToken);
    return useQuery({
        queryKey: queryKeys.users.me,
        queryFn: () => usersAPI.me(),
        enabled: Boolean(accessToken),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUsers(enabled = true) {
    return useQuery({
        queryKey: queryKeys.users.all,
        queryFn: () => usersAPI.list(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUser(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.users.detail(id ?? ""),
        queryFn: () => usersAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUpdateUser(id: string) {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (input: UpdateUserInput) => usersAPI.update(id, input),
        onSuccess: async () => {
            await Promise.all([
                client.invalidateQueries({ queryKey: queryKeys.users.me }),
                client.invalidateQueries({
                    queryKey: queryKeys.users.detail(id),
                }),
            ]);
        },
    });
}

export function useTierDistribution(enabled = true) {
    return useQuery({
        queryKey: queryKeys.users.tierDistribution,
        queryFn: () => usersAPI.tierDistribution(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useSetUserTier() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, tier }: { id: string; tier: UserTier }) =>
            usersAPI.setTier(id, tier),
        onSuccess: async () => {
            await Promise.all([
                client.invalidateQueries({ queryKey: queryKeys.users.all }),
                client.invalidateQueries({
                    queryKey: queryKeys.users.tierDistribution,
                }),
            ]);
        },
    });
}
