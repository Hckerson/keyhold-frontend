"use client";

import { useRef, useState } from "react";
import { Paperclip, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/forms/input";
import { cn } from "@/lib/utils";

const ATTACHMENT_ONLY_CONTENT = "Shared a file";

export interface MessageComposerProps {
    onSend: (content: string, attachments: string[]) => void;
    inputLabel: string;
    placeholder: string;
    attachLabel: string;
    variant?: "thread" | "panel";
    inputId?: string;
}

export function MessageComposer({
    onSend,
    inputLabel,
    placeholder,
    attachLabel,
    variant = "thread",
    inputId,
}: MessageComposerProps) {
    const [text, setText] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isThread = variant === "thread";

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = text.trim();
        if (!trimmed && attachments.length === 0) return;
        onSend(trimmed || ATTACHMENT_ONLY_CONTENT, attachments);
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

    const attachButton = (
        <Button
            variant="secondary"
            size="sm"
            iconOnly
            type="button"
            aria-label={attachLabel}
            className={cn(!isThread && "shrink-0")}
            onClick={isThread ? () => fileInputRef.current?.click() : undefined}
        >
            <Paperclip size={12} strokeWidth={1.5} />
        </Button>
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
            <Send size={12} strokeWidth={1.5} />
        </Button>
    );

    if (!isThread) {
        return (
            <form
                onSubmit={submit}
                className="border-border-light flex items-center gap-2 border-t pt-3"
            >
                {messageInput}
                {attachButton}
                {sendButton}
            </form>
        );
    }

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
                {attachButton}
                {messageInput}
                {sendButton}
            </div>
        </form>
    );
}
