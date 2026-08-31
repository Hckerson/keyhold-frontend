"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionsAPI } from "@/lib/api/transactions";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreateTransactionInput,
    TransactionQuery,
} from "@/lib/validations/transaction";
import { FEEDBACK } from "@/lib/config/feedback";

export function useTransactionLedger(
    input: TransactionQuery = {},
    enabled = true,
) {
    return useQuery({
        queryKey: queryKeys.transactions.list(input),
        queryFn: () => transactionsAPI.list(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useTransactionStages(enabled = true) {
    return useQuery({
        queryKey: queryKeys.transactions.stages,
        queryFn: () => transactionsAPI.stages(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function usePurchases(enabled = true) {
    return useQuery({
        queryKey: queryKeys.transactions.purchases,
        queryFn: () => transactionsAPI.purchases(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useSales(enabled = true) {
    return useQuery({
        queryKey: queryKeys.transactions.sales,
        queryFn: () => transactionsAPI.sales(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useTransaction(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.transactions.detail(id ?? ""),
        queryFn: () => transactionsAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateTransaction() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createTransaction,
        mutationFn: (input: CreateTransactionInput) =>
            transactionsAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.transactions.all }),
    });
}

export function useConfirmPayment() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.confirmPayment,
        mutationFn: ({
            id,
            paymentIntentId,
        }: {
            id: string;
            paymentIntentId: string;
        }) => transactionsAPI.confirmPayment(id, paymentIntentId),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.transactions.all }),
    });
}
