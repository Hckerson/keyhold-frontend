import { ScrollText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditEventRow } from "@/components/features/admin/audit-event-row";
import type { AuditEvent } from "@/lib/types";

const TAPE_TITLE = "Latest recorded actions";
const SKELETON_ROWS = 4;
const EMPTY_TITLE = "Nothing recorded yet";
const EMPTY_LEDE = "Sign-ins, moderation and settings changes land here.";
const ERROR_TITLE = "Audit log unavailable";
const ERROR_LEDE = "The record service did not answer this time.";

export interface AuditTapeProps {
    events: AuditEvent[];
    summary: string;
    pending?: boolean;
    failed?: boolean;
}

export function AuditTape({ events, summary, pending, failed }: AuditTapeProps) {
    if (failed || (!pending && events.length === 0))
        return (
            <EmptyState
                icon={ScrollText}
                title={failed ? ERROR_TITLE : EMPTY_TITLE}
                description={failed ? ERROR_LEDE : EMPTY_LEDE}
            />
        );

    return (
        <section aria-label={TAPE_TITLE} aria-busy={pending || undefined}>
            <header className="flex h-9 items-center gap-3">
                <h3 className="micro-label shrink-0">{TAPE_TITLE}</h3>
                {!pending && (
                    <span className="text-text-secondary truncate text-xs">
                        {summary}
                    </span>
                )}
            </header>
            <ul className="divide-border-light border-border-light divide-y border-t">
                {pending
                    ? Array.from({ length: SKELETON_ROWS }, (_, index) => (
                          <li key={index} className="flex h-11 items-center">
                              <Skeleton className="h-3 w-full" />
                          </li>
                      ))
                    : events.map((event) => (
                          <AuditEventRow key={event.id} event={event} />
                      ))}
            </ul>
        </section>
    );
}

AuditTape.displayName = "AuditTape";
