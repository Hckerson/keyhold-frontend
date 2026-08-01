"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { DataTableConfig } from "@/components/patterns/data-table";
import { ModerationListingDetail } from "@/components/features/admin/moderation-listing-detail";
import {
    statusMeta,
    type DecisionMode,
    type ModerationListing,
} from "@/lib/data/admin-listings";
import { cn, formatMillions } from "@/lib/utils";

export interface ModerationTableOptions {
    onApprove: (id: string) => void;
    onDecision: (mode: DecisionMode, id: string) => void;
}

const openIssues = (listing: ModerationListing) =>
    listing.compliance.filter((check) => check.state !== "pass").length;

const hasFailure = (listing: ModerationListing) =>
    listing.compliance.some((check) => check.state === "fail");

export function buildModerationTableConfig({
    onApprove,
    onDecision,
}: ModerationTableOptions): DataTableConfig<ModerationListing> {
    return {
        columns: [
            {
                id: "address",
                label: "Address",
                sortValue: (row) => row.address,
                render: (row) => (
                    <span className="text-text block truncate text-xs font-medium">
                        {row.address}
                    </span>
                ),
            },
            {
                id: "price",
                label: "Price",
                align: "right",
                width: "6rem",
                sortValue: (row) => row.price,
                render: (row) => (
                    <span className="text-text text-xs font-medium tabular-nums">
                        {formatMillions(row.price)}
                    </span>
                ),
            },
            {
                id: "agent",
                label: "Agent",
                width: "9rem",
                sortValue: (row) => row.agent.name,
                render: (row) => (
                    <span className="text-text-secondary block truncate text-xs">
                        {row.agent.name}
                    </span>
                ),
            },
            {
                id: "submitted",
                label: "Submitted",
                width: "7rem",
                sortValue: (row) => row.submittedDate,
                render: (row) => (
                    <span className="text-text-muted font-mono text-[10px] tracking-wide tabular-nums">
                        {row.submittedDate}
                    </span>
                ),
            },
            {
                id: "issues",
                label: "Issues",
                width: "6rem",
                sortValue: (row) => openIssues(row),
                render: (row) => {
                    const count = openIssues(row);
                    if (count === 0)
                        return <span className="text-text-muted text-xs">—</span>;
                    return (
                        <span
                            className={cn(
                                "text-xs font-medium tabular-nums",
                                hasFailure(row)
                                    ? "text-error"
                                    : "text-warning",
                            )}
                        >
                            {count}
                        </span>
                    );
                },
            },
            {
                id: "status",
                label: "Status",
                width: "7rem",
                sortValue: (row) => statusMeta[row.status].label,
                render: (row) => (
                    <StatusBadge tone={statusMeta[row.status].tone}>
                        {statusMeta[row.status].label}
                    </StatusBadge>
                ),
            },
        ],
        rowKey: (row) => row.id,
        rowLabel: (row) => row.address,
        caption:
            "Submitted listings awaiting moderation with price, agent, submission date, compliance issues and status",
        emptyMessage: "No listings match this filter right now",
        selectable: true,
        reveal: "panel",
        panelSize: "lg",
        renderDetail: (row) => <ModerationListingDetail listing={row} />,
        panelFooter: (row) => (
            <>
                {row.status !== "approved" && (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onApprove(row.id)}
                    >
                        Approve
                    </Button>
                )}
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onDecision("changes", row.id)}
                >
                    Request Changes
                </Button>
                {row.status !== "rejected" && (
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDecision("reject", row.id)}
                    >
                        Reject
                    </Button>
                )}
            </>
        ),
    };
}
