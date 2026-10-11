"use client";

import { AnimatePresence } from "motion/react";
import { SavedRow } from "@/components/features/dashboard/saved-row";
import type { SavedListing } from "@/lib/types";

const TABLE_CAPTION =
    "Saved properties by market status, asking price, movement since saving, search match and recency";
const ACTION_HEADING = "Remove from saved";

export interface SavedTableProps {
    listings: SavedListing[];
    onRemove: (id: string) => void;
}

export function SavedTable({ listings, onRemove }: SavedTableProps) {
    return (
        <table className="table-flush w-full min-w-3xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Property
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        Status
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Ask
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Move
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-16 pl-3 text-right"
                    >
                        Match
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Saved
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Seen
                    </th>
                    <th scope="col" className="w-10 pl-3">
                        <span className="sr-only">{ACTION_HEADING}</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                <AnimatePresence initial={false}>
                    {listings.map((listing) => (
                        <SavedRow
                            key={listing.id}
                            listing={listing}
                            onRemove={onRemove}
                        />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    );
}

SavedTable.displayName = "SavedTable";
