import { cn } from "@/lib/utils";
import type { StatusTone } from "@/lib/types";

const toneClass: Record<StatusTone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info",
    neutral: "bg-text-muted",
};

export function StatusDot({
    tone,
    className,
}: {
    tone: StatusTone;
    className?: string;
}) {
    return (
        <span
            aria-hidden
            className={cn(
                "inline-block size-1.5 shrink-0 rounded-full",
                toneClass[tone],
                className,
            )}
        />
    );
}
