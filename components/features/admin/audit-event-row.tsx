import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/patterns/status-dot";
import { AgeMark } from "@/components/features/shared/age-mark";
import type { AuditEvent } from "@/lib/types";

export interface AuditEventRowProps {
    event: AuditEvent;
}

export function AuditEventRow({ event }: AuditEventRowProps) {
    return (
        <li className="flex h-11 items-center gap-3">
            <Avatar
                size="sm"
                elevated={false}
                initials={event.initials}
                alt={event.actor}
            />
            <span className="flex w-36 shrink-0 items-center gap-2">
                <StatusDot tone={event.tone} />
                <span className="text-text truncate text-xs font-semibold">
                    {event.action}
                </span>
            </span>
            <span className="text-text-secondary min-w-0 flex-1 truncate text-xs">
                {event.actor}
            </span>
            <span className="micro-label w-20 shrink-0 truncate text-right">
                {event.subject}
            </span>
            <AgeMark
                minutes={event.ageMinutes}
                tone="neutral"
                className="w-10 shrink-0 text-right"
            />
        </li>
    );
}

AuditEventRow.displayName = "AuditEventRow";
