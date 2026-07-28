import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ModerationQueueItem } from "@/lib/data/admin-overview";

export function ModerationQueueList({
    items,
}: {
    items: ModerationQueueItem[];
}) {
    return (
        <ul className="divide-border-light divide-y">
            {items.map((item) => (
                <li key={item.label}>
                    <Link
                        href={item.href}
                        className="hover:bg-background-alt ease-smooth -mx-2 flex items-center gap-2 rounded-lg px-2 py-2.5 transition-colors"
                    >
                        <item.icon
                            size={12}
                            strokeWidth={1.5}
                            className="text-text-muted shrink-0"
                        />
                        <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                            {item.label}
                        </span>
                        <StatusBadge tone={item.tone}>{item.value}</StatusBadge>
                        <ChevronRight
                            size={12}
                            strokeWidth={1.5}
                            className="text-text-muted shrink-0"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}

ModerationQueueList.displayName = "ModerationQueueList";
