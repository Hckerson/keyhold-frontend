import { DeckPanel } from "@/components/patterns/deck-panel";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AuditTape } from "@/components/features/admin/audit-tape";
import { ADMIN_ROUTES } from "@/lib/constants";
import type { AuditEvent } from "@/lib/types";

const TITLE = "Activity";
const ACTION = "Reports";

export interface AdminOverviewActivityProps {
    events: AuditEvent[];
    summary: string;
    pending?: boolean;
    failed?: boolean;
}

export function AdminOverviewActivity({
    events,
    summary,
    pending,
    failed,
}: AdminOverviewActivityProps) {
    return (
        <DeckPanel
            title={TITLE}
            summary={pending || failed ? undefined : summary}
            action={<PanelLink href={ADMIN_ROUTES.reports} label={ACTION} />}
            pending={pending}
        >
            <AuditTape events={events} pending={pending} failed={failed} />
        </DeckPanel>
    );
}

AdminOverviewActivity.displayName = "AdminOverviewActivity";
