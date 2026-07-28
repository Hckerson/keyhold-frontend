import { Panel } from "@/components/ui/panel";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { MonthlySales } from "@/lib/data/agent-analytics";

export interface AnalyticsMonthlyPanelProps {
    data: MonthlySales[];
}

export function AnalyticsMonthlyPanel({ data }: AnalyticsMonthlyPanelProps) {
    const maxVolume = Math.max(...data.map((entry) => entry.volume));

    return (
        <Panel title="Sales by Month" description="2024 performance overview">
            <div className="space-y-4">
                {data.map((entry) => (
                    <div key={entry.month}>
                        <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-text text-sm font-medium">
                                {entry.month}
                            </span>
                            <span className="text-text-secondary text-xs tabular-nums">
                                {entry.sales} sales · ${entry.volume}M
                            </span>
                        </div>
                        <ProgressBar value={(entry.volume / maxVolume) * 100} />
                    </div>
                ))}
            </div>
        </Panel>
    );
}

AnalyticsMonthlyPanel.displayName = "AnalyticsMonthlyPanel";
