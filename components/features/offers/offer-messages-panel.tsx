"use client";

import { Panel } from "@/components/ui/panel";
import { MessageBubble } from "@/components/features/messaging/message-bubble";
import { MessageComposer } from "@/components/features/messaging/message-composer";
import type { ThreadMessage } from "@/lib/data/offer-details";

export interface OfferMessagesPanelProps {
    messages: ThreadMessage[];
    onSend: (content: string, files: File[]) => void;
}

export function OfferMessagesPanel({
    messages,
    onSend,
}: OfferMessagesPanelProps) {
    return (
        <Panel title="Messages" count={messages.length}>
            <div className="space-y-3">
                <ul className="scroll-y max-h-80 space-y-3">
                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            variant="panel"
                            content={message.content}
                            caption={`${message.author} · ${message.timestamp}`}
                            isUser={message.senderRole === "user"}
                            documents={message.documents}
                        />
                    ))}
                </ul>
                <MessageComposer
                    variant="panel"
                    inputLabel="Message to agent"
                    placeholder="Message your agent…"
                    onSend={onSend}
                    attachable
                />
            </div>
        </Panel>
    );
}
