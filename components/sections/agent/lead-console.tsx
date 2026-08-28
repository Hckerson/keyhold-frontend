"use client";

import { useCallback, useMemo, useState } from "react";
import { LeadCreateModal } from "@/components/features/agent/lead-create-modal";
import { LeadsHeader } from "@/components/sections/agent/leads-header";
import { LeadsMain } from "@/components/sections/agent/leads-main";
import { LeadsRail } from "@/components/sections/agent/leads-rail";
import { LeadsStatBand } from "@/components/sections/agent/leads-stat-band";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import {
    countByStage,
    leadStats,
    leadsSummary,
    rankLeads,
    toListingOptions,
} from "@/lib/data/agent-leads";
import {
    useIncomingConnections,
    useRecordLead,
    useRespondToConnection,
} from "@/lib/hooks/use-connections";
import { useSellerProperties } from "@/lib/hooks/use-properties";
import { useSession } from "@/lib/hooks/use-session";
import { toLead } from "@/lib/utils/to-lead";
import { EMPTY_LEAD_DRAFT, type LeadDraft } from "@/lib/config/lead-capture";
import { createLeadSchema } from "@/lib/validations/connection";
import { toFieldErrors, type FieldErrors } from "@/lib/validations/auth";
import type { LeadStageFilter } from "@/lib/types/lead";

const SELLER_QUERY = { limit: 100 } as const;

export function LeadConsole() {
    const { data, isPending, isError, refetch } = useIncomingConnections();
    const respond = useRespondToConnection();
    const recordLead = useRecordLead();
    const { user } = useSession();
    const sellerProperties = useSellerProperties(user?.id, SELLER_QUERY);

    const [stageFilter, setStageFilter] = useState<LeadStageFilter>("all");
    const [adding, setAdding] = useState(false);
    const [draft, setDraft] = useState<LeadDraft>(EMPTY_LEAD_DRAFT);
    const [errors, setErrors] = useState<FieldErrors>({});

    const leads = useMemo(() => (data ?? []).map(toLead), [data]);

    const ranked = useMemo(() => rankLeads(leads), [leads]);
    const peers = useMemo(() => ranked.slice(1), [ranked]);
    const counts = useMemo(() => countByStage(peers), [peers]);

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

    const onOpenAdd = useCallback(() => {
        recordLead.reset();
        setDraft({
            ...EMPTY_LEAD_DRAFT,
            propertyId: listingOptions[0]?.value ?? "",
        });
        setErrors({});
        setAdding(true);
    }, [recordLead, listingOptions]);

    const onSubmitLead = () => {
        const parsed = createLeadSchema.safeParse(draft);

        if (!parsed.success) {
            setErrors(toFieldErrors(parsed.error));
            return;
        }

        setErrors({});
        void recordLead.mutateAsync(parsed.data).then(() => setAdding(false));
    };

    const onRespond = useCallback(
        (id: string, accept: boolean) =>
            void respond.mutateAsync({ id, accept }),
        [respond],
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
            <LeadsHeader summary={leadsSummary(leads)} onAdd={onOpenAdd} />

            <LeadsStatBand stats={leadStats(leads)} />

            <div className="console-split gap-3">
                <LeadsMain
                    top={ranked[0]}
                    leads={visible}
                    stageFilter={stageFilter}
                    counts={counts}
                    pending={isPending}
                    onFilterChange={setStageFilter}
                    onRespond={onRespond}
                />
                <LeadsRail leads={leads} />
            </div>

            <LeadCreateModal
                open={adding}
                draft={draft}
                listings={listingOptions}
                errors={errors}
                pending={recordLead.isPending}
                failed={recordLead.isError}
                onDraftChange={setDraft}
                onClose={() => setAdding(false)}
                onSubmit={onSubmitLead}
            />
        </div>
    );
}

LeadConsole.displayName = "LeadConsole";
