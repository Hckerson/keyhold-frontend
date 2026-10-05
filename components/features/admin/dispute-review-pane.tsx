"use client";

import { Callout } from "@/components/ui/callout";
import { StatusBadge } from "@/components/ui/status-badge";
import { SignalGrid } from "@/components/patterns/signal-grid";
import { DisputeDecisionBar } from "@/components/features/admin/dispute-decision-bar";
import { DisputeEvidenceList } from "@/components/features/admin/dispute-evidence-list";
import {
    disputeStatusMeta,
    type DisputeCase,
    type DisputeDecisionMode,
} from "@/lib/data/admin-disputes";
import { formatUsd } from "@/lib/utils";
import type { Signal } from "@/lib/types";

const OUTCOME_TITLE = "Outcome";
const EVIDENCE_LABEL = "Evidence";
const DEALS_LABEL = "Disputed deals";
const NO_DEALS = "No transaction is attached to this dispute.";

export interface DisputeReviewPaneProps {
    dispute: DisputeCase;
    busy: boolean;
    onAction: (mode: DisputeDecisionMode) => void;
}

export function DisputeReviewPane({
    dispute,
    busy,
    onAction,
}: DisputeReviewPaneProps) {
    const meta = disputeStatusMeta[dispute.status];

    const signals: Signal[] = [
        { label: "Raised by", value: dispute.initiator },
        { label: "At stake", value: formatUsd(dispute.amountAtStake) },
        { label: "Open", value: `${dispute.waitingDays}d` },
        { label: "Evidence", value: `${dispute.evidence.length}` },
    ];

    return (
        <section className="bg-background-muted border-border-light overflow-hidden rounded-xl border shadow-sm">
            <div className="border-border-light flex items-start justify-between gap-3 border-b px-4 py-3">
                <div className="min-w-0">
                    <h2 className="text-text truncate text-xs font-semibold">
                        {dispute.title}
                    </h2>
                    <p className="text-text-muted truncate text-xs">
                        {dispute.initiatorEmail}
                    </p>
                </div>
                <StatusBadge tone={meta.tone} size="md">
                    {meta.label}
                </StatusBadge>
            </div>

            <div className="flex flex-col gap-4 px-4 py-3">
                <SignalGrid signals={signals} />

                <p className="text-text-secondary text-xs break-words">
                    {dispute.description}
                </p>

                {dispute.resolutionNotes && (
                    <Callout
                        variant={
                            dispute.status === "DISMISSED"
                                ? "warning"
                                : "success"
                        }
                        title={OUTCOME_TITLE}
                        description={dispute.resolutionNotes}
                    />
                )}

                <div>
                    <p className="micro-label">
                        {DEALS_LABEL} · {dispute.deals.length}
                    </p>
                    {dispute.deals.length === 0 ? (
                        <p className="text-text-muted mt-1.5 text-xs">
                            {NO_DEALS}
                        </p>
                    ) : (
                        <ul className="divide-border-light mt-1.5 divide-y">
                            {dispute.deals.map((deal) => (
                                <li
                                    key={deal.id}
                                    className="flex items-center justify-between gap-3 py-2"
                                >
                                    <div className="min-w-0">
                                        <p className="text-text truncate text-xs font-medium">
                                            {deal.property}
                                        </p>
                                        <p className="text-text-muted truncate text-xs">
                                            {deal.address}
                                        </p>
                                    </div>
                                    <span className="text-text shrink-0 text-xs font-semibold tabular-nums">
                                        {formatUsd(deal.amount)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <p className="micro-label">
                        {EVIDENCE_LABEL} · {dispute.evidence.length}
                    </p>
                    <DisputeEvidenceList evidence={dispute.evidence} />
                </div>
            </div>

            <DisputeDecisionBar
                status={dispute.status}
                busy={busy}
                onAction={onAction}
            />
        </section>
    );
}

DisputeReviewPane.displayName = "DisputeReviewPane";
