import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import { DeckFigure } from "@/components/patterns/deck-figure";
import { DeckPanel } from "@/components/patterns/deck-panel";
import { ShareList } from "@/components/patterns/share-list";
import type { ShareDatum } from "@/components/patterns/share-row";
import { PanelLink } from "@/components/features/shared/panel-link";
import { RoleTally } from "@/components/features/admin/role-tally";
import { ADMIN_ROUTES, NO_READING } from "@/lib/constants";
import { formatCount } from "@/lib/utils";
import type { UserStats } from "@/lib/validations/stats";

const TITLE = "Members";
const ACTION = "Users";
const LOADING_READING = "Reading the member directory";
const ROLES_UNAVAILABLE = "Role mix unavailable";

export interface AdminOverviewPeopleProps {
    users: UserStats | undefined;
    statuses: ShareDatum[];
    roles: DonutSegment[];
    coverage: string | null;
    pending?: boolean;
    failed?: boolean;
}

export function AdminOverviewPeople({
    users,
    statuses,
    roles,
    coverage,
    pending,
    failed,
}: AdminOverviewPeopleProps) {
    return (
        <DeckPanel
            title={TITLE}
            action={<PanelLink href={ADMIN_ROUTES.users} label={ACTION} />}
            pending={pending}
        >
            <DeckFigure
                value={users ? formatCount(users.total) : NO_READING}
                caption={
                    coverage ?? (failed ? ROLES_UNAVAILABLE : LOADING_READING)
                }
                pending={pending}
            />
            <ShareList shares={statuses} />
            <div className="mt-auto">
                <RoleTally roles={roles} unknown={coverage === null} />
            </div>
        </DeckPanel>
    );
}

AdminOverviewPeople.displayName = "AdminOverviewPeople";
