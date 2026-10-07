import { AgeMark } from "@/components/features/shared/age-mark";
import { cn } from "@/lib/utils";
import type { AuditEvent } from "@/lib/types";

const LIST_LABEL = "Recent recorded actions by this account";

export interface UserActivityListProps {
    events: AuditEvent[];
}

export function UserActivityList({ events }: UserActivityListProps) {
    return (
        <ul aria-label={LIST_LABEL} className="divide-border-light divide-y">
            {events.map((event) => (
                <li
                    key={event.id}
                    className="flex h-10 items-center gap-3 text-xs"
                >
                    <span
                        className={cn(
                            "min-w-0 flex-1 truncate font-medium",
                            event.security ? "text-error" : "text-text",
                        )}
                    >
                        {event.action}
                    </span>
                    <span className="micro-label shrink-0">
                        {event.subject}
                    </span>
                    <AgeMark
                        minutes={event.ageMinutes}
                        tone="neutral"
                        className="w-10 shrink-0 text-right"
                    />
                </li>
            ))}
        </ul>
    );
}

UserActivityList.displayName = "UserActivityList";
