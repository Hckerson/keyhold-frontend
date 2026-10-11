"use client";

import { Checkbox } from "@/components/ui/forms/checkbox";
import { AnimatePresence } from "motion/react";
import { ListingRow } from "@/components/features/agent/listing-row";
import type { ManagedListing } from "@/lib/types";

const TABLE_CAPTION = "Managed listings by status, price, exposure and demand";
const SELECT_ALL_LABEL = "Select every visible listing";

export interface ListingTableProps {
    listings: ManagedListing[];
    peak: number;
    selectedIds: string[];
    allSelected: boolean;
    onToggleAll: () => void;
    onSelectedChange: (id: string, selected: boolean) => void;
}

export function ListingTable({
    listings,
    peak,
    selectedIds,
    allSelected,
    onToggleAll,
    onSelectedChange,
}: ListingTableProps) {
    return (
        <table className="table-flush w-full min-w-3xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="w-8">
                        <Checkbox
                            checked={allSelected}
                            aria-label={SELECT_ALL_LABEL}
                            onChange={onToggleAll}
                        />
                    </th>
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
                        Price
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Days
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Exposure
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Tours
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-14 pl-3 text-right"
                    >
                        Offers
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                <AnimatePresence initial={false}>
                    {listings.map((listing) => (
                        <ListingRow
                            key={listing.id}
                            listing={listing}
                            peak={peak}
                            selected={selectedIds.includes(listing.id)}
                            onSelectedChange={onSelectedChange}
                        />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    );
}

ListingTable.displayName = "ListingTable";
