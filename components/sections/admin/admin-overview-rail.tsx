import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AudienceMix } from "@/components/features/admin/audience-mix";
import { ModerationQueueTable } from "@/components/features/admin/moderation-queue-table";
import { MODERATION_LOAD, OPEN_BACKLOG } from "@/lib/data/admin-overview";
import {
    TOTAL_USERS,
    USER_ROLE_SEGMENTS,
    USER_TIER_SEGMENTS,
} from "@/lib/data/admin-users";
import { formatCount } from "@/lib/utils";

const QUEUE_TITLE = "Moderation Load";
const QUEUE_LEDE = "Backlog against reviewer capacity";
const QUEUE_ACTION = "Listings";
const AUDIENCE_TITLE = "Audience";
const AUDIENCE_ACTION = "Users";
const TIER_LABEL = "By tier";

export function AdminOverviewRail() {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={QUEUE_TITLE}
                description={QUEUE_LEDE}
                count={OPEN_BACKLOG}
                action={
                    <PanelLink href="/admin/listings" label={QUEUE_ACTION} />
                }
            >
                <PanelInset flush>
                    <ModerationQueueTable queues={MODERATION_LOAD} />
                </PanelInset>
            </Panel>

            <Panel
                title={AUDIENCE_TITLE}
                action={
                    <PanelLink href="/admin/users" label={AUDIENCE_ACTION} />
                }
                bodyClassName="pt-3"
            >
                <AudienceMix
                    roles={USER_ROLE_SEGMENTS}
                    tiers={USER_TIER_SEGMENTS}
                    total={formatCount(TOTAL_USERS)}
                    tierLabel={TIER_LABEL}
                />
            </Panel>
        </div>
    );
}

AdminOverviewRail.displayName = "AdminOverviewRail";
