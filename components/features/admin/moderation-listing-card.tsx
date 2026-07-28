"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Callout } from "@/components/ui/callout";
import { Checkbox } from "@/components/ui/forms/checkbox";
import { Image } from "@/components/ui/image";
import { AgentContact } from "@/components/features/admin/agent-contact";
import { ComplianceList } from "@/components/features/admin/compliance-list";
import {
    statusMeta,
    type DecisionMode,
    type ModerationListing,
} from "@/lib/data/admin-listings";
import { formatMillions } from "@/lib/utils";

export interface ModerationListingCardProps {
    listing: ModerationListing;
    selected: boolean;
    onToggle: (id: string) => void;
    onApprove: (ids: string[]) => void;
    onDecision: (mode: DecisionMode, ids: string[]) => void;
}

export function ModerationListingCard({
    listing,
    selected,
    onToggle,
    onApprove,
    onDecision,
}: ModerationListingCardProps) {
    const meta = statusMeta[listing.status];

    return (
        <article className="bg-background-muted border-border-light hover:border-border ease-smooth rounded-xl border p-3 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-start gap-3">
                <Checkbox
                    aria-label={`Select ${listing.address}`}
                    checked={selected}
                    onChange={() => onToggle(listing.id)}
                />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-text truncate text-sm font-medium">
                            {listing.address}
                        </h3>
                        <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <span className="text-text font-medium tabular-nums">
                            {formatMillions(listing.price)}
                        </span>
                        <span className="text-text-muted">·</span>
                        <span className="text-text-muted">
                            Submitted {listing.submittedDate}
                        </span>
                    </div>

                    <AgentContact agent={listing.agent} />

                    <div className="mt-3 grid gap-3 sm:grid-cols-[13rem_1fr]">
                        <div>
                            <p className="micro-label">
                                Photos · {listing.images.length}
                            </p>
                            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                                {listing.images.map((src, index) => (
                                    <Image
                                        key={src}
                                        src={src}
                                        alt={`${listing.address} photo ${index + 1}`}
                                        loading="lazy"
                                        className="border-border-light border"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="min-w-0">
                            <p className="micro-label">Description</p>
                            <p className="text-text-secondary mt-1.5 text-xs leading-relaxed">
                                {listing.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3">
                        <p className="micro-label">Compliance</p>
                        <ComplianceList checks={listing.compliance} />
                    </div>

                    {listing.reason && (
                        <Callout
                            variant="error"
                            title="Flagged reason"
                            description={listing.reason}
                            className="mt-3"
                        />
                    )}

                    {listing.note && (
                        <Callout
                            variant={
                                listing.changesRequested ? "warning" : "error"
                            }
                            title={
                                listing.changesRequested
                                    ? "Changes requested"
                                    : "Rejection reason"
                            }
                            description={listing.note}
                            className="mt-3"
                        />
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                        {listing.status !== "approved" && (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => onApprove([listing.id])}
                            >
                                Approve
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onDecision("changes", [listing.id])}
                        >
                            Request Changes
                        </Button>
                        {listing.status !== "rejected" && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                    onDecision("reject", [listing.id])
                                }
                            >
                                Reject
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
