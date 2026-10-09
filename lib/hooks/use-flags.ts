"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { flagsAPI } from "@/lib/api/flags";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreateFlagInput,
    FlagQuery,
    ResolveFlagInput,
} from "@/lib/validations/flag";
import { FEEDBACK } from "@/lib/config/feedback";

export function useFlags(input: FlagQuery = {}, enabled = true) {
    return useQuery({
        queryKey: queryKeys.flags.list(input),
        queryFn: () => flagsAPI.all(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useFlagCounts(enabled = true) {
    return useQuery({
        queryKey: queryKeys.flags.counts,
        queryFn: () => flagsAPI.counts(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useFlag(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.flags.detail(id ?? ""),
        queryFn: () => flagsAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateFlag() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createFlag,
        mutationFn: (input: CreateFlagInput) => flagsAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.flags.all }),
    });
}

export function useSettleFlag() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.settleFlag,
        mutationFn: ({
            id,
            dismiss,
            note,
        }: { id: string; dismiss?: boolean } & ResolveFlagInput) =>
            dismiss
                ? flagsAPI.dismiss(id, { note })
                : flagsAPI.resolve(id, { note }),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.flags.all }),
    });
}
