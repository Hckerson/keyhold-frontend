"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { escrowAPI } from "@/lib/api/escrow";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type { EscrowQuery, RefundEscrowInput } from "@/lib/validations/escrow";
import { FEEDBACK } from "@/lib/config/feedback";

export function useEscrowHolds(input: EscrowQuery = {}, enabled = true) {
    return useQuery({
        queryKey: queryKeys.escrow.list(input),
        queryFn: () => escrowAPI.holds(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useEscrowStages(enabled = true) {
    return useQuery({
        queryKey: queryKeys.escrow.stages,
        queryFn: () => escrowAPI.stages(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useEscrowHold(id: string | undefined | null) {
    return useQuery({
        queryKey: queryKeys.escrow.detail(id ?? ""),
        queryFn: () => escrowAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

const settlementKeys = [
    queryKeys.escrow.all,
    queryKeys.transactions.all,
    queryKeys.properties.all,
] as const;

export function useReleaseEscrow() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.releaseEscrow,
        mutationFn: (id: string) => escrowAPI.release(id),
        onSuccess: async () => {
            await Promise.all(
                settlementKeys.map((queryKey) =>
                    client.invalidateQueries({ queryKey }),
                ),
            );
        },
    });
}

export function useRefundEscrow() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.refundEscrow,
        mutationFn: ({ id, reason }: { id: string } & RefundEscrowInput) =>
            escrowAPI.refund(id, { reason }),
        onSuccess: async () => {
            await Promise.all(
                settlementKeys.map((queryKey) =>
                    client.invalidateQueries({ queryKey }),
                ),
            );
        },
    });
}
