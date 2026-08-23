"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import { MessageBubble } from "@/components/features/messaging/message-bubble";
import { TypingIndicator } from "@/components/features/messaging/typing-indicator";
import { ENTRY_MOTION } from "@/lib/config/motion";
import type { Message } from "@/lib/types";

const LOG_LABEL = "Message history";

export interface ThreadMessagesProps {
    messages: Message[];
    typing: boolean;
    typingInitials: string;
}

export function ThreadMessages({
    messages,
    typing,
    typingInitials,
}: ThreadMessagesProps) {
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ block: "end" });
    }, [messages.length, typing]);

    return (
        <div
            aria-label={LOG_LABEL}
            className="scroll-y flex min-h-0 flex-1 flex-col gap-3 p-3"
        >
            <AnimatePresence initial={false}>
                {messages.map((message) => (
                    <m.div key={message.id} {...ENTRY_MOTION}>
                        <MessageBubble
                            content={message.content}
                            caption={message.timestamp}
                            isUser={message.senderRole === "user"}
                            avatarInitials={message.initials}
                        />
                    </m.div>
                ))}
                {typing && (
                    <m.div key="typing" {...ENTRY_MOTION}>
                        <TypingIndicator initials={typingInitials} />
                    </m.div>
                )}
            </AnimatePresence>
            <div ref={endRef} />
        </div>
    );
}

ThreadMessages.displayName = "ThreadMessages";
