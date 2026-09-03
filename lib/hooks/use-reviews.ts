"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewsAPI } from "@/lib/api/reviews";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type { CreateReviewInput } from "@/lib/validations/review";
import { FEEDBACK } from "@/lib/config/feedback";

export function useUserReviews(userId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.reviews.byUser(userId ?? ""),
        queryFn: () => reviewsAPI.byUser(userId as string),
        enabled: Boolean(userId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUserRating(userId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.reviews.userRating(userId ?? ""),
        queryFn: () => reviewsAPI.userRating(userId as string),
        enabled: Boolean(userId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useTransactionReviews(transactionId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.reviews.byTransaction(transactionId ?? ""),
        queryFn: () => reviewsAPI.byTransaction(transactionId as string),
        enabled: Boolean(transactionId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateReview(transactionId: string) {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createReview,
        mutationFn: (input: CreateReviewInput) =>
            reviewsAPI.create(transactionId, input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.reviews.all }),
    });
}
