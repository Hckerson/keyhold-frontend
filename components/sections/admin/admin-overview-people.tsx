import { RegisterSection } from "@/components/patterns/register-section";
import { ShareBar } from "@/components/patterns/share-bar";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AuditTape } from "@/components/features/admin/audit-tape";
import { ADMIN_ROUTES } from "@/lib/constants";
import { peopleReading } from "@/lib/data/admin-overview-people";
import { formatCount } from "@/lib/utils";
import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import type { AuditEvent } from "@/lib/types";
import type { UserStats } from "@/lib/validations/stats";

const INDEX = "04";
const TITLE = "People";
const ACTION = "Users";
const ROLE_LABEL = "By role";
const UNKNOWN = "—";

export interface AdminOverviewPeopleProps {
    users: UserStats | undefined;
    roles: DonutSegment[];
    events: AuditEvent[];
    recordSummary: string;
    eventsPending?: boolean;
    eventsFailed?: boolean;
    pending?: boolean;
}

export function AdminOverviewPeople({
    users,
    roles,
    events,
    recordSummary,
    eventsPending,
    eventsFailed,
    pending,
}: AdminOverviewPeopleProps) {
    return (
        <RegisterSection
            index={INDEX}
            title={TITLE}
            figure={users ? formatCount(users.total) : UNKNOWN}
            reading={peopleReading(users)}
            action={<PanelLink href={ADMIN_ROUTES.users} label={ACTION} />}
            pending={pending}
        >
            <div className="panel-pair gap-4">
                <ShareBar label={ROLE_LABEL} segments={roles} />
                <AuditTape
                    events={events}
                    summary={recordSummary}
                    pending={eventsPending}
                    failed={eventsFailed}
                />
            </div>
        </RegisterSection>
    );
}

AdminOverviewPeople.displayName = "AdminOverviewPeople";
