import { Skeleton } from "@/components/ui/skeleton";
import { DeckPanel } from "@/components/patterns/deck-panel";
import { PanelLink } from "@/components/features/shared/panel-link";
import { AnalyticsVisual } from "@/components/features/admin/analytics-visual";
import type { AnalyticsPanelData, AnalyticsPanelMeta } from "@/lib/types";

const VISUAL_HEIGHT = 120;

export interface AnalyticsPanelProps {
    meta: AnalyticsPanelMeta;
    data: AnalyticsPanelData;
    pending?: boolean;
}

export function AnalyticsPanel({ meta, data, pending }: AnalyticsPanelProps) {
    return (
        <DeckPanel
            title={meta.title}
            action={<PanelLink href={meta.href} label={meta.action} />}
            pending={pending}
        >
            {pending ? (
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
