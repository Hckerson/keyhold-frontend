import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AudienceMix } from "@/components/features/admin/audience-mix";
import { ModerationQueueTable } from "@/components/features/admin/moderation-queue-table";
import { MODERATION_LOAD, OPEN_BACKLOG } from "@/lib/data/admin-overview";
import type { DonutSegment } from "@/components/ui/charts/donut-chart";
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
}

export function AdminOverviewRail({
    roles,
    statuses,
    total,
}: AdminOverviewRailProps) {
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
                <PanelInset scroll>
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
                    roles={roles}
                    segments={statuses}
                    total={formatCount(total)}
                    segmentLabel={STATUS_LABEL}
                />
            </Panel>
        </div>
    );
}

AdminOverviewRail.displayName = "AdminOverviewRail";
