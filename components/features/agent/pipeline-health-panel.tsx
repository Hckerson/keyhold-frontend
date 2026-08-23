import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

export interface PipelineHealthPanelProps {
    avgDays: number;
    totalValue: number;
    openCount: number;
    closeRate: number;
    closedCount: number;
}

export function PipelineHealthPanel({
    avgDays,
    totalValue,
    openCount,
    closeRate,
    closedCount,
}: PipelineHealthPanelProps) {
    const health = [
        {
            label: "Avg Days in Stage",
            value: String(avgDays),
            caption: `across ${openCount} open deals`,
            tone: "text-text",
        },
        {
            label: "Open Pipeline Value",
            value: `$${totalValue.toFixed(1)}M`,
            caption: `from ${openCount} open deals`,
            tone: "text-accent",
        },
        {
            label: "Close Rate",
            value: `${closeRate}%`,
            caption: `${closedCount} closed of ${closedCount + openCount}`,
            tone: "text-success",
        },
    ];

    return (
        <Panel title="Pipeline Health" description="Key metrics and insights">
            <div className="card-grid gap-3">
                {health.map((metric) => (
                    <div key={metric.label}>
                        <p className="text-text-muted font-mono text-[10px] tracking-wide uppercase">
                            {metric.label}
                        </p>
                        <p
                            className={cn(
                                "mt-1 text-xs font-medium tabular-nums",
                                metric.tone,
                            )}
                        >
                            {metric.value}
                        </p>
                        <p className="text-text-muted mt-0.5 text-xs">
                            {metric.caption}
                        </p>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

PipelineHealthPanel.displayName = "PipelineHealthPanel";
