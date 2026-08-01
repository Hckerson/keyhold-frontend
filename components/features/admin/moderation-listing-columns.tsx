"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type { DataTableConfig } from "@/components/patterns/data-table";
import { ModerationListingDetail } from "@/components/features/admin/moderation-listing-detail";
import {
    AgentCell,
    ComplianceCell,
    ListingCell,
    ModerationRowActions,
} from "@/components/features/admin/moderation-table-cells";
import {
    checkMeta,
    statusMeta,
    type DecisionMode,
    type ModerationListing,
} from "@/lib/data/admin-listings";
import { TABLE_PAGE_SIZE } from "@/lib/constants";
import { formatMillions, parseLocalDate } from "@/lib/utils";

export interface ModerationTableOptions {
    onApprove: (id: string) => void;
    onDecision: (mode: DecisionMode, id: string) => void;
}

const SUBMITTED_FORMAT = "MMM d, yyyy";

const complianceWeight = (listing: ModerationListing) =>
    listing.compliance.reduce(
        (total, check) => total + checkMeta[check.state].weight,
        0,
    );

const openChecks = (rows: ModerationListing[]) =>
    rows.reduce(
        (total, row) =>
            total +
            row.compliance.filter((check) => check.state !== "pass").length,
        0,
    );

const totalValue = (rows: ModerationListing[]) =>
    rows.reduce((total, row) => total + row.price, 0);

export function buildModerationTableConfig({
    onApprove,
    onDecision,
}: ModerationTableOptions): DataTableConfig<ModerationListing> {
    return {
        columns: [
            {
                id: "listing",
                label: "Listing",
                sortValue: (row) => row.address,
                render: (row) => <ListingCell listing={row} />,
                footer: (rows) => (
                    <span className="micro-label">{rows.length} in queue</span>
                ),
            },
            {
                id: "price",
                label: "Price",
                align: "right",
                width: "7rem",
                sortValue: (row) => row.price,
                render: (row) => (
                    <span className="font-display text-text text-lg leading-none font-light tabular-nums">
                        {formatMillions(row.price)}
                    </span>
                ),
                footer: (rows) => (
                    <span className="text-text text-xs font-semibold tabular-nums">
                        {formatMillions(totalValue(rows))}
                    </span>
                ),
            },
            {
                id: "agent",
                label: "Agent",
                width: "9rem",
                sortValue: (row) => row.agent.name,
                render: (row) => <AgentCell agent={row.agent} />,
            },
            {
                id: "submitted",
                label: "Submitted",
                width: "6.5rem",
                sortValue: (row) => row.submittedDate,
                render: (row) => (
                    <span className="text-text-muted font-mono text-[10px] tracking-wide whitespace-nowrap tabular-nums">
                        {format(
                            parseLocalDate(row.submittedDate),
                            SUBMITTED_FORMAT,
                        )}
                    </span>
                ),
            },
            {
                id: "compliance",
                label: "Compliance",
                width: "7rem",
                sortValue: complianceWeight,
                render: (row) => <ComplianceCell checks={row.compliance} />,
                footer: (rows) => (
                    <span className="text-text-secondary text-xs font-semibold tabular-nums">
                        {openChecks(rows)} open
                    </span>
                ),
            },
            {
                id: "status",
                label: "Status",
                width: "6.5rem",
                sortValue: (row) => statusMeta[row.status].rank,
                render: (row) => (
                    <StatusBadge tone={statusMeta[row.status].tone}>
                        {statusMeta[row.status].label}
                    </StatusBadge>
                ),
            },
            {
                id: "actions",
                label: "Actions",
                align: "right",
                width: "6.5rem",
                srOnlyLabel: true,
                render: (row) => (
                    <ModerationRowActions
                        listing={row}
                        onApprove={onApprove}
                        onDecision={onDecision}
                    />
                ),
            },
        ],
        rowKey: (row) => row.id,
        rowLabel: (row) => row.address,
        rowClassName: (row) => statusMeta[row.status].rowTone,
        caption:
            "Submitted listings awaiting moderation with cover photo, asking price, submitting agent, submission date, compliance signals, review status and per-row review actions",
        emptyMessage: "No listings match this filter right now",
        defaultSort: { id: "status", direction: "asc" },
        selectable: true,
        pageSize: TABLE_PAGE_SIZE,
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
