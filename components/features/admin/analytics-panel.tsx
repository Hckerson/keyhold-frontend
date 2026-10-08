import { CircleOff } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { DeckPanel } from "@/components/patterns/deck-panel";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AnalyticsVisual } from "@/components/features/admin/analytics-visual";
import type {
    AnalyticsPanelData,
    AnalyticsPanelMeta,
    QueueReadiness,
} from "@/lib/types";

const VISUAL_HEIGHT = 120;
const UNAVAILABLE_TITLE = "Not available right now";
const UNAVAILABLE_LEDE =
    "This source did not answer. The rest of the page is current.";

export interface AnalyticsPanelProps {
    meta: AnalyticsPanelMeta;
    data: AnalyticsPanelData;
    readiness: QueueReadiness;
}

export function AnalyticsPanel({ meta, data, readiness }: AnalyticsPanelProps) {
    const pending = readiness === "pending";

    return (
        <DeckPanel
            title={meta.title}
            action={<PanelLink href={meta.href} label={meta.action} />}
            pending={pending}
        >
            {readiness === "error" ? (
                <EmptyState
                    icon={CircleOff}
                    title={UNAVAILABLE_TITLE}
                    description={UNAVAILABLE_LEDE}
                />
            ) : pending ? (
                <Skeleton
                    className="w-full"
                    style={{ height: VISUAL_HEIGHT }}
                />
            ) : (
                <>
                    {data.reading && (
                        <p className="text-text-secondary line-clamp-2 text-xs">
                            {data.reading}
                        </p>
                    )}
                    <AnalyticsVisual
                        visual={data.visual}
                        label={[meta.title, data.reading]
                            .filter(Boolean)
                            .join(": ")}
                    />
                </>
            )}
        </DeckPanel>
    );
}

AnalyticsPanel.displayName = "AnalyticsPanel";
