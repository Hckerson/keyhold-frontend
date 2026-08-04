import { UserSearch } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { FilterPills } from "@/components/patterns/filter-pills";
import { PanelLink } from "@/components/features/shared/panel-link";
import { LeadTable } from "@/components/features/agent/lead-table";
import { LeadsTopProspectHero } from "@/components/sections/agent/leads-top-prospect-hero";
import {
    LEAD_STAGE_FILTERS,
    type Lead,
    type LeadStageFilter,
} from "@/lib/data/agent-leads";

const PIPELINE_TITLE = "Working Set";
const PIPELINE_LEDE = "Every prospect behind your top opportunity";
const PIPELINE_ACTION = "Open pipeline";
const EMPTY_TITLE = "No prospects in this stage";
const EMPTY_LEDE = "Change the filter or capture a new prospect.";

export interface LeadsMainProps {
    top: Lead;
    leads: Lead[];
    stageFilter: LeadStageFilter;
    counts: Record<LeadStageFilter, number>;
    onFilterChange: (stage: LeadStageFilter) => void;
    onAdvance: (id: string) => void;
}

export function LeadsMain({
    top,
    leads,
    stageFilter,
    counts,
    onFilterChange,
    onAdvance,
}: LeadsMainProps) {
    return (
        <div className="flex flex-col gap-3 lg:col-span-2">
            <LeadsTopProspectHero lead={top} onAdvance={onAdvance} />

            <Panel
                title={PIPELINE_TITLE}
                description={PIPELINE_LEDE}
                count={leads.length}
                action={
                    <PanelLink href="/agent/pipeline" label={PIPELINE_ACTION} />
                }
            >
                <div className="flex h-11 items-center">
                    <FilterPills
                        filters={LEAD_STAGE_FILTERS}
                        active={stageFilter}
                        onChange={onFilterChange}
                        counts={counts}
                    />
                </div>

                {leads.length > 0 ? (
                    <PanelInset className="mt-0">
                        <LeadTable leads={leads} onAdvance={onAdvance} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={UserSearch}
                        title={EMPTY_TITLE}
                        description={EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

LeadsMain.displayName = "LeadsMain";
