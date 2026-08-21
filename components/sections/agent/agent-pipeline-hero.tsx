import { OverviewStageList } from "@/components/features/agent/overview-stage-list";
import { PanelLink } from "@/components/features/shared/panel-link";
import { formatCompactUsd } from "@/lib/utils";
import type { PipelineStage, PipelineSummary } from "@/lib/data/agent-overview";

const CRM_LINK_LABEL = "Open CRM";
const DEALS_SUFFIX = "active deals";

export interface AgentPipelineHeroProps {
    summary: PipelineSummary;
    stages: PipelineStage[];
}

export function AgentPipelineHero({ summary, stages }: AgentPipelineHeroProps) {
    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label">
                        {summary.label} · {summary.dealCount} {DEALS_SUFFIX}
                    </p>
                    <p className="text-h4 font-display text-text mt-1 font-light tabular-nums">
                        {formatCompactUsd(summary.value)}
                    </p>
                </div>
                <PanelLink href={summary.href} label={CRM_LINK_LABEL} />
            </div>

            <div className="bg-background-muted border-border-light mt-3 rounded-md border px-3">
                <OverviewStageList stages={stages} />
            </div>
        </section>
    );
}

AgentPipelineHero.displayName = "AgentPipelineHero";
