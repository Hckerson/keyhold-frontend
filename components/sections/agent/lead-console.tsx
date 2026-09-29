"use client";

import { useCallback, useMemo, useState } from "react";
import { LeadCallModal } from "@/components/features/agent/lead-call-modal";
import { LeadCreateModal } from "@/components/features/agent/lead-create-modal";
import { LeadEmailModal } from "@/components/features/agent/lead-email-modal";
import { LeadResponseModal } from "@/components/features/agent/lead-response-modal";
import { LeadsHeader } from "@/components/sections/agent/leads-header";
import { LeadsMain } from "@/components/sections/agent/leads-main";
import { LeadsRail } from "@/components/sections/agent/leads-rail";
import { LeadsStatBand } from "@/components/sections/agent/leads-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { LEAD_RESPONSE_COPY } from "@/lib/config/lead-response";
import {
    countByStage,
    leadStats,
    leadsSummary,
    rankLeads,
    toListingOptions,
} from "@/lib/data/agent-leads";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import {
    useAcceptConnection,
    useDeclineConnection,
    useIncomingConnections,
} from "@/lib/hooks/use-connections";
import { useLeadCapture } from "@/lib/hooks/use-lead-capture";
import { useLeadOutreach } from "@/lib/hooks/use-lead-outreach";
import { useSellerProperties } from "@/lib/hooks/use-properties";
import { useSession } from "@/lib/hooks/use-session";
import { toLead } from "@/lib/utils/to-lead";
import type { LeadStageFilter } from "@/lib/types/lead";

const SELLER_QUERY = { limit: 100 } as const;

export function LeadConsole() {
    const { data, isPending, isError, refetch } = useIncomingConnections();
    const acceptConnection = useAcceptConnection();
    const accept = useConfirmation<string>(acceptConnection);
    const declineConnection = useDeclineConnection();
    const decline = useConfirmation<string>(declineConnection);
    const { user } = useSession();
    const sellerProperties = useSellerProperties(user?.id, SELLER_QUERY);

    const [stageFilter, setStageFilter] = useState<LeadStageFilter>("all");

    const leads = useMemo(() => (data ?? []).map(toLead), [data]);

    const ranked = useMemo(() => rankLeads(leads), [leads]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByStage(peers), [peers]);

    const top = ranked[0];
    const outreach = useLeadOutreach(top?.id, top?.interests[0]);

    const visible = useMemo(
        () =>
            stageFilter === "all"
                ? peers
                : peers.filter((lead) => lead.stage === stageFilter),
        [peers, stageFilter],
    );

    const listingOptions = useMemo(
        () => toListingOptions(sellerProperties.data?.items ?? []),
        [sellerProperties.data?.items],
    );

    const capture = useLeadCapture(listingOptions[0]?.value ?? "");

    const respondingId = accept.pending
        ? (acceptConnection.variables ?? null)
        : decline.pending
          ? (declineConnection.variables ?? null)
          : null;

    const onRespond = useCallback(
        (id: string, accepted: boolean) => {
            if (accepted) accept.request(id);
            else decline.request(id);
        },
        [accept, decline],
    );

    if (isError)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentLeads}
                onRetry={() => void refetch()}
            />
        );

    return (
        <div className="flex flex-col gap-4">
            <LeadsHeader summary={leadsSummary(leads)} onAdd={capture.open} />

            <LeadsStatBand stats={leadStats(leads)} pending={isPending} />

            <div className="console-split gap-3">
                <LeadsMain
                    top={top}
                    leads={visible}
                    stageFilter={stageFilter}
                    counts={counts}
                    pending={isPending}
                    calling={outreach.calling}
                    respondingId={respondingId}
                    onFilterChange={setStageFilter}
                    onRespond={onRespond}
                    onCall={outreach.call}
                    onEmail={outreach.openCompose}
                />
                <LeadsRail leads={leads} />
            </div>

            <LeadResponseModal
                copy={LEAD_RESPONSE_COPY.accept}
                leads={leads}
                response={accept}
            />

            <LeadResponseModal
                copy={LEAD_RESPONSE_COPY.decline}
                leads={leads}
                response={decline}
            />

            <LeadCreateModal
                open={capture.adding}
                draft={capture.draft}
                listings={listingOptions}
                errors={capture.errors}
                pending={capture.pending}
                failed={capture.failed}
                onDraftChange={capture.setDraft}
                onClose={capture.close}
                onSubmit={capture.submit}
            />

            <LeadCallModal
                lead={top}
                confirmation={outreach.callConfirmation}
            />

            {top && (
                <LeadEmailModal
                    open={outreach.composing}
                    recipient={top.email}
                    draft={outreach.draft}
                    errors={outreach.errors}
                    pending={outreach.sending}
                    onDraftChange={outreach.setDraft}
                    onClose={outreach.closeCompose}
                    onSubmit={outreach.submitEmail}
                />
            )}
        </div>
    );
}

LeadConsole.displayName = "LeadConsole";
