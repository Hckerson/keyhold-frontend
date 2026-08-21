import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { ShareList } from "@/components/patterns/share-list";
import { UserBreakdownTable } from "@/components/features/admin/user-breakdown-table";
import { cohortBreakdowns, roleShares } from "@/lib/data/admin-users";
import type { ManagedUser } from "@/lib/types";

const ROLE_TITLE = "Role Mix";
const ROLE_LEDE = "How the directory splits across the three account types";
const COHORT_TITLE = "Joining Cohorts";
const COHORT_CAPTION =
    "Sign-up years by accounts held, closed deals and lifetime volume";
const COHORT_GROUP = "Joined";
const COHORT_ACTION = "Reports";

export interface AdminUsersRailProps {
    users: ManagedUser[];
}

export function AdminUsersRail({ users }: AdminUsersRailProps) {
    const cohorts = cohortBreakdowns(users);

    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={ROLE_TITLE}
                description={ROLE_LEDE}
                count={users.length}
            >
                <PanelInset>
                    <ShareList shares={roleShares(users)} />
                </PanelInset>
            </Panel>

            <Panel
                title={COHORT_TITLE}
                count={cohorts.length}
                action={
                    <PanelLink href="/admin/reports" label={COHORT_ACTION} />
                }
            >
                <PanelInset scroll>
                    <UserBreakdownTable
                        groupLabel={COHORT_GROUP}
                        breakdowns={cohorts}
                        caption={COHORT_CAPTION}
                    />
                </PanelInset>
            </Panel>
        </div>
    );
}

AdminUsersRail.displayName = "AdminUsersRail";
