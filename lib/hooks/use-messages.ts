"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { messagesAPI } from "@/lib/api/messages";
import { queryKeys } from "@/lib/hooks/query-keys";
import { CACHE_TIME, STALE_TIME } from "@/lib/constants";
import { FEEDBACK } from "@/lib/config/feedback";
import { notify } from "@/lib/stores/toast-store";
import { errorMessage } from "@/lib/utils/api-error";
import type { CreateMessageInput } from "@/lib/validations/message";

export type SendMessageInput = CreateMessageInput & { files?: File[] };

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

const attachFiles = async (messageId: string, files: File[]) => {
    try {
        await messagesAPI.attach(messageId, files);
        return true;
    } catch (error) {
        notify({
            tone: "error",
            title: FEEDBACK.attachMessageFiles.error,
            description: errorMessage(error, "") || undefined,
        });
        return false;
    }
};

export function useSendMessage() {
    const client = useQueryClient();
    return useMutation({
        meta: FEEDBACK.sendMessage,
        mutationFn: async ({ files, ...input }: SendMessageInput) => {
            const message = await messagesAPI.send(input);
            const attached =
                !files || files.length === 0
                    ? true
                    : await attachFiles(message.id, files);
            return { message, attached };
        },
        onSuccess: async (_result, input) => {
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
