"use client";

import { useState } from "react";
import { PortalHeader } from "@/components/patterns/portal-header";
import { PipelineStageColumn } from "@/components/features/agent/pipeline-stage-column";
import { PipelineHealthPanel } from "@/components/features/agent/pipeline-health-panel";
import { DealDetailModal } from "@/components/features/agent/deal-detail-modal";
import { ConsoleUnavailable } from "@/components/patterns/console-unavailable";
import { CONSOLE_FALLBACKS } from "@/lib/config/console-fallbacks";
import { useDealPipeline } from "@/lib/hooks/use-deal-pipeline";
import { useRespondToOffer } from "@/lib/hooks/use-offers";
import { dealMove } from "@/lib/data/agent-pipeline";
import { notify } from "@/lib/stores/toast-store";
import type { DealStage } from "@/lib/types/deal";

const TITLE = "Sales Pipeline";
const LEDE_SUFFIX = "Drag a card to act on its offer";
const REFUSED_TITLE = "That move is not available";

export function PipelineConsole() {
    const pipeline = useDealPipeline();
    const respond = useRespondToOffer();
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string>();

    const deals = pipeline.columns.flatMap((column) => column.items);
    const selected = deals.find((deal) => deal.id === selectedId);

    const closeDetail = () => setSelectedId(undefined);

    const settle = (
        id: string,
        status: "ACCEPTED" | "REJECTED",
        note: string,
    ) =>
        respond.mutate(
            { id, status },
            {
                onSuccess: () => {
                    notify({ tone: "success", title: note });
                    closeDetail();
                },
            },
        );

    const handleDrop = (dealId: string, target: DealStage) => {
        setDraggingId(null);
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

        settle(
            move.offerId,
            move.kind === "accept" ? "ACCEPTED" : "REJECTED",
            move.note,
        );
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
                pending={respond.isPending}
                onClose={closeDetail}
                onAccept={(offerId) =>
                    settle(offerId, "ACCEPTED", "Offer accepted.")
                }
                onDecline={(offerId) =>
                    settle(offerId, "REJECTED", "Offer declined.")
                }
            />
        </div>
    );
}

PipelineConsole.displayName = "PipelineConsole";
