import { Avatar } from "@/components/ui/avatar";

export interface TypingIndicatorProps {
    initials: string;
}

export function TypingIndicator({ initials }: TypingIndicatorProps) {
    return (
        <div className="flex items-center gap-2.5" aria-live="polite">
            <Avatar
                size="xs"
                tone="accent"
                elevated={false}
                initials={initials}
            />
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
