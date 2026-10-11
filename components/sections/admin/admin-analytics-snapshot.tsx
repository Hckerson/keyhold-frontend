import { AnalyticsPanel } from "@/components/features/admin/analytics-panel";
import { ANALYTICS_PANELS } from "@/lib/config/admin-analytics";
import type {
    AnalyticsPanelId,
    AnalyticsSnapshot,
    QueueReadiness,
} from "@/lib/types";

export interface AdminAnalyticsSnapshotProps {
    snapshot: AnalyticsSnapshot;
    readiness: Record<AnalyticsPanelId, QueueReadiness>;
}

export function AdminAnalyticsSnapshot({
    snapshot,
    readiness,
}: AdminAnalyticsSnapshotProps) {
    return (
        <div className="console-split gap-3">
            {ANALYTICS_PANELS.map((meta) => (
                <AnalyticsPanel
                    key={meta.id}
                    meta={meta}
                    data={snapshot[meta.id]}
                    readiness={readiness[meta.id]}
                />
            ))}
        </div>
    );
}

AdminAnalyticsSnapshot.displayName = "AdminAnalyticsSnapshot";
