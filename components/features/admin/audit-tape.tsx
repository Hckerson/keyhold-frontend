import { ScrollText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditEventRow } from "@/components/features/admin/audit-event-row";
import { RECORD_WINDOW } from "@/lib/data/admin-overview-people";
import type { AuditEvent } from "@/lib/types";
const EMPTY_TITLE = "Nothing recorded yet";
const EMPTY_LEDE = "Sign-ins, moderation and settings changes land here.";
const ERROR_TITLE = "Audit log unavailable";
const ERROR_LEDE = "The record service did not answer this time.";

export interface AuditTapeProps {
    events: AuditEvent[];
    pending?: boolean;
    failed?: boolean;
}

export function AuditTape({ events, pending, failed }: AuditTapeProps) {
    if (failed || (!pending && events.length === 0))
        return (
            <EmptyState
                icon={ScrollText}
                title={failed ? ERROR_TITLE : EMPTY_TITLE}
                description={failed ? ERROR_LEDE : EMPTY_LEDE}
            />
        );

    return (
        <ul
            aria-busy={pending || undefined}
            className="divide-border-light divide-y"
        >
            {pending
                ? Array.from({ length: RECORD_WINDOW }, (_, index) => (
                      <li key={index} className="flex h-11 items-center">
                          <Skeleton className="h-3 w-full" />
                      </li>
                  ))
                : events.map((event) => (
                      <AuditEventRow key={event.id} event={event} />
                  ))}
        </ul>
    );
}

AuditTape.displayName = "AuditTape";
