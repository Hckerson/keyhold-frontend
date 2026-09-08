import { Download } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { documentKindOf } from "@/lib/config/conversation-tones";
import { formatBytes } from "@/lib/data/file-upload";
import { cn } from "@/lib/utils";
import type { ThreadDocument } from "@/lib/types/message";

export interface MessageBubbleProps {
    content: string;
    caption: string;
    isUser: boolean;
    variant?: "thread" | "panel";
    avatarInitials?: string;
    documents?: ThreadDocument[];
}

export function MessageBubble({
    content,
    caption,
    isUser,
    variant = "thread",
    avatarInitials,
    documents,
}: MessageBubbleProps) {
    const isThread = variant === "thread";
    const Wrapper = isThread ? "div" : "li";

    return (
        <Wrapper
            className={cn(
                "flex",
                isThread && "gap-2.5",
                isUser && (isThread ? "flex-row-reverse" : "justify-end"),
            )}
        >
            {avatarInitials && (
                <Avatar
                    size="xs"
                    tone="accent"
                    elevated={false}
                    initials={avatarInitials}
                />
            )}
            <div
                className={cn(
                    "flex flex-col gap-1",
                    isThread ? "max-w-[75%]" : "max-w-[80%]",
                    isUser ? "items-end" : "items-start",
                )}
            >
                <div
                    className={cn(
                        "rounded-2xl px-3 py-2 text-xs",
                        isUser
                            ? "bg-accent text-text-inverse rounded-br-sm"
                            : "bg-background border-border-light text-text rounded-bl-sm border",
                    )}
                >
                    {content}
                    {documents && documents.length > 0 && (
                        <ul className="mt-2 flex flex-col gap-1">
                            {documents.map((document) => {
                                const Icon = documentKindOf(
                                    document.mimeType,
                                ).icon;

                                return (
                                    <li key={document.id}>
                                        <a
                                            href={document.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={cn(
                                                "focus-visible:ring-accent ease-smooth flex items-center gap-1.5 rounded-xs text-xs transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:outline-none",
                                                isUser
                                                    ? "text-text-inverse/80"
                                                    : "text-text-secondary",
                                            )}
                                        >
                                            <Icon
                                                className="size-3 shrink-0"
                                                strokeWidth={1.5}
                                                aria-hidden="true"
                                            />
                                            <span className="truncate">
                                                {document.filename}
                                            </span>
                                            <span className="shrink-0 tabular-nums opacity-70">
                                                {formatBytes(
                                                    document.sizeBytes,
                                                )}
                                            </span>
                                            <Download
                                                className="size-3 shrink-0"
                                                strokeWidth={1.5}
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <span className="micro-label">{caption}</span>
            </div>
        </Wrapper>
    );
}
