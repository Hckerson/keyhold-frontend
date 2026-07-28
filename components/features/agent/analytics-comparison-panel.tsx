import { Check } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";
import type { ComparisonBar } from "@/lib/data/agent-analytics";

export interface AnalyticsComparisonPanelProps {
    bars: ComparisonBar[];
    advantages: string[];
}

export function AnalyticsComparisonPanel({
    bars,
    advantages,
}: AnalyticsComparisonPanelProps) {
    return (
        <Panel
            title="Market Comparison"
            description="Your performance vs market average"
        >
            <div className="space-y-6">
                <div>
                    <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                        Average Sale Price
                    </p>
                    <div className="mt-3 flex items-end gap-4">
                        {bars.map((bar) => (
                            <div key={bar.label} className="flex-1">
                                <div className="bg-background-alt flex h-24 items-end justify-center overflow-hidden rounded-t-md">
                                    <div
                                        className={cn(
                                            "w-12 rounded-t-md",
                                            bar.accent
                                                ? "bg-accent"
                                                : "bg-border",
                                        )}
                                        style={{ height: `${bar.pct}%` }}
                                    />
                                </div>
                                <p className="text-text mt-2 text-center text-xs font-medium tabular-nums">
                                    {bar.value}
                                </p>
                                <p className="text-text-muted text-caption text-center tracking-wide uppercase">
                                    {bar.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

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
