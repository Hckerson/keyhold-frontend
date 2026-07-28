"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Paperclip, Phone, Search, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

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
    attachments?: string[];
}

const USER_AVATAR = "JD";
const AGENT_REPLY_DELAY = 1500;

const initialConversations: Conversation[] = [
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
        unread: 2,
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

const initialThreads: Record<string, Message[]> = {
    "1": [
        {
            id: "1-1",
            senderRole: "agent",
            content:
                "Hello! I saw your interest in 456 Oak Avenue. Would you like to schedule a viewing?",
            timestamp: "10:30 AM",
            avatar: "SC",
        },
        {
            id: "1-2",
            senderRole: "user",
            content: "Yes, I would love to see it! What times are available?",
            timestamp: "10:45 AM",
            avatar: USER_AVATAR,
        },
        {
            id: "1-3",
            senderRole: "agent",
            content:
                "I can arrange the viewing for tomorrow at 2 PM if that works for you. The property is absolutely stunning!",
            timestamp: "11:02 AM",
            avatar: "SC",
        },
    ],
    "2": [
        {
            id: "2-1",
            senderRole: "user",
            content:
                "Any word from the seller on 789 Sunset Blvd? We submitted at asking.",
            timestamp: "8:12 AM",
            avatar: USER_AVATAR,
        },
        {
            id: "2-2",
            senderRole: "agent",
            content:
                "Just heard back. Your offer has been accepted! Congratulations!",
            timestamp: "9:40 AM",
            avatar: "MR",
        },
        {
            id: "2-3",
            senderRole: "agent",
            content:
                "I am sending the signed acceptance and the escrow instructions now.",
            timestamp: "9:41 AM",
            avatar: "MR",
            attachments: ["acceptance-789-sunset.pdf"],
        },
    ],
    "3": [
        {
            id: "3-1",
            senderRole: "agent",
            content:
                "The inspection on 234 Oak Street wrapped up this morning.",
            timestamp: "2:15 PM",
            avatar: "JM",
        },
        {
            id: "3-2",
            senderRole: "agent",
            content:
                "Here are the updated inspection reports for your records.",
            timestamp: "2:16 PM",
            avatar: "JM",
            attachments: ["inspection-report.pdf", "roof-addendum.pdf"],
        },
    ],
};

const clockTime = () =>
    new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

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
                "border-border-light ease-smooth w-full border-b px-3 py-2.5 text-left transition-colors",
                active ? "bg-accent-light/50" : "hover:bg-background-alt",
            )}
        >
            <div className="flex items-start gap-3">
                <AvatarTile initials={conversation.avatar} className="size-8" />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-text truncate text-xs font-medium">
                            {conversation.agent}
                        </p>
                        {conversation.unread > 0 && (
                            <span className="bg-highlight text-text-inverse grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 font-mono text-[10px] font-semibold tabular-nums">
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
    query,
    onQueryChange,
    onSelect,
    className,
}: {
    items: Conversation[];
    selectedId: string;
    query: string;
    onQueryChange: (value: string) => void;
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
            <div className="border-border-light space-y-2 border-b px-3 py-2.5">
                <h2 className="text-text text-xs font-medium">Conversations</h2>
                <Input
                    id="conversation-search"
                    type="search"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder="Search conversations"
                    aria-label="Search conversations"
                    endSlot={
                        <Search
                            size={12}
                            strokeWidth={1.5}
                            className="text-text-muted"
                        />
                    }
                />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
                {items.length > 0 ? (
                    items.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            active={conversation.id === selectedId}
                            onClick={() => onSelect(conversation.id)}
                        />
                    ))
                ) : (
                    <p className="text-text-secondary p-3 text-xs">
                        No conversations match “{query}”.
                    </p>
                )}
            </div>
        </section>
    );
}

function MessageBubble({ message }: { message: Message }) {
    const isUser = message.senderRole === "user";
    return (
        <div className={cn("flex gap-2.5", isUser && "flex-row-reverse")}>
            <AvatarTile initials={message.avatar} className="size-7" />
            <div
                className={cn(
                    "flex max-w-[75%] flex-col gap-1",
                    isUser ? "items-end" : "items-start",
                )}
            >
                <div
                    className={cn(
                        "px-3 py-2 text-xs",
                        isUser
                            ? "bg-accent text-text-inverse rounded-2xl rounded-br-sm"
                            : "bg-background border-border-light text-text rounded-2xl rounded-bl-sm border",
                    )}
                >
                    {message.content}
                    {message.attachments && message.attachments.length > 0 && (
                        <ul className="mt-2 flex flex-col gap-1">
                            {message.attachments.map((file) => (
                                <li
                                    key={file}
                                    className={cn(
                                        "flex items-center gap-1.5 text-xs",
                                        isUser
                                            ? "text-text-inverse/80"
                                            : "text-text-secondary",
                                    )}
                                >
                                    <Paperclip
                                        size={12}
                                        strokeWidth={1.5}
                                        className="shrink-0"
                                    />
                                    <span className="truncate">{file}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <span className="text-text-muted text-xs">
                    {message.timestamp}
                </span>
            </div>
        </div>
    );
}

function TypingIndicator({ initials }: { initials: string }) {
    return (
        <div className="flex items-center gap-2.5" aria-live="polite">
            <AvatarTile initials={initials} className="size-7" />
            <div className="bg-background border-border-light flex items-center gap-1 rounded-2xl rounded-bl-sm border px-3 py-2">
                <span className="sr-only">Agent is typing</span>
                {[0, 1, 2].map((dot) => (
                    <span
                        key={dot}
                        className="bg-text-muted size-1.5 animate-bounce rounded-full"
                        style={{ animationDelay: `${dot * 150}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}

function MessageComposer({
    onSend,
}: {
    onSend: (content: string, attachments: string[]) => void;
}) {
    const [text, setText] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = text.trim();
        if (!trimmed && attachments.length === 0) return;
        onSend(trimmed || "Shared a file", attachments);
        setText("");
        setAttachments([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(event.target.files ?? []).map(
            (file) => file.name,
        );
        if (picked.length > 0) {
            setAttachments((prev) => [...prev, ...picked]);
        }
    };

    const removeAttachment = (name: string) => {
        setAttachments((prev) => prev.filter((file) => file !== name));
    };

    return (
        <form
            onSubmit={submit}
            className="border-border-light space-y-2 border-t p-3"
        >
            {attachments.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                    {attachments.map((file) => (
                        <li
                            key={file}
                            className="bg-background border-border-light text-text-secondary flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs"
                        >
                            <Paperclip size={12} strokeWidth={1.5} />
                            <span className="max-w-40 truncate">{file}</span>
                            <button
                                type="button"
                                onClick={() => removeAttachment(file)}
                                aria-label={`Remove ${file}`}
                                className="text-text-muted hover:text-error ease-smooth transition-colors"
                            >
                                <X size={12} strokeWidth={1.5} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex items-center gap-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFiles}
                    aria-hidden="true"
                    tabIndex={-1}
                />
                <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    aria-label="Attach file"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Paperclip size={12} strokeWidth={1.5} />
                </Button>
                <Input
                    id="message-composer"
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
                    <Send size={12} strokeWidth={1.5} />
                </Button>
            </div>
        </form>
    );
}

function MessageThread({
    conversation,
    messages,
    typing,
    onSend,
    className,
}: {
    conversation?: Conversation;
    messages: Message[];
    typing: boolean;
    onSend: (content: string, attachments: string[]) => void;
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
                    <div className="border-border-light flex items-center justify-between gap-3 border-b px-3 py-2.5">
                        <div className="flex min-w-0 items-center gap-3">
                            <AvatarTile
                                initials={conversation.avatar}
                                className="size-8"
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
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        {typing && (
                            <TypingIndicator initials={conversation.avatar} />
                        )}
                    </div>

                    <MessageComposer onSend={onSend} />
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

export default function MessagesPage() {
    const [conversations, setConversations] =
        useState<Conversation[]>(initialConversations);
    const [threads, setThreads] =
        useState<Record<string, Message[]>>(initialThreads);
    const [selectedId, setSelectedId] = useState("1");
    const [query, setQuery] = useState("");
    const [typingId, setTypingId] = useState<string | null>(null);
    const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (replyTimer.current) clearTimeout(replyTimer.current);
        },
        [],
    );

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (!needle) return conversations;
        return conversations.filter((conversation) =>
            [
                conversation.agent,
                conversation.agentTitle,
                conversation.lastMessage,
            ].some((field) => field.toLowerCase().includes(needle)),
        );
    }, [conversations, query]);

    const selected = conversations.find(
        (conversation) => conversation.id === selectedId,
    );
    const messages = threads[selectedId] ?? [];
    const unreadTotal = conversations.reduce(
        (total, conversation) => total + conversation.unread,
        0,
    );

    const selectConversation = (id: string) => {
        setSelectedId(id);
        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === id
                    ? { ...conversation, unread: 0 }
                    : conversation,
            ),
        );
    };

    const send = (content: string, attachments: string[]) => {
        const conversationId = selectedId;
        const timestamp = clockTime();
        const outgoing: Message = {
            id: `${conversationId}-u-${Date.now()}`,
            senderRole: "user",
            content,
            timestamp,
            avatar: USER_AVATAR,
            attachments: attachments.length > 0 ? attachments : undefined,
        };

        setThreads((prev) => ({
            ...prev,
            [conversationId]: [...(prev[conversationId] ?? []), outgoing],
        }));
        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === conversationId
                    ? {
                          ...conversation,
                          lastMessage: content,
                          lastMessageTime: "just now",
                          unread: 0,
                      }
                    : conversation,
            ),
        );

        setTypingId(conversationId);
        if (replyTimer.current) clearTimeout(replyTimer.current);
        replyTimer.current = setTimeout(() => {
            const agent = initialConversations.find(
                (conversation) => conversation.id === conversationId,
            );
            const reply: Message = {
                id: `${conversationId}-a-${Date.now()}`,
                senderRole: "agent",
                content:
                    "Thanks for the update — let me confirm the details and come right back to you.",
                timestamp: clockTime(),
                avatar: agent?.avatar ?? "SC",
            };
            setThreads((prev) => ({
                ...prev,
                [conversationId]: [...(prev[conversationId] ?? []), reply],
            }));
            setConversations((prev) =>
                prev.map((conversation) =>
                    conversation.id === conversationId
                        ? {
                              ...conversation,
                              lastMessage: reply.content,
                              lastMessageTime: "just now",
                          }
                        : conversation,
                ),
            );
            setTypingId(null);
        }, AGENT_REPLY_DELAY);
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="Messages"
                description={`${unreadTotal} unread message${
                    unreadTotal !== 1 ? "s" : ""
                }`}
            />

            <div className="grid grid-cols-1 gap-3 lg:h-150 lg:grid-cols-3">
                <ConversationList
                    items={filtered}
                    selectedId={selectedId}
                    query={query}
                    onQueryChange={setQuery}
                    onSelect={selectConversation}
                    className="lg:col-span-1"
                />
                <MessageThread
                    conversation={selected}
                    messages={messages}
                    typing={typingId === selectedId}
                    onSend={send}
                    className="lg:col-span-2"
                />
            </div>
        </div>
    );
}
