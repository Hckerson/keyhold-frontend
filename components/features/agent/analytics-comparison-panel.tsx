import { Check } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { BarChart, type BarDatum } from "@/components/ui/charts/bar-chart";
import { formatMillions } from "@/lib/utils";
import type { ComparisonBar } from "@/lib/data/agent-analytics";

export interface AnalyticsComparisonPanelProps {
    bars: ComparisonBar[];
    advantages: string[];
}

export function AnalyticsComparisonPanel({
    bars,
    advantages,
}: AnalyticsComparisonPanelProps) {
    const data: BarDatum[] = bars.map((bar) => ({
        label: bar.label,
        value: bar.value,
        display: formatMillions(bar.value, 2),
        tone: bar.accent ? "accent" : "neutral",
    }));

    return (
        <Panel
            title="Market Comparison"
            description="Your performance vs market average"
        >
            <div className="space-y-6">
                <figure>
                    <figcaption className="text-text-muted text-caption font-medium tracking-wide uppercase">
                        Average Sale Price
                    </figcaption>
                    <BarChart
                        data={data}
                        labelWidth={72}
                        rowHeight={40}
                        valueWidth={72}
                        className="mt-2"
                    />
                </figure>

                <div className="border-border-light border-t pt-4">
                    <p className="text-text-muted text-caption mb-2 font-medium tracking-wide uppercase">
                        Key Advantages
                    </p>
                    <div className="space-y-2">
                        {advantages.map((advantage) => (
                            <div
                                key={advantage}
                                className="flex items-center gap-2 text-sm"
                            >
                                <Check
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-success shrink-0"
                                />
                                <span className="text-text-secondary">
                                    {advantage}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Panel>
    );
}

AnalyticsComparisonPanel.displayName = "AnalyticsComparisonPanel";
