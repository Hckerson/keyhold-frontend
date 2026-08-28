import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AudienceMix } from "@/components/features/admin/audience-mix";
import { ModerationQueueTable } from "@/components/features/admin/moderation-queue-table";
import { openBacklog } from "@/lib/data/admin-overview";
import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import type { ModerationQueueLoad } from "@/lib/types";
import { formatCount } from "@/lib/utils";

const QUEUE_TITLE = "Moderation Load";
const QUEUE_LEDE = "Backlog against reviewer capacity";
const QUEUE_ACTION = "Listings";
const AUDIENCE_TITLE = "Audience";
const AUDIENCE_ACTION = "Users";
const STATUS_LABEL = "By account status";

export interface AdminOverviewRailProps {
    roles: DonutSegment[];
    statuses: DonutSegment[];
    total: number;
    queues: ModerationQueueLoad[];
}

export function AdminOverviewRail({
    roles,
    statuses,
    total,
    queues,
}: AdminOverviewRailProps) {
    return (
        <div className="flex flex-col gap-3">
            <Panel
                title={QUEUE_TITLE}
                description={QUEUE_LEDE}
                count={openBacklog(queues)}
                action={
                    <PanelLink href="/admin/listings" label={QUEUE_ACTION} />
                }
            >
                <PanelInset scroll>
                    <ModerationQueueTable queues={queues} />
                </PanelInset>
            </Panel>

            <Panel
                title={AUDIENCE_TITLE}
                action={
                    <PanelLink href="/admin/users" label={AUDIENCE_ACTION} />
                }
            >
                <AudienceMix
                    roles={roles}
                    tiers={statuses}
                    total={formatCount(total)}
                    tierLabel={STATUS_LABEL}
                />
            </Panel>
        </div>
    );
}

AdminOverviewRail.displayName = "AdminOverviewRail";
