import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    CreateMessageInput,
    Message,
    MessageAttachment,
    UnreadMessageCount,
} from "@/lib/validations/message";

export const messagesAPI = {
    byConnection: (connectionId: string) =>
        query.get<Message[]>(config.api.messages.byConnection(connectionId)),

    unreadCount: () =>
        query.get<UnreadMessageCount>(config.api.messages.unreadCount),

    send: (input: CreateMessageInput) =>
        query.post<Message>(config.api.messages.create, input),

    attach: (id: string, files: File[]) => {
        const body = new FormData();
        files.forEach((file) => body.append("files", file));
        return query.post<MessageAttachment[]>(
            config.api.messages.attachments(id),
            body,
            { headers: { "Content-Type": "multipart/form-data" } },
        );
    },
};
