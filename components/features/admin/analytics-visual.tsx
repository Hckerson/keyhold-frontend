import { DonutChart } from "@/components/ui/charts/donut-chart";
import { StageFlow } from "@/components/ui/charts/stage-flow";
import { TreemapChart } from "@/components/ui/charts/treemap-chart";
import { WaffleChart } from "@/components/ui/charts/waffle-chart";
import { DeckFigure } from "@/components/patterns/deck-figure";
import type { AnalyticsVisual as Visual } from "@/lib/types";

export interface AnalyticsVisualProps {
    visual: Visual;
    label: string;
}

export function AnalyticsVisual({ visual, label }: AnalyticsVisualProps) {
    switch (visual.kind) {
        case "flow":
            return (
                <StageFlow
                    stages={visual.stages}
                    aside={visual.aside}
                    label={label}
                />
            );
        case "treemap":
            return <TreemapChart data={visual.tiles} label={label} />;
        case "waffle":
            return <WaffleChart data={visual.segments} label={label} />;
        case "donut":
            return (
                <DonutChart
                    data={visual.segments}
                    total={visual.total}
                    unit={visual.unit}
                    label={label}
                />
            );
        case "figure":
            return (
                <DeckFigure
                    value={visual.figure.value}
                    caption={visual.figure.caption}
                />
            );
    }
}

AnalyticsVisual.displayName = "AnalyticsVisual";
