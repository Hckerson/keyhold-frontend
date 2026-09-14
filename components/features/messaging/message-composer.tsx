"use client";

import { useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/forms/input";
import { ComposerAttachments } from "@/components/features/messaging/composer-attachments";
import { MESSAGE_ATTACHMENTS } from "@/lib/config/message-attachments";
import { screenFiles } from "@/lib/data/file-upload";
import { cn } from "@/lib/utils";

const ATTACH_LABEL = "Attach files";
const SEND_LABEL = "Send message";

export interface MessageComposerProps {
    onSend: (content: string, files: File[]) => void;
    inputLabel: string;
    placeholder: string;
    variant?: "thread" | "panel";
    inputId?: string;
    attachable?: boolean;
}

export function MessageComposer({
    onSend,
    inputLabel,
    placeholder,
    variant = "thread",
    inputId,
    attachable = false,
}: MessageComposerProps) {
    const [text, setText] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [rejected, setRejected] = useState<string>();
    const fileRef = useRef<HTMLInputElement>(null);
    const isThread = variant === "thread";

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmed = text.trim();
        if (!trimmed && files.length === 0) return;

        onSend(trimmed || MESSAGE_ATTACHMENTS.fallbackContent(files.length), [
            ...files,
        ]);
        setText("");
        setFiles([]);
        setRejected(undefined);
    };

    const take = (incoming: File[]) => {
        const room = MESSAGE_ATTACHMENTS.maxFiles - files.length;
        const screening = screenFiles(
            incoming.slice(0, Math.max(room, 0)),
            MESSAGE_ATTACHMENTS.accept,
            MESSAGE_ATTACHMENTS.maxBytes,
        );
        setRejected(screening.rejected[0]);
        if (screening.accepted.length > 0)
            setFiles((current) => [...current, ...screening.accepted]);
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

    const attachButton = attachable && (
        <>
            <Button
                emphasis="quiet"
                tone="neutral"
                iconOnly
                type="button"
                aria-label={ATTACH_LABEL}
                disabled={files.length >= MESSAGE_ATTACHMENTS.maxFiles}
                onClick={() => fileRef.current?.click()}
                className="shrink-0"
            >
                <Paperclip
                    className="size-3"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            </Button>
            <input
                ref={fileRef}
                type="file"
                multiple
                accept={MESSAGE_ATTACHMENTS.accept}
                aria-label={ATTACH_LABEL}
                className="sr-only"
                onChange={(event) => {
                    take(Array.from(event.target.files ?? []));
                    event.target.value = "";
                }}
            />
        </>
    );

    const sendButton = (
        <Button
            emphasis="solid"
            tone="accent"
            iconOnly
            type="submit"
            aria-label={SEND_LABEL}
            className={cn(!isThread && "shrink-0")}
        >
            <Send className="size-3" strokeWidth={1.5} aria-hidden="true" />
        </Button>
    );

    return (
        <form
            onSubmit={submit}
            className={cn(
                "border-border-light flex flex-col gap-2 border-t",
                isThread ? "p-3" : "pt-3",
            )}
        >
            <ComposerAttachments
                files={files}
                onRemove={(index) =>
                    setFiles((current) =>
                        current.filter((_, at) => at !== index),
                    )
                }
            />

            {rejected && <p className="text-error text-xs">{rejected}</p>}

            <div className="flex items-center gap-2">
                {messageInput}
                {attachButton}
                {sendButton}
            </div>
        </form>
    );
}

MessageComposer.displayName = "MessageComposer";
