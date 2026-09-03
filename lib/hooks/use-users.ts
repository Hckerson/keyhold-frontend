"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersAPI } from "@/lib/api/users";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { CreateUserInput, UpdateUserInput } from "@/lib/validations/user";
import type { UserTier } from "@/lib/enums/enums";
import { FEEDBACK } from "@/lib/config/feedback";

export function useCurrentUser() {
    const user = useAuthStore((state) => state.user);
    return useQuery({
        queryKey: queryKeys.users.me,
        queryFn: () => usersAPI.me(),
        enabled: Boolean(user),
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

export function useCreateUser() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createUser,
        mutationFn: (input: CreateUserInput) => usersAPI.create(input),
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

export function useUpdateUser(id: string) {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.updateUser,
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
        meta: FEEDBACK.setUserTier,
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
