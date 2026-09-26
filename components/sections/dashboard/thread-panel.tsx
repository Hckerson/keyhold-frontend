"use client";

import { MessagesSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { MessageComposer } from "@/components/features/messaging/message-composer";
import { ThreadHeader } from "@/components/features/messaging/thread-header";
import { ThreadMessages } from "@/components/features/messaging/thread-messages";
import type { Conversation, Message, MessageSendHandler } from "@/lib/types";

const COMPOSER_LABEL = "Message";
const COMPOSER_PLACEHOLDER = "Type your message…";
const EMPTY_TITLE = "No conversation selected";
const EMPTY_LEDE = "Pick a thread from the rail to start messaging.";

export interface ThreadPanelProps {
    conversation?: Conversation;
    messages: Message[];
    typing: boolean;
    sending: boolean;
    onSend: MessageSendHandler;
}

export function ThreadPanel({
    conversation,
    messages,
    typing,
    sending,
    onSend,
}: ThreadPanelProps) {
    return (
        <section className="console-span-2 bg-background-muted border-border-light flex flex-col overflow-hidden rounded-xl border shadow-sm">
            {conversation ? (
                <>
                    <ThreadHeader conversation={conversation} />
                    <ThreadMessages
                        messages={messages}
                        typing={typing}
                        typingInitials={conversation.initials}
                    />
                    <MessageComposer
                        inputId="message-composer"
                        inputLabel={COMPOSER_LABEL}
                        placeholder={COMPOSER_PLACEHOLDER}
                        onSend={onSend}
                        pending={sending}
                        attachable
                    />
                </>
            ) : (
                <div className="flex flex-1 items-center justify-center p-4">
                    <EmptyState
                        icon={MessagesSquare}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                </div>
            )}
        </section>
    );
}

ThreadPanel.displayName = "ThreadPanel";
