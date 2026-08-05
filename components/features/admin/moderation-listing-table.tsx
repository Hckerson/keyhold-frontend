"use client";

import { ModerationListingRow } from "@/components/features/admin/moderation-listing-row";
import type { DecisionMode, ModerationListing } from "@/lib/types";

const TABLE_CAPTION =
    "Submitted listings by review status, address, asking price, submitting agent, compliance score, user reports and time in queue";
const ACTION_HEADING = "Approve, request changes or reject";

export interface ModerationListingTableProps {
    listings: ModerationListing[];
    onOpen: (id: string) => void;
    onApprove: (id: string) => void;
    onDecide: (mode: DecisionMode, id: string) => void;
}

export function ModerationListingTable({
    listings,
    onOpen,
    onApprove,
    onDecide,
}: ModerationListingTableProps) {
    return (
        <table className="table-flush w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-28 text-left">
                        Status
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Listing
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Ask
                    </th>
                    <th scope="col" className="micro-label w-32 pl-3 text-left">
                        Agent
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-28 pl-3 text-right"
                    >
                        Compliance
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Reports
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Age
                    </th>
                    <th scope="col" className="w-20 pl-3">
                        <span className="sr-only">{ACTION_HEADING}</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {listings.map((listing) => (
                    <ModerationListingRow
                        key={listing.id}
                        listing={listing}
                        onOpen={onOpen}
                        onApprove={onApprove}
                        onDecide={onDecide}
                    />
                ))}
            </tbody>
        </table>
    );
}

ModerationListingTable.displayName = "ModerationListingTable";
