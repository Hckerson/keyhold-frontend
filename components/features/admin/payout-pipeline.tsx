import { Clock } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { MetricList } from "@/components/patterns/metric-list";
import { chartToneVar } from "@/lib/config/chart-tones";
import { formatThousands } from "@/lib/utils";
import type { PayoutStage } from "@/lib/data/admin-payments";
import type { MetricItem } from "@/lib/types";

export interface PayoutPipelineProps {
    stages: PayoutStage[];
    outstanding: number;
    pendingCount: number;
    metrics: MetricItem[];
}

function StageRow({ stage }: { stage: PayoutStage }) {
    return (
        <li className="flex items-center gap-2.5 py-2">
            <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: chartToneVar[stage.tone] }}
            />
            <span className="text-text text-xs font-medium">{stage.name}</span>
            <span className="micro-label">
                {stage.count} {stage.count === 1 ? "payout" : "payouts"}
            </span>
            <span className="text-text ml-auto text-xs font-semibold tabular-nums">
                {formatThousands(stage.amount)}
            </span>
        </li>
    );
}

export function PayoutPipeline({
    stages,
    outstanding,
    pendingCount,
    metrics,
}: PayoutPipelineProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="bg-background border-border-light rounded-lg border p-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="micro-label">Awaiting release</p>
                        <p className="font-display text-text text-h4 mt-1 leading-none font-light tabular-nums">
                            {formatThousands(outstanding)}
                        </p>
                        <p className="text-text-secondary mt-1.5 text-xs">
                            {pendingCount} agent commission payouts across{" "}
                            {stages.length} stages
                        </p>
                    </div>
                    <StatusBadge tone="warning" size="md" icon={Clock}>
                        Action needed
                    </StatusBadge>
                </div>

                <div
                    aria-hidden="true"
                    className="mt-3 flex h-1.5 gap-0.5 overflow-hidden rounded-full"
                >
                    {stages.map((stage) => (
                        <span
                            key={stage.id}
                            className="h-full rounded-full"
                            style={{
                                width: `${(stage.amount / outstanding) * 100}%`,
                                background: chartToneVar[stage.tone],
                            }}
                        />
                    ))}
                </div>
            </div>

            <ul className="divide-border-light divide-y">
                {stages.map((stage) => (
                    <StageRow key={stage.id} stage={stage} />
                ))}
            </ul>

            <MetricList metrics={metrics} />
        </div>
    );
}

PayoutPipeline.displayName = "PayoutPipeline";
