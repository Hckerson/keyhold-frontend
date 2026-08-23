import type { Message } from "@/lib/types/message";
import type { Message as ApiMessage } from "@/lib/validations/message";
import { initialsOf } from "@/lib/utils/format";

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
};

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
            timestamp: new Date(message.createdAt).toLocaleTimeString(
                "en-US",
                TIME_FORMAT,
            ),
            initials: initialsOf(
                mine ? (message.sender?.fullName ?? "") : agentName,
            ),
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
