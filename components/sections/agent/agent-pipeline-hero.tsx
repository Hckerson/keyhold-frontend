import { OverviewStageList } from "@/components/features/agent/overview-stage-list";
import { PanelLink } from "@/components/features/shared/panel-link";
import { formatCompactUsd } from "@/lib/utils";
import { pipelineStages, pipelineSummary } from "@/lib/data/agent-overview";

const CRM_LINK_LABEL = "Open CRM";

export function AgentPipelineHero() {
    return (
        <section className="border-highlight/25 bg-background rounded-xl border p-4 shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="micro-label">
                        {pipelineSummary.label} · {pipelineSummary.dealCount}{" "}
                        active deals
                    </p>
                    <p className="text-h4 font-display text-text mt-1 font-light tabular-nums">
                        {formatCompactUsd(pipelineSummary.value)}
                    </p>
                </div>
                <PanelLink href={pipelineSummary.href} label={CRM_LINK_LABEL} />
            </div>

            <div className="bg-background-muted border-border-light mt-3 rounded-md border px-3">
                <OverviewStageList stages={pipelineStages} />
            </div>
        </section>
    );
}

AgentPipelineHero.displayName = "AgentPipelineHero";
