import { AnalyticsPanel } from "@/components/features/admin/analytics-panel";
import { ANALYTICS_PANELS } from "@/lib/config/admin-analytics";
import type { AnalyticsPanelId, AnalyticsSnapshot } from "@/lib/types";

export interface AdminAnalyticsSnapshotProps {
    snapshot: AnalyticsSnapshot;
    pending: Record<AnalyticsPanelId, boolean>;
}

export function AdminAnalyticsSnapshot({
    snapshot,
    pending,
}: AdminAnalyticsSnapshotProps) {
    return (
        <div className="console-split gap-3">
            {ANALYTICS_PANELS.map((meta) => (
                <AnalyticsPanel
                    key={meta.id}
                    meta={meta}
                    data={snapshot[meta.id]}
                    pending={pending[meta.id]}
                />
            ))}
        </div>
    );
}

AdminAnalyticsSnapshot.displayName = "AdminAnalyticsSnapshot";
