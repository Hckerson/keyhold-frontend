import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import type { ReviewQueueItem } from "@/lib/types";

export interface ReviewQueueRowProps {
    item: ReviewQueueItem;
    selected: boolean;
    onSelect: (id: string) => void;
}

export function ReviewQueueRow({
    item,
    selected,
    onSelect,
}: ReviewQueueRowProps) {
    return (
        <button
            type="button"
            aria-current={selected}
            onClick={() => onSelect(item.id)}
            className={cn(
                "ease-smooth focus-visible:ring-accent flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
                selected
                    ? "border-l-accent bg-accent-light"
                    : "hover:bg-background-alt border-l-transparent",
            )}
        >
            <span className="min-w-0 flex-1">
                <span className="text-text block truncate text-xs">
                    {item.title}
                </span>
                <span className="text-text-muted mt-0.5 block truncate text-xs">
                    {item.caption}
                </span>
            </span>
            {item.status && (
                <StatusBadge tone={item.status.tone}>
                    {item.status.label}
                </StatusBadge>
            )}
            <span className="text-text-secondary shrink-0 font-mono text-[10px] tabular-nums">
                {item.moment}
            </span>
        </button>
    );
}

ReviewQueueRow.displayName = "ReviewQueueRow";
