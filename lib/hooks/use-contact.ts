"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contactAPI } from "@/lib/api/contact";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import { FEEDBACK } from "@/lib/config/feedback";
import { EMAIL_NOT_DELIVERED } from "@/lib/config/lead-contact";
import type { SendLeadEmailInput } from "@/lib/validations/contact";

export function useContactHistory(connectionId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.contact.byConnection(connectionId ?? ""),
        queryFn: () => contactAPI.history(connectionId as string),
        enabled: Boolean(connectionId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

function useContactInvalidation(connectionId: string) {
    const client = useQueryClient();

    return () =>
        Promise.all([
            client.invalidateQueries({
                queryKey: queryKeys.contact.byConnection(connectionId),
            }),
            client.invalidateQueries({
                queryKey: queryKeys.connections.incoming,
            }),
        ]);
}

export function useSendLeadEmail(connectionId: string) {
    const invalidate = useContactInvalidation(connectionId);

    return useMutation({
        meta: FEEDBACK.sendLeadEmail,
        mutationFn: async (input: SendLeadEmailInput) => {
            const activity = await contactAPI.sendEmail(connectionId, input);
            if (activity.status !== "SENT")
                throw new Error(EMAIL_NOT_DELIVERED);
            return activity;
        },
        onSettled: invalidate,
    });
}

export function useStartLeadCall(connectionId: string) {
    const invalidate = useContactInvalidation(connectionId);

    return useMutation({
        meta: FEEDBACK.startLeadCall,
        mutationFn: () => contactAPI.startCall(connectionId),
        onSettled: invalidate,
    });
}
