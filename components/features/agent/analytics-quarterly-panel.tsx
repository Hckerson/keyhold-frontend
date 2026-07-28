import { Panel } from "@/components/ui/panel";
import type { QuarterSummary } from "@/lib/data/agent-analytics";

export interface AnalyticsQuarterlyPanelProps {
    quarters: QuarterSummary[];
}

export function AnalyticsQuarterlyPanel({
    quarters,
}: AnalyticsQuarterlyPanelProps) {
    return (
        <Panel
            title="Quarterly Breakdown"
            description="Sales volume and transaction count"
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {quarters.map((quarter) => (
                    <div
                        key={quarter.label}
                        className="bg-background-alt rounded-lg p-4"
                    >
                        <p className="text-text-muted text-caption font-medium tracking-wide uppercase">
                            {quarter.label}
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-text-muted text-caption tracking-wide uppercase">
                                    Sales
                                </p>
                                <p className="text-h5 font-display text-text mt-0.5 font-light tabular-nums">
                                    {quarter.sales}
                                </p>
                            </div>
                            <div>
                                <p className="text-text-muted text-caption tracking-wide uppercase">
                                    Volume
                                </p>
                                <p className="text-h5 font-display text-accent mt-0.5 font-light tabular-nums">
                                    {quarter.volume}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

AnalyticsQuarterlyPanel.displayName = "AnalyticsQuarterlyPanel";
