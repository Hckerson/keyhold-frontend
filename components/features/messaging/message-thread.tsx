"use client";

import { Phone, Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { MessageBubble } from "@/components/features/messaging/message-bubble";
import { MessageComposer } from "@/components/features/messaging/message-composer";
import { TypingIndicator } from "@/components/features/messaging/typing-indicator";
import type { Conversation, Message } from "@/lib/data/messages";
import { cn } from "@/lib/utils";

export interface MessageThreadProps {
    conversation?: Conversation;
    messages: Message[];
    typing: boolean;
    onSend: (content: string, attachments: string[]) => void;
    className?: string;
}

export function MessageThread({
    conversation,
    messages,
    typing,
    onSend,
    className,
}: MessageThreadProps) {
    return (
        <section
            className={cn(
                "bg-background-muted border-border-light flex flex-col overflow-hidden rounded-xl border shadow-sm lg:h-full",
                className,
            )}
        >
            {conversation ? (
                <>
                    <div className="border-border-light flex items-center justify-between gap-3 border-b px-3 py-2.5">
                        <div className="flex min-w-0 items-center gap-3">
                            <Avatar
                                size="sm"
                                tone="accent"
                                elevated={false}
                                initials={conversation.avatar}
                            />
                            <div className="min-w-0">
                                <p className="text-text truncate text-xs font-medium">
                                    {conversation.agent}
                                </p>
                                <p className="text-text-muted truncate text-xs">
                                    {conversation.agentTitle}
                                </p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm">
                            <Phone
                                size={12}
                                strokeWidth={1.5}
                                className="mr-1.5"
                            />
                            Call
                        </Button>
                    </div>

                    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                content={message.content}
                                caption={message.timestamp}
                                isUser={message.senderRole === "user"}
                                avatarInitials={message.avatar}
                                attachments={message.attachments}
                            />
                        ))}
                        {typing && (
                            <TypingIndicator initials={conversation.avatar} />
                        )}
                    </div>

                    <MessageComposer
                        inputId="message-composer"
                        inputLabel="Message"
                        placeholder="Type your message…"
                        attachLabel="Attach file"
                        onSend={onSend}
                    />
                </>
            ) : (
                <div className="flex flex-1 items-center justify-center p-6">
                    <EmptyState
                        icon={Search}
                        title="No conversation selected"
                        description="Pick a conversation from the list to start messaging."
                    />
                </div>
            )}
        </section>
    );
}
