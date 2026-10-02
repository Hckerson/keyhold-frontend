"use client";

import { useSendMessage } from "@/lib/hooks/use-messages";
import type { MessageSendHandler } from "@/lib/types";

export function useOfferMessage(connectionId: string | undefined) {
    const sendMessage = useSendMessage();

    const send: MessageSendHandler = (content, files, onSent) => {
        if (!connectionId || sendMessage.isPending) return;
        sendMessage.mutate(
            { connectionId, content, files },
            { onSuccess: ({ attached }) => onSent(attached ? [] : files) },
        );
    };

    return { send, sending: sendMessage.isPending };
}
