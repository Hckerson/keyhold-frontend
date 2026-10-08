"use client";

import { CircleCheckBig } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { LabelledBlock } from "@/components/patterns/labelled-block";
import { MetricCell } from "@/components/patterns/metric-cell";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ListingThumb } from "@/components/features/shared/listing-thumb";
import { ComplianceCheckList } from "@/components/features/admin/compliance-check-list";
import { ModerationInspectorActions } from "@/components/features/admin/moderation-inspector-actions";
import { ModerationStatusMark } from "@/components/features/admin/moderation-status-mark";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { MODERATION_STATUSES } from "@/lib/config/moderation-tones";
import { formatMillions } from "@/lib/utils";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const TITLE = "Next decision";
const ASKING_LABEL = "Asking";
const REPORTS_LABEL = "Reports";
const QUEUE_LABEL = "In queue";
const AGENT_LABEL = "Agent";
const CLEAR_TITLE = "Queue is clear";
const CLEAR_LEDE = "Every submitted listing has a decision.";

export interface ModerationInspectorProps {
    listing?: ModerationListing;
    pending?: boolean;
    approvingId?: string;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationInspector({
    listing,
    pending,
    approvingId,
    onOpen,
    onApprove,
    onDecide,
}: ModerationInspectorProps) {
    return (
        <aside
            aria-label={TITLE}
            aria-busy={pending || undefined}
            className="border-accent/25 bg-background flex flex-col overflow-hidden rounded-xl border shadow-md"
        >
            <header className="bg-background-alt border-border-light flex h-11 items-center justify-between gap-3 border-b px-3">
                <h2 className="micro-label shrink-0">{TITLE}</h2>
                {listing && <ModerationStatusMark status={listing.status} />}
            </header>

            {pending ? (
                <Skeleton className="aspect-video w-full rounded-none" />
            ) : !listing ? (
                <EmptyState
                    icon={CircleCheckBig}
                    title={CLEAR_TITLE}
                    description={CLEAR_LEDE}
                />
            ) : (
                <>
                    <ListingThumb
                        src={listing.photos[0] ?? null}
                        alt={listing.address}
                        variant="card"
                        className="aspect-video h-auto w-full rounded-none border-0"
                    />

                    <div className="flex flex-col gap-3 p-3">
                        <div className="flex items-end justify-between gap-3">
                            <p className="min-w-0 text-xs">
                                <span className="text-text block truncate font-semibold">
                                    {listing.address}
                                </span>
                                <span className="text-text-muted block truncate">
                                    {listing.locality}
                                </span>
                            </p>
                            <p className="flex shrink-0 flex-col items-end">
                                <span className="micro-label">
                                    {ASKING_LABEL}
                                </span>
                                <span className="font-display text-h4 text-text leading-none font-light tabular-nums">
                                    {formatMillions(listing.price, 2)}
                                </span>
                            </p>
                        </div>

                        {listing.note && (
                            <LabelledBlock
                                label={
                                    MODERATION_STATUSES[listing.status]
                                        .noteTitle
                                }
                            >
                                <p className="text-text-secondary line-clamp-2 text-xs">
                                    {listing.note}
                                </p>
                            </LabelledBlock>
                        )}

                        <ComplianceCheckList
                            compliance={listing.compliance}
                            openOnly
                        />

                        <div className="bg-background-muted grid grid-cols-3 gap-3 rounded-lg p-3">
                            <MetricCell label={REPORTS_LABEL}>
                                <ReportCountMark reports={listing.reports} />
                            </MetricCell>
                            <MetricCell label={QUEUE_LABEL}>
                                <AgeMark minutes={listing.queuedMinutes} />
                            </MetricCell>
                            <MetricCell label={AGENT_LABEL}>
                                <span className="truncate">
                                    {listing.agent.name}
                                </span>
                            </MetricCell>
                        </div>
                    </div>

                    <ModerationInspectorActions
                        listing={listing}
                        approvingId={approvingId}
                        onOpen={onOpen}
                        onApprove={onApprove}
                        onDecide={onDecide}
                    />
                </>
            )}
        </aside>
    );
}

ModerationInspector.displayName = "ModerationInspector";
