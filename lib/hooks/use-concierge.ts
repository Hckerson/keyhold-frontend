"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { conciergeAPI } from "@/lib/api/concierge";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreateConciergeClientInput,
    CreateConciergePracticeInput,
    CreateConciergeServiceInput,
    UpdateConciergeClientInput,
} from "@/lib/validations/concierge";
import { FEEDBACK } from "@/lib/config/feedback";

export function useConciergeOverview(enabled = true) {
    return useQuery({
        queryKey: queryKeys.concierge.overview,
        queryFn: () => conciergeAPI.overview(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useConciergeClients(enabled = true) {
    return useQuery({
        queryKey: queryKeys.concierge.clients,
        queryFn: () => conciergeAPI.clients(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useConciergeServices(enabled = true) {
    return useQuery({
        queryKey: queryKeys.concierge.services,
        queryFn: () => conciergeAPI.services(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useConciergePractices(enabled = true) {
    return useQuery({
        queryKey: queryKeys.concierge.practices,
        queryFn: () => conciergeAPI.practices(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateConciergeClient() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createConciergeClient,
        mutationFn: (input: CreateConciergeClientInput) =>
            conciergeAPI.createClient(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.concierge.all }),
    });
}

export function useUpdateConciergeClient() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.updateConciergeClient,
        mutationFn: ({
            id,
            input,
        }: {
            id: string;
            input: UpdateConciergeClientInput;
        }) => conciergeAPI.updateClient(id, input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.concierge.all }),
    });
}

export function useRemoveConciergeClient() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.removeConciergeClient,
        mutationFn: (id: string) => conciergeAPI.removeClient(id),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.concierge.all }),
    });
}

export function useSaveConciergeService() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.saveConciergeService,
        mutationFn: (input: CreateConciergeServiceInput) =>
            conciergeAPI.createService(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.concierge.all }),
    });
}

export function useSaveConciergePractice() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.saveConciergePractice,
        mutationFn: (input: CreateConciergePracticeInput) =>
            conciergeAPI.createPractice(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.concierge.all }),
    });
}

export function useCoverConciergeClient() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.coverConciergeClient,
        mutationFn: ({
            practiceId,
            clientId,
        }: {
            practiceId: string;
            clientId: string;
        }) => conciergeAPI.cover(practiceId, clientId),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.concierge.all }),
    });
}
