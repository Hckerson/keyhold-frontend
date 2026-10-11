"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { kycAPI } from "@/lib/api/kyc";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    KycQuery,
    RejectKycInput,
    SubmitKycInput,
} from "@/lib/validations/kyc";
import { FEEDBACK, type MutationFeedback } from "@/lib/config/feedback";

export function useKycQueue(input: KycQuery = {}, enabled = true) {
    return useQuery({
        queryKey: queryKeys.kyc.list(input),
        queryFn: () => kycAPI.queue(input),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useKycCounts(enabled = true) {
    return useQuery({
        queryKey: queryKeys.kyc.counts,
        queryFn: () => kycAPI.counts(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useMyDocuments(enabled = true) {
    return useQuery({
        queryKey: queryKeys.kyc.mine,
        queryFn: () => kycAPI.mine(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useIdentityDocument(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.kyc.detail(id ?? ""),
        queryFn: () => kycAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useSubmitKyc() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.submitKyc,
        mutationFn: ({
            input,
            document,
            face,
        }: {
            input: SubmitKycInput;
            document: File;
            face?: File;
        }) => kycAPI.submit(input, document, face),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.kyc.all }),
    });
}

export function useReviewKyc(feedback: MutationFeedback = FEEDBACK.reviewKyc) {
    const client = useQueryClient();
    return useMutation({
        meta: feedback,
        mutationFn: ({
            id,
            rejectionReason,
        }: { id: string } & Partial<RejectKycInput>) =>
            rejectionReason
                ? kycAPI.reject(id, { rejectionReason })
                : kycAPI.approve(id),
        onSuccess: async () => {
            await Promise.all([
                client.invalidateQueries({ queryKey: queryKeys.kyc.all }),
                client.invalidateQueries({ queryKey: queryKeys.users.all }),
            ]);
        },
    });
}
