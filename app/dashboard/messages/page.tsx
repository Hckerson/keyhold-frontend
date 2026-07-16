"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
    id: string;
    sender: string;
    senderRole: "user" | "agent";
    content: string;
    timestamp: string;
    avatar: string;
}

interface Conversation {
    id: string;
    agent: string;
    agentTitle: string;
    agentAvatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
}

const conversations: Conversation[] = [
    {
        id: "1",
        agent: "Sarah Chen",
        agentTitle: "Senior Real Estate Agent",
        agentAvatar: "SC",
        lastMessage:
            "I can arrange the viewing for tomorrow at 2 PM if that works for you",
        lastMessageTime: "2 hours ago",
        unread: 1,
    },
    {
        id: "2",
        agent: "Michael Rodriguez",
        agentTitle: "Real Estate Concierge",
        agentAvatar: "MR",
        lastMessage: "Your offer has been accepted! Congratulations!",
        lastMessageTime: "5 hours ago",
        unread: 0,
    },
    {
        id: "3",
        agent: "Jennifer Martinez",
        agentTitle: "Property Manager",
        agentAvatar: "JM",
        lastMessage: "Here are the updated inspection reports...",
        lastMessageTime: "1 day ago",
        unread: 0,
    },
];

const sampleMessages: Message[] = [
    {
        id: "1",
        sender: "Sarah Chen",
        senderRole: "agent",
        content:
            "Hello! I saw your interest in 456 Oak Avenue. Would you like to schedule a viewing?",
        timestamp: "10:30 AM",
        avatar: "SC",
    },
    {
        id: "2",
        sender: "You",
        senderRole: "user",
        content: "Yes, I would love to see it! What times are available?",
        timestamp: "10:45 AM",
        avatar: "JD",
    },
    {
        id: "3",
        sender: "Sarah Chen",
        senderRole: "agent",
        content:
            "I can arrange the viewing for tomorrow at 2 PM if that works for you. The property is absolutely stunning!",
        timestamp: "2 hours ago",
        avatar: "SC",
    },
];

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] =
        useState<string>("1");
    const [messageText, setMessageText] = useState("");

    const selected = conversations.find((c) => c.id === selectedConversation);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageText.trim()) {
            setMessageText("");
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-h3 font-display text-text font-light">
                    Messages
                </h1>
                <p className="text-text-secondary mt-2">
                    Chat with your real estate agents and concierge
                </p>
            </div>

            <div className="grid h-[600px] grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="flex flex-col lg:col-span-1">
                    <CardContent className="flex h-full flex-col p-0">
                        <div className="border-border border-b p-4">
                            <h2 className="text-text text-sm font-medium">
                                Conversations
                            </h2>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {conversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() =>
                                        setSelectedConversation(conversation.id)
                                    }
                                    className={`border-border hover:bg-primary-dark w-full border-b px-4 py-4 text-left transition-colors ${
                                        selectedConversation === conversation.id
                                            ? "bg-primary-dark border-l-accent border-l-2"
                                            : ""
                                    }`}
                                >
                                    <div className="mb-2 flex items-start justify-between">
                                        <p className="text-text text-sm font-medium">
                                            {conversation.agent}
                                        </p>
                                        {conversation.unread > 0 && (
                                            <span className="bg-accent rounded-full px-2 py-0.5 text-xs text-white">
                                                {conversation.unread}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-text-secondary mb-2 text-xs">
                                        {conversation.agentTitle}
                                    </p>
                                    <p className="text-text-secondary line-clamp-2 text-xs">
                                        {conversation.lastMessage}
                                    </p>
                                    <p className="text-text-secondary/50 mt-2 text-xs">
                                        {conversation.lastMessageTime}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex flex-col lg:col-span-2">
                    {selected ? (
                        <>
                            <div className="border-border flex items-center justify-between border-b p-4">
                                <div>
                                    <h2 className="text-text text-sm font-medium">
                                        {selected.agent}
                                    </h2>
                                    <p className="text-text-secondary mt-1 text-xs">
                                        {selected.agentTitle}
                                    </p>
                                </div>
                                <Button
                                    variant="secondary"
                                    className="h-8 text-xs"
                                >
                                    Call
                                </Button>
                            </div>

                            <div className="flex-1 space-y-4 overflow-y-auto p-4">
                                {sampleMessages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.senderRole === "user" ? "flex-row-reverse" : ""}`}
                                    >
                                        <div className="bg-accent/20 text-accent flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                                            {message.avatar}
                                        </div>
                                        <div
                                            className={`flex max-w-xs flex-col gap-1 ${
                                                message.senderRole === "user"
                                                    ? "items-end"
                                                    : "items-start"
                                            }`}
                                        >
                                            <div
                                                className={`rounded-lg px-4 py-2 text-sm ${
                                                    message.senderRole ===
                                                    "user"
                                                        ? "bg-accent text-white"
                                                        : "bg-primary-dark border-border text-text border"
                                                }`}
                                            >
                                                {message.content}
                                            </div>
                                            <span className="text-text-secondary text-xs">
                                                {message.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-border border-t p-4">
                                <form
                                    onSubmit={handleSendMessage}
                                    className="flex gap-2"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={messageText}
                                        onChange={(e) =>
                                            setMessageText(e.target.value)
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="h-10 px-4 text-xs"
                                    >
                                        Send
                                    </Button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <CardContent className="flex h-full items-center justify-center">
                            <p className="text-text-secondary">
                                Select a conversation to start messaging
                            </p>
                        </CardContent>
                    )}
                </Card>
            </div>
        </div>
    );
}
