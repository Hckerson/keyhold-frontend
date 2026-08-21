"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { disputesAPI } from "@/lib/api/disputes";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    AddEvidenceInput,
    CreateDisputeInput,
    DisputeQuery,
    ResolveDisputeInput,
} from "@/lib/validations/dispute";

export function useDisputes(input: DisputeQuery = {}, enabled = true) {
    return useQuery({
        queryKey: queryKeys.disputes.list(input),
        queryFn: () => disputesAPI.list(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useMyDisputes(enabled = true) {
    return useQuery({
        queryKey: queryKeys.disputes.mine,
        queryFn: () => disputesAPI.mine(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useDisputeCounts(enabled = true) {
    return useQuery({
        queryKey: queryKeys.disputes.counts,
        queryFn: () => disputesAPI.counts(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useDispute(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.disputes.detail(id ?? ""),
        queryFn: () => disputesAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateDispute() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (input: CreateDisputeInput) => disputesAPI.create(input),
        onSuccess: async () => {
            await Promise.all([
                client.invalidateQueries({ queryKey: queryKeys.disputes.all }),
                client.invalidateQueries({
                    queryKey: queryKeys.transactions.all,
                }),
            ]);
        },
    });
}

export function useAddDisputeEvidence(id: string) {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (input: AddEvidenceInput) =>
            disputesAPI.addEvidence(id, input),
        onSuccess: () =>
            client.invalidateQueries({
                queryKey: queryKeys.disputes.detail(id),
            }),
    });
}

export function useSettleDispute() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            dismiss,
            resolutionNotes,
        }: { id: string; dismiss?: boolean } & ResolveDisputeInput) =>
            dismiss
                ? disputesAPI.dismiss(id, { resolutionNotes })
                : disputesAPI.resolve(id, { resolutionNotes }),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.disputes.all }),
    });
}
