"use client";

import { AnimatePresence } from "motion/react";
import { InterestRow } from "@/components/features/dashboard/interest-row";
import type { Interest } from "@/lib/types";

const TABLE_CAPTION =
    "Registered interests by status, property, listing office, traction, asking price and age";

export interface InterestTableProps {
    interests: Interest[];
}

export function InterestTable({ interests }: InterestTableProps) {
    return (
        <table className="table-flush w-full min-w-4xl table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label w-32 text-left">
                        Status
                    </th>
                    <th scope="col" className="micro-label pl-3 text-left">
                        Property
                    </th>
                    <th scope="col" className="micro-label w-48 pl-3 text-left">
                        Listing office
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Traction
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Ask
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
                    {interests.map((interest) => (
                        <InterestRow key={interest.id} interest={interest} />
                    ))}
                </AnimatePresence>
            </tbody>
        </table>
    );
}

InterestTable.displayName = "InterestTable";
