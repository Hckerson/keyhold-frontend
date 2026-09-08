"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Callout } from "@/components/ui/callout";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@/components/ui/modal";
import { MetricCell } from "@/components/patterns/metric-cell";
import { DealProgress } from "@/components/features/agent/deal-progress";
import { DEAL_STAGES } from "@/lib/config/deal-stages";
import { AGENT_ROUTES } from "@/lib/constants";
import { formatMillions } from "@/lib/utils";
import type { Deal } from "@/lib/types/deal";

const CLOSE_LABEL = "Close";
const LEADS_LABEL = "Lead desk";
const ACCEPT_LABEL = "Accept offer";
const DECLINE_LABEL = "Decline offer";
const NOTES_LABEL = "Notes";
const ANSWERED_TITLE = "No decision outstanding";
const ANSWERED_LEDE =
    "This deal advances when the buyer acts. Drag it only once a new offer is live.";

export interface DealDetailModalProps {
    deal?: Deal;
    pending: boolean;
    onClose: () => void;
    onAccept: (offerId: string) => void;
    onDecline: (offerId: string) => void;
}

export function DealDetailModal({
    deal,
    pending,
    onClose,
    onAccept,
    onDecline,
}: DealDetailModalProps) {
    const stage = deal && DEAL_STAGES.find((item) => item.id === deal.stage);
    const offerId = deal?.openOfferId ?? null;

    return (
        <Modal
            open={deal !== undefined}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            className="max-w-lg"
            aria-labelledby="deal-detail-title"
        >
            {deal && stage && (
                <ModalContent>
                    <ModalHeader className="p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <ModalTitle id="deal-detail-title">
                                    {deal.property}
                                </ModalTitle>
                                <p className="text-text-secondary mt-0.5 truncate text-xs">
                                    {deal.buyer}
                                </p>
                            </div>
                            <StatusBadge tone={stage.tone}>
                                {stage.label}
                            </StatusBadge>
                        </div>
                    </ModalHeader>

                    <ModalBody className="space-y-3 p-4">
                        <div className="metric-strip bg-background border-border-light gap-3 rounded-md border p-3">
                            <MetricCell label="Value">
                                {formatMillions(deal.price, 2)}
                            </MetricCell>
                            <MetricCell label="Days in stage">
                                {deal.daysInStage}
                            </MetricCell>
                            <MetricCell label="Last activity">
                                {deal.lastActivity}
                            </MetricCell>
                        </div>

                        <DealProgress
                            stage={deal.stage}
                            daysInStage={deal.daysInStage}
                        />

                        {deal.notes && (
                            <div>
                                <p className="micro-label">{NOTES_LABEL}</p>
                                <p className="text-text-secondary mt-1 text-xs">
                                    {deal.notes}
                                </p>
                            </div>
                        )}

                        {offerId === null && (
                            <Callout
                                variant="neutral"
                                title={ANSWERED_TITLE}
                                description={ANSWERED_LEDE}
                            />
                        )}
                    </ModalBody>

                    <ModalFooter className="gap-2 p-4">
                        <Button
                            type="button"
                            emphasis="quiet"
                            onClick={onClose}
                        >
                            {CLOSE_LABEL}
                        </Button>
                        <Link
                            href={AGENT_ROUTES.leads}
                            className={buttonVariants({ size: "sm" })}
                        >
                            {LEADS_LABEL}
                        </Link>
                        {offerId !== null && (
                            <>
                                <Button
                                    type="button"
                                    emphasis="outline"
                                    tone="error"
                                    isLoading={pending}
                                    onClick={() => onDecline(offerId)}
                                >
                                    {DECLINE_LABEL}
                                </Button>
                                <Button
                                    type="button"
                                    emphasis="solid"
                                    tone="accent"
                                    isLoading={pending}
                                    onClick={() => onAccept(offerId)}
                                >
                                    {ACCEPT_LABEL}
                                </Button>
                            </>
                        )}
                    </ModalFooter>
                </ModalContent>
            )}
        </Modal>
    );
}

DealDetailModal.displayName = "DealDetailModal";
