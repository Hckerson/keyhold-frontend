"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { offersAPI } from "@/lib/api/offers";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreateOfferInput,
    RespondOfferInput,
} from "@/lib/validations/offer";
import { FEEDBACK } from "@/lib/config/feedback";

export function useConnectionOffers(connectionId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.offers.byConnection(connectionId ?? ""),
        queryFn: () => offersAPI.byConnection(connectionId as string),
        enabled: Boolean(connectionId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useOffer(id: string | undefined) {
    return useQuery({
        queryKey: queryKeys.offers.detail(id ?? ""),
        queryFn: () => offersAPI.detail(id as string),
        enabled: Boolean(id),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useCreateOffer() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.createOffer,
        mutationFn: (input: CreateOfferInput) => offersAPI.create(input),
        onSuccess: async () => {
            await Promise.all([
                client.invalidateQueries({ queryKey: queryKeys.offers.all }),
                client.invalidateQueries({
                    queryKey: queryKeys.connections.all,
                }),
            ]);
        },
    });
}

export function useRespondToOffer() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.respondToOffer,
        mutationFn: ({ id, ...input }: RespondOfferInput & { id: string }) =>
            offersAPI.respond(id, input),
        onSuccess: async () => {
            await Promise.all([
                client.invalidateQueries({ queryKey: queryKeys.offers.all }),
                client.invalidateQueries({
                    queryKey: queryKeys.connections.all,
                }),
            ]);
        },
    });
}

export function useAcceptCounter() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.acceptCounter,
        mutationFn: (id: string) => offersAPI.acceptCounter(id),
        onSuccess: async (offer) => {
            await Promise.all([
                client.invalidateQueries({
                    queryKey: queryKeys.offers.detail(offer.id),
                }),
                client.invalidateQueries({
                    queryKey: queryKeys.connections.all,
                }),
            ]);
        },
    });
}
