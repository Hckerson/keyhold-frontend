import type { Message, ThreadDocument } from "@/lib/types/message";
import type { Message as ApiMessage } from "@/lib/validations/message";
import { formatClock, initialsOf } from "@/lib/utils/format";

export const toThread = (
    messages: ApiMessage[],
    viewerId: string | undefined,
    agentName: string,
): Message[] =>
    messages.map((message) => {
        const mine = message.senderId === viewerId;

        return {
            id: message.id,
            senderRole: mine ? "user" : "agent",
            content: message.content,
            timestamp: formatClock(new Date(message.createdAt)),
            initials: initialsOf(
                mine ? (message.sender?.fullName ?? "") : agentName,
            ),
            documents: (message.attachments ?? []).map((attachment) => ({
                id: attachment.id,
                filename: attachment.filename,
                url: attachment.url,
                mimeType: attachment.mimeType,
                sizeBytes: attachment.sizeBytes,
                sharedBy: mine
                    ? (message.sender?.fullName ?? "You")
                    : agentName,
                sharedAt: formatClock(new Date(attachment.createdAt)),
            })),
        };
    });

const MS_PER_MINUTE = 60 * 1000;

export const medianReplyMinutes = (
    messages: ApiMessage[],
    viewerId: string | undefined,
) => {
    const gaps = messages.flatMap((message, index) => {
        const previous = messages[index - 1];
        if (!previous) return [];
        if (message.senderId === viewerId) return [];
        if (previous.senderId !== viewerId) return [];

        const elapsed =
            new Date(message.createdAt).getTime() -
            new Date(previous.createdAt).getTime();
        return elapsed > 0 ? [Math.round(elapsed / MS_PER_MINUTE)] : [];
    });

    if (gaps.length === 0) return null;
    const sorted = [...gaps].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
};

export const threadDocuments = (messages: Message[]): ThreadDocument[] =>
    messages.flatMap((message) => message.documents);
