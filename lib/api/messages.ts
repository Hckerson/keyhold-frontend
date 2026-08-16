import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type { CreateMessageInput, Message } from "@/lib/validations/message";

export const messagesAPI = {
    byConnection: (connectionId: string) =>
        query.get<Message[]>(config.api.messages.byConnection(connectionId)),

    unreadCount: () => query.get<number>(config.api.messages.unreadCount),

    send: (input: CreateMessageInput) =>
        query.post<Message>(config.api.messages.create, input),
};
