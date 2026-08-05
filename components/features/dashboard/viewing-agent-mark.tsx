import { Avatar } from "@/components/ui/avatar";
import { cn, initialsOf } from "@/lib/utils";

export interface ViewingAgentMarkProps {
    agent: string;
    className?: string;
}

export function ViewingAgentMark({ agent, className }: ViewingAgentMarkProps) {
    return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
            <Avatar
                size="xs"
                tone="accent"
                elevated={false}
                initials={initialsOf(agent)}
                className="size-6 text-[10px]"
            />
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {agent}
            </span>
        </span>
    );
}

ViewingAgentMark.displayName = "ViewingAgentMark";
