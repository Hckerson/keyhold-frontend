import { StageFlowNode } from "@/components/ui/charts/stage-flow-node";
import { chartToneVar } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ChartMark } from "@/lib/types";

export interface StageFlowProps {
    stages: ChartMark[];
    aside?: ChartMark;
    label: string;
    className?: string;
}

export function StageFlow({ stages, aside, label, className }: StageFlowProps) {
    const peak = Math.max(0, ...stages.map((stage) => stage.value));

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <ol
                aria-label={label}
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
                }}
            >
                {stages.map((stage, index) => (
                    <StageFlowNode
                        key={stage.id}
                        stage={stage}
                        peak={peak}
                        first={index === 0}
                        last={index === stages.length - 1}
                    />
                ))}
            </ol>

            {aside && (
                <p className="border-border-light text-text-muted flex items-center gap-2 border-t pt-2.5 text-xs">
                    <span
                        aria-hidden="true"
                        className={cn(
                            "size-2 shrink-0 rounded-full",
                            aside.value === 0 && "border-border-dark border",
                        )}
                        style={{
                            background:
                                aside.value > 0
                                    ? chartToneVar[aside.tone]
                                    : undefined,
                        }}
                    />
                    <span className="text-text-secondary">{aside.label}</span>
                    <span className="text-text ml-auto font-medium tabular-nums">
                        {aside.display}
                    </span>
                    {aside.caption && (
                        <span className="tabular-nums">{aside.caption}</span>
                    )}
                </p>
            )}
        </div>
    );
}

StageFlow.displayName = "StageFlow";
