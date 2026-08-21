import { UserSearch } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { PanelInset } from "@/components/ui/panel-inset";
import { FilterPills } from "@/components/patterns/filter-pills";
import { PanelLink } from "@/components/features/shared/panel-link";
import { LeadTable } from "@/components/features/agent/lead-table";
import { LeadsTopProspectHero } from "@/components/sections/agent/leads-top-prospect-hero";
import { LEAD_STAGE_FILTERS } from "@/lib/data/agent-leads";
import type { Lead, LeadStageFilter } from "@/lib/types/lead";

const PIPELINE_TITLE = "Working Set";
const PIPELINE_LEDE = "Every enquiry behind your top opportunity";
const PIPELINE_ACTION = "Open pipeline";
const EMPTY_TITLE = "No enquiries in this stage";
const EMPTY_LEDE = "Change the filter, or publish a listing to attract buyers.";
const LOADING_TITLE = "Loading your enquiries";
const LOADING_LEDE = "Fetching the buyers who reached out about your listings.";

export interface LeadsMainProps {
    top?: Lead;
    leads: Lead[];
    stageFilter: LeadStageFilter;
    counts: Record<LeadStageFilter, number>;
    pending?: boolean;
    onFilterChange: (stage: LeadStageFilter) => void;
    onRespond: (id: string, accept: boolean) => void;
}

export function LeadsMain({
    top,
    leads,
    stageFilter,
    counts,
    pending = false,
    onFilterChange,
    onRespond,
}: LeadsMainProps) {
    return (
        <div className="console-span-2 flex flex-col gap-3">
            {top && <LeadsTopProspectHero lead={top} onRespond={onRespond} />}

            <Panel
                title={PIPELINE_TITLE}
                description={PIPELINE_LEDE}
                count={leads.length}
                action={
                    <PanelLink href="/agent/pipeline" label={PIPELINE_ACTION} />
                }
            >
                <div className="flex min-h-11 flex-wrap items-center py-1.5">
                    <FilterPills
                        filters={LEAD_STAGE_FILTERS}
                        active={stageFilter}
                        onChange={onFilterChange}
                        counts={counts}
                    />
                </div>

                {leads.length > 0 ? (
                    <PanelInset scroll className="mt-0">
                        <LeadTable leads={leads} onRespond={onRespond} />
                    </PanelInset>
                ) : (
                    <EmptyState
                        icon={UserSearch}
                        title={pending ? LOADING_TITLE : EMPTY_TITLE}
                        description={pending ? LOADING_LEDE : EMPTY_LEDE}
                    />
                )}
            </Panel>
        </div>
    );
}

LeadsMain.displayName = "LeadsMain";
