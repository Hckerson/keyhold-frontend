import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfigValueMarkProps {
    from: string;
    to: string;
    className?: string;
}

export function ConfigValueMark({ from, to, className }: ConfigValueMarkProps) {
    return (
        <span
            className={cn(
                "flex min-w-0 items-center justify-end gap-1",
                className,
            )}
        >
            <span className="text-text-muted min-w-0 truncate text-xs tabular-nums line-through">
                {from}
            </span>
            <ArrowRight
                className="text-text-muted size-3 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
            />
            <span className="text-text min-w-0 truncate text-xs font-semibold tabular-nums">
                {to}
            </span>
        </span>
    );
}

ConfigValueMark.displayName = "ConfigValueMark";
