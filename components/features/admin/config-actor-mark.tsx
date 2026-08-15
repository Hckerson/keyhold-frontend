import { cn } from "@/lib/utils";
import type { ConfigChange } from "@/lib/types";

const SEPARATOR = "·";

export interface ConfigActorMarkProps {
    change: Pick<ConfigChange, "actor" | "role">;
    className?: string;
}

export function ConfigActorMark({ change, className }: ConfigActorMarkProps) {
    return (
        <span className={cn("flex min-w-0 items-baseline gap-1", className)}>
            <span className="text-text-secondary min-w-0 truncate text-xs">
                {change.actor}
            </span>
            <span className="text-text-muted shrink-0 text-[10px]">
                {SEPARATOR} {change.role}
            </span>
        </span>
    );
}

ConfigActorMark.displayName = "ConfigActorMark";
