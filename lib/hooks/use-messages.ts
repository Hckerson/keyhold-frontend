"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messagesAPI } from "@/lib/api/messages";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import type { CreateMessageInput } from "@/lib/validations/message";

export function useConversation(connectionId: string | undefined) {
    return useQuery({
        queryKey: queryKeys.messages.byConnection(connectionId ?? ""),
        queryFn: () => messagesAPI.byConnection(connectionId as string),
        enabled: Boolean(connectionId),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useUnreadMessageCount(enabled = true) {
    return useQuery({
        queryKey: queryKeys.messages.unreadCount,
        queryFn: () => messagesAPI.unreadCount(),
        enabled,
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

export function useSendMessage() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (input: CreateMessageInput) => messagesAPI.send(input),
        onSuccess: async (_message, input) => {
            await Promise.all([
                client.invalidateQueries({
                    queryKey: queryKeys.messages.byConnection(
                        input.connectionId,
                    ),
                }),
                client.invalidateQueries({
                    queryKey: queryKeys.messages.unreadCount,
                }),
            ]);
        },
    });
}
