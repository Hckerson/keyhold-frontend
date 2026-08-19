"use client";

import { m } from "motion/react";
import { AgeMark } from "@/components/features/shared/age-mark";
import { ComplianceMeter } from "@/components/features/admin/compliance-meter";
import { ModerationAgentMark } from "@/components/features/admin/moderation-agent-mark";
import { ModerationListingMark } from "@/components/features/admin/moderation-listing-mark";
import { ModerationRowActions } from "@/components/features/admin/moderation-row-actions";
import { ModerationStatusMark } from "@/components/features/admin/moderation-status-mark";
import { ReportCountMark } from "@/components/features/admin/report-count-mark";
import { complianceScore, isOpen } from "@/lib/data/admin-listings";
import { TABLE_ROW_MOTION } from "@/lib/config/motion";
import { cn, formatMillions } from "@/lib/utils";
import type { DecisionMode, ModerationListing } from "@/lib/types";

export interface ModerationListingRowProps {
    listing: ModerationListing;
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationListingRow({
    listing,
    onOpen,
    onApprove,
    onDecide,
}: ModerationListingRowProps) {
    return (
        <m.tr
            {...TABLE_ROW_MOTION}
            className={cn(
                "ease-smooth hover:bg-background-muted h-11 transition-colors",
                !isOpen(listing) && "opacity-60",
            )}
        >
            <td className="py-0">
                <ModerationStatusMark status={listing.status} />
            </td>
            <td className="py-0 pl-3">
                <ModerationListingMark listing={listing} onOpen={onOpen} />
            </td>
            <td className="text-text py-0 pl-3 text-right text-xs font-semibold tabular-nums">
                {formatMillions(listing.price, 2)}
            </td>
            <td className="py-0 pl-3">
                <ModerationAgentMark agent={listing.agent} />
            </td>
            <td className="py-0 pl-3">
                <ComplianceMeter
                    score={complianceScore(listing)}
                    label={listing.address}
                />
            </td>
            <td className="py-0 pl-3 text-right">
                <ReportCountMark reports={listing.reports} />
            </td>
            <td className="py-0 pl-3 text-right">
                <AgeMark minutes={listing.queuedMinutes} />
            </td>
            <td className="py-0 pl-3">
                <ModerationRowActions
                    listing={listing}
                    onApprove={onApprove}
                    onDecide={onDecide}
                />
            </td>
        </m.tr>
    );
}

ModerationListingRow.displayName = "ModerationListingRow";
