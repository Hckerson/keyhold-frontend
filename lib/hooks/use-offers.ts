"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { offersAPI } from "@/lib/api/offers";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type {
    CreateOfferInput,
    RespondOfferInput,
} from "@/lib/validations/offer";

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
        mutationFn: (input: CreateOfferInput) => offersAPI.create(input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.offers.all }),
    });
}

export function useRespondToOffer() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...input }: RespondOfferInput & { id: string }) =>
            offersAPI.respond(id, input),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: queryKeys.offers.all }),
    });
}

export function useAcceptCounter() {
    const client = useQueryClient();
    return useMutation({
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
