"use client";

import { useState } from "react";
import { PortalHeader } from "@/components/patterns/portal-header";
import { PipelineStageColumn } from "@/components/features/agent/pipeline-stage-column";
import { PipelineHealthPanel } from "@/components/features/agent/pipeline-health-panel";
import { DealDetailModal } from "@/components/features/agent/deal-detail-modal";
import { DealDecisionModal } from "@/components/features/agent/deal-decision-modal";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useDealPipeline } from "@/lib/hooks/use-deal-pipeline";
import { useConfirmation } from "@/lib/hooks/use-confirmation";
import { useRespondToOffer } from "@/lib/hooks/use-offers";
import {
    DEAL_DECISION_STATUS,
    dealMove,
    type DealDecision,
} from "@/lib/data/agent-pipeline";
import { notify } from "@/lib/stores/toast-store";
import type { DealStage } from "@/lib/types/deal";
import type { RespondOfferInput } from "@/lib/validations/offer";

const TITLE = "Sales Pipeline";
const LEDE_SUFFIX = "Drag a card to act on its offer";
const REFUSED_TITLE = "That move is not available";

interface PendingDecision {
    dealId: string;
    offerId: string;
    kind: DealDecision;
}

export function PipelineConsole() {
    const pipeline = useDealPipeline();
    const respond = useRespondToOffer();
    const decision = useConfirmation<
        RespondOfferInput & { id: string },
        PendingDecision
    >(respond);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string>();

    const deals = pipeline.columns.flatMap((column) => column.items);
    const selected = deals.find((deal) => deal.id === selectedId);
    const deciding = deals.find((deal) => deal.id === decision.target?.dealId);

    const closeDetail = () => setSelectedId(undefined);

    const decideFromDetail = (kind: DealDecision) => (offerId: string) => {
        if (!selected) return;
        closeDetail();
        decision.request({ dealId: selected.id, offerId, kind });
    };

    const confirmDecision = () => {
        const target = decision.target;
        if (!target) return;
        decision.confirm({
            id: target.offerId,
            status: DEAL_DECISION_STATUS[target.kind],
        });
    };

    const handleDrop = (dealId: string, target: DealStage) => {
        setDraggingId(null);
        if (decision.pending) return;
        const deal = deals.find((item) => item.id === dealId);
        if (!deal) return;

        const move = dealMove(deal, target);

        if (move.kind === "refused") {
            notify({
                tone: "info",
                title: REFUSED_TITLE,
                description: move.reason,
            });
            return;
        }

        decision.request({
            dealId: deal.id,
            offerId: move.offerId,
            kind: move.kind,
        });
    };

    if (pipeline.failed)
        return (
            <ConsoleUnavailable
                fallback={CONSOLE_FALLBACKS.agentPipeline}
                onRetry={pipeline.refetch}
            />
        );

    return (
        <div className="space-y-3">
            <PortalHeader
                title={TITLE}
                lede={`${pipeline.openCount} open deals worth $${pipeline.totalValue.toFixed(2)}M`}
                summary={LEDE_SUFFIX}
            />

            <div className="card-grid gap-3">
                {pipeline.columns.map((column) => (
                    <PipelineStageColumn
                        key={column.id}
                        stage={column.id}
                        label={column.label}
                        items={column.items}
                        value={column.value}
                        draggingId={draggingId}
                        onSelect={setSelectedId}
                        onDragStateChange={setDraggingId}
                        onDrop={handleDrop}
                    />
                ))}
            </div>

            <PipelineHealthPanel
                avgDays={pipeline.avgDays}
                totalValue={pipeline.totalValue}
                openCount={pipeline.openCount}
                closeRate={pipeline.closeRate}
                closedCount={pipeline.closedCount}
            />

            <DealDetailModal
                deal={selected}
                pending={decision.pending}
                onClose={closeDetail}
                onAccept={decideFromDetail("accept")}
                onDecline={decideFromDetail("decline")}
            />

            <DealDecisionModal
                deal={deciding}
                decision={decision.target?.kind ?? "accept"}
                pending={decision.pending}
                failed={decision.failed}
                onClose={decision.dismiss}
                onConfirm={confirmDecision}
            />
        </div>
    );
}

PipelineConsole.displayName = "PipelineConsole";
