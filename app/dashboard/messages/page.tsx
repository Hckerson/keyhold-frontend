"use client";

import { useState } from "react";
import { Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";

/* --------------------------------- Types --------------------------------- */

interface Conversation {
    id: string;
    agent: string;
    agentTitle: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
}

interface Message {
    id: string;
    senderRole: "user" | "agent";
    content: string;
    timestamp: string;
    avatar: string;
}

const conversations: Conversation[] = [
    {
        id: "1",
        agent: "Sarah Chen",
        agentTitle: "Senior Real Estate Agent",
        avatar: "SC",
        lastMessage:
            "I can arrange the viewing for tomorrow at 2 PM if that works for you",
        lastMessageTime: "2 hours ago",
        unread: 1,
    },
    {
        id: "2",
        agent: "Michael Rodriguez",
        agentTitle: "Real Estate Concierge",
        avatar: "MR",
        lastMessage: "Your offer has been accepted! Congratulations!",
        lastMessageTime: "5 hours ago",
        unread: 0,
    },
    {
        id: "3",
        agent: "Jennifer Martinez",
        agentTitle: "Property Manager",
        avatar: "JM",
        lastMessage: "Here are the updated inspection reports...",
        lastMessageTime: "1 day ago",
        unread: 0,
    },
];

const sampleMessages: Message[] = [
    {
        id: "1",
        senderRole: "agent",
        content:
            "Hello! I saw your interest in 456 Oak Avenue. Would you like to schedule a viewing?",
        timestamp: "10:30 AM",
        avatar: "SC",
    },
    {
        id: "2",
        senderRole: "user",
        content: "Yes, I would love to see it! What times are available?",
        timestamp: "10:45 AM",
        avatar: "JD",
    },
    {
        id: "3",
        senderRole: "agent",
        content:
            "I can arrange the viewing for tomorrow at 2 PM if that works for you. The property is absolutely stunning!",
        timestamp: "2 hours ago",
        avatar: "SC",
    },
];

/* -------------------------------- Avatar --------------------------------- */

function AvatarTile({
    initials,
    className,
}: {
    initials: string;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "bg-accent-light text-accent grid shrink-0 place-items-center rounded-full text-xs font-semibold",
                className,
            )}
        >
            {initials}
        </span>
    );
}

/* --------------------------- Conversation list --------------------------- */

function ConversationItem({
    conversation,
    active,
    onClick,
}: {
    conversation: Conversation;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-current={active ? "true" : undefined}
            className={cn(
                "border-border-light ease-smooth w-full border-b px-4 py-3 text-left transition-colors",
                active ? "bg-accent-light/50" : "hover:bg-background-alt",
            )}
        >
            <div className="flex items-start gap-3">
                <AvatarTile initials={conversation.avatar} className="size-9" />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-text truncate text-sm font-medium">
                            {conversation.agent}
                        </p>
                        {conversation.unread > 0 && (
                            <span className="bg-highlight text-text-inverse text-caption grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 font-semibold">
                                {conversation.unread}
                            </span>
                        )}
                    </div>
                    <p className="text-text-muted truncate text-xs">
                        {conversation.agentTitle}
                    </p>
                    <p className="text-text-secondary mt-1 line-clamp-1 text-xs">
                        {conversation.lastMessage}
                    </p>
                    <p className="text-text-muted mt-1 text-xs">
                        {conversation.lastMessageTime}
                    </p>
                </div>
            </div>
        </button>
    );
}

function ConversationList({
    items,
    selectedId,
    onSelect,
    className,
}: {
    items: Conversation[];
    selectedId: string;
    onSelect: (id: string) => void;
    className?: string;
}) {
    return (
        <section
            className={cn(
                "bg-background-muted border-border-light flex flex-col overflow-hidden rounded-xl border shadow-sm lg:h-full",
                className,
            )}
        >
            <div className="border-border-light border-b px-4 py-3">
                <h2 className="text-text text-sm font-semibold">
                    Conversations
                </h2>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
                {items.map((conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        active={conversation.id === selectedId}
                        onClick={() => onSelect(conversation.id)}
                    />
                ))}
            </div>
        </section>
    );
}

/* ------------------------------ Message thread --------------------------- */

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.senderRole === "user";
    return (
        <div className={cn("flex gap-2.5", isUser && "flex-row-reverse")}>
            <AvatarTile initials={message.avatar} className="size-8" />
            <div
                className={cn(
                    "flex max-w-[75%] flex-col gap-1",
                    isUser ? "items-end" : "items-start",
                )}
            >
                <div
                    className={cn(
                        "px-3.5 py-2 text-sm",
                        isUser
                            ? "bg-accent text-text-inverse rounded-2xl rounded-br-sm"
                            : "bg-background border-border-light text-text rounded-2xl rounded-bl-sm border",
                    )}
                >
                    {message.content}
                </div>
                <span className="text-text-muted text-xs">
                    {message.timestamp}
                </span>
            </div>
        </div>
    );
}

function MessageComposer() {
    const [text, setText] = useState("");

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        setText("");
    };

    return (
        <form
            onSubmit={submit}
            className="border-border-light flex items-center gap-2 border-t p-3"
        >
            <Input
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Type your message…"
                aria-label="Message"
                className="flex-1"
            />
            <Button
                variant="primary"
                size="sm"
                type="submit"
                aria-label="Send message"
            >
                <Send size={16} strokeWidth={1.5} />
            </Button>
        </form>
    );
}

function MessageThread({
    conversation,
    messages,
    className,
}: {
    conversation?: Conversation;
    messages: Message[];
    className?: string;
}) {
    return (
        <section
            className={cn(
                "bg-background-muted border-border-light flex flex-col overflow-hidden rounded-xl border shadow-sm lg:h-full",
                className,
            )}
        >
            {conversation ? (
                <>
                    <div className="border-border-light flex items-center justify-between gap-3 border-b px-4 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <AvatarTile
                                initials={conversation.avatar}
                                className="size-8"
                            />
                            <div className="min-w-0">
                                <p className="text-text truncate text-sm font-medium">
                                    {conversation.agent}
                                </p>
                                <p className="text-text-muted truncate text-xs">
                                    {conversation.agentTitle}
                                </p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm">
                            <Phone
                                size={14}
                                strokeWidth={1.5}
                                className="mr-1.5"
                            />
                            Call
                        </Button>
                    </div>

                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                    </div>

                    <MessageComposer />
                </>
            ) : (
                <div className="text-text-secondary flex flex-1 items-center justify-center p-6 text-sm">
                    Select a conversation to start messaging
                </div>
            )}
        </section>
    );
}

/* --------------------------------- Page ---------------------------------- */

export default function MessagesPage() {
    const [selectedId, setSelectedId] = useState("1");
    const selected = conversations.find((c) => c.id === selectedId);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Messages"
                description="Chat with your real estate agents and concierge"
            />

            <div className="grid grid-cols-1 gap-4 lg:h-150 lg:grid-cols-3">
                <ConversationList
                    items={conversations}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    className="lg:col-span-1"
                />
                <MessageThread
                    conversation={selected}
                    messages={sampleMessages}
                    className="lg:col-span-2"
                />
            </div>
        </div>
    );
}
