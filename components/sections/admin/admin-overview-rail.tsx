import { ShieldCheck } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { EmptyState } from "@/components/ui/empty-state";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AudienceMix } from "@/components/features/admin/audience-mix";
import { DecisionQueueList } from "@/components/features/admin/decision-queue-list";
import { decisionQueues, openBacklog } from "@/lib/data/admin-overview";
import type { DonutSegment } from "@/components/ui/charts/donut-chart";
import type { ModerationQueueLoad } from "@/lib/types";

const QUEUE_TITLE = "Needs a Decision";
const QUEUE_LEDE = "Open items by queue, oldest first";
const QUEUE_EMPTY = "Nothing waiting on a decision";
const QUEUE_EMPTY_LEDE = "Every moderation queue is clear.";
const AUDIENCE_TITLE = "Audience";
const AUDIENCE_ACTION = "Users";
const STATUS_LABEL = "By account status";

export interface AdminOverviewRailProps {
    roles: DonutSegment[];
    statuses: DonutSegment[];
    queues: ModerationQueueLoad[];
}

export function AdminOverviewRail({
    roles,
    statuses,
    queues,
}: AdminOverviewRailProps) {
    const open = openBacklog(queues);

    return (
        <div className="flex flex-col gap-3">
            <Panel title={QUEUE_TITLE} description={QUEUE_LEDE} count={open}>
                {open > 0 ? (
                    <PanelInset flush>
                        <DecisionQueueList queues={decisionQueues(queues)} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={ShieldCheck}
                        title={QUEUE_EMPTY}
                        description={QUEUE_EMPTY_LEDE}
                    />
                )}
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
                    tierLabel={STATUS_LABEL}
                />
            </Panel>
        </div>
    );
}

AdminOverviewRail.displayName = "AdminOverviewRail";
