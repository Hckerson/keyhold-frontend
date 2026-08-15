import Link from "next/link";
import { MODERATION_QUEUES } from "@/lib/config/admin-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ModerationQueueId } from "@/lib/types";

export interface ModerationQueueMarkProps {
    id: ModerationQueueId;
    className?: string;
}

export function ModerationQueueMark({
    id,
    className,
}: ModerationQueueMarkProps) {
    const { icon: Icon, label, href, tone } = MODERATION_QUEUES[id];

    return (
        <Link
            href={href}
            className={cn(
                "hover:text-accent ease-smooth flex min-w-0 items-center gap-2 transition-colors",
                className,
            )}
        >
            <span
                className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-md",
                    chartToneSoft[tone],
                )}
            >
                <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="text-text min-w-0 truncate text-xs font-medium">
                {label}
            </span>
        </Link>
    );
}

ModerationQueueMark.displayName = "ModerationQueueMark";
