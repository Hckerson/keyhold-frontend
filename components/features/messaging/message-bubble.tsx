import { Paperclip } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface MessageBubbleProps {
    content: string;
    caption: string;
    isUser: boolean;
    variant?: "thread" | "panel";
    avatarInitials?: string;
    attachments?: string[];
}

export function MessageBubble({
    content,
    caption,
    isUser,
    variant = "thread",
    avatarInitials,
    attachments,
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
                    {attachments && attachments.length > 0 && (
                        <ul className="mt-2 flex flex-col gap-1">
                            {attachments.map((file) => (
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
                <span className="text-text-muted text-xs">{caption}</span>
            </div>
        </Wrapper>
    );
}
