import { chartToneVar } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ChartMark } from "@/lib/types";

const NODE_MIN = 10;
const NODE_MAX = 40;

const diameterOf = (value: number, peak: number) =>
    value > 0 && peak > 0
        ? NODE_MIN + (NODE_MAX - NODE_MIN) * Math.sqrt(value / peak)
        : NODE_MIN;

export interface StageFlowNodeProps {
    stage: ChartMark;
    peak: number;
    first: boolean;
    last: boolean;
}

export function StageFlowNode({
    stage,
    peak,
    first,
    last,
}: StageFlowNodeProps) {
    const size = diameterOf(stage.value, peak);
    const empty = stage.value === 0;

    return (
        <li className="flex min-w-0 flex-col items-center gap-1.5 text-center text-xs">
            <span className="relative grid h-11 w-full place-items-center">
                <span
                    aria-hidden="true"
                    className={cn(
                        "bg-border absolute top-1/2 right-1/2 left-0 h-px",
                        first && "hidden",
                    )}
                />
                <span
                    aria-hidden="true"
                    className={cn(
                        "bg-border absolute top-1/2 right-0 left-1/2 h-px",
                        last && "hidden",
                    )}
                />
                <span
                    aria-hidden="true"
                    className={cn(
                        "ring-background relative rounded-full ring-4",
                        empty && "border-border-dark bg-background border",
                    )}
                    style={{
                        width: size,
                        height: size,
                        background: empty
                            ? undefined
                            : chartToneVar[stage.tone],
                    }}
                />
            </span>
            <span className="text-text-secondary line-clamp-2 px-1 text-balance">
                {stage.label}
            </span>
            <span
                className={cn(
                    "font-semibold tabular-nums",
                    empty ? "text-text-muted" : "text-text",
                )}
            >
                {stage.display}
            </span>
            <span className="text-text-muted h-4 tabular-nums">
                {stage.caption}
            </span>
        </li>
    );
}

StageFlowNode.displayName = "StageFlowNode";
