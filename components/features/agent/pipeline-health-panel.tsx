import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

export interface PipelineHealthPanelProps {
    avgDays: number;
    totalValue: number;
    openCount: number;
}

export function PipelineHealthPanel({
    avgDays,
    totalValue,
    openCount,
}: PipelineHealthPanelProps) {
    const health = [
        {
            label: "Avg Days in Stage",
            value: String(avgDays),
            caption: "Target: 45–60 days to close",
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
            value: "68%",
            caption: "vs 52% industry avg",
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
