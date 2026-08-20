"use client";

import { AnimatePresence } from "motion/react";
import { OfferRow } from "@/components/features/dashboard/offer-row";
import type { Offer } from "@/lib/types";

const TABLE_CAPTION =
    "Submitted offers by status, property, amount, asking price, counter, gap to ask and age";

export interface OfferTableProps {
    offers: Offer[];
    onWithdraw: (id: string) => void;
}

export function OfferTable({ offers, onWithdraw }: OfferTableProps) {
    return (
        <table className="table-flush w-full min-w-4xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-28 text-left">
                        Status
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Property
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Offer
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Ask
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Counter
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Gap
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Age
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-24 pl-3 text-right"
                    >
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                <AnimatePresence initial={false}>
                    {offers.map((offer) => (
                        <OfferRow
                            key={offer.id}
                            offer={offer}
                            onWithdraw={onWithdraw}
                        />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    );
}

OfferTable.displayName = "OfferTable";
