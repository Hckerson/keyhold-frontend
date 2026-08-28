"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/forms/input";
import { cn } from "@/lib/utils";

export interface MessageComposerProps {
    onSend: (content: string) => void;
    inputLabel: string;
    placeholder: string;
    variant?: "thread" | "panel";
    inputId?: string;
}

export function MessageComposer({
    onSend,
    inputLabel,
    placeholder,
    variant = "thread",
    inputId,
}: MessageComposerProps) {
    const [text, setText] = useState("");
    const isThread = variant === "thread";

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText("");
    };

    const messageInput = (
        <Input
            id={inputId}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={placeholder}
            aria-label={inputLabel}
            className={cn(isThread && "flex-1")}
        />
    );

    const sendButton = (
        <Button
            variant="primary"
            size="sm"
            iconOnly
            type="submit"
            aria-label="Send message"
            className={cn(!isThread && "shrink-0")}
        >
            <Send className="size-3" strokeWidth={1.5} aria-hidden="true" />
        </Button>
    );

    if (!isThread) {
        return (
            <form
                onSubmit={submit}
                className="border-border-light flex items-center gap-2 border-t pt-3"
            >
                {messageInput}
                {sendButton}
            </form>
        );
    }

    return (
        <form
            onSubmit={submit}
            className="border-border-light flex items-center gap-2 border-t p-3"
        >
            {messageInput}
            {sendButton}
        </form>
    );
}

MessageComposer.displayName = "MessageComposer";
