import { PayoutRow } from "@/components/features/admin/payout-row";
import type { Payout } from "@/lib/types";

const TABLE_CAPTION =
    "Agent commission payouts by recipient, deal, release state, rail, net amount and age";
const ACTION_HEADING = "Open the payout";

export interface PayoutTableProps {
    payouts: Payout[];
}

export function PayoutTable({ payouts }: PayoutTableProps) {
    return (
        <table className="table-flush w-full table-fixed">
            <caption className="sr-only">{TABLE_CAPTION}</caption>
            <thead>
                <tr className="border-border h-9 border-b">
                    <th scope="col" className="micro-label text-left">
                        Recipient
                    </th>
                    <th scope="col" className="micro-label w-36 pl-3 text-left">
                        Deal
                    </th>
                    <th scope="col" className="micro-label w-28 pl-3 text-left">
                        State
                    </th>
                    <th scope="col" className="micro-label w-24 pl-3 text-left">
                        Rail
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-20 pl-3 text-right"
                    >
                        Net · fee
                    </th>
                    <th
                        scope="col"
                        className="micro-label w-12 pl-3 text-right"
                    >
                        Age
                    </th>
                    <th scope="col" className="w-10 pl-3">
                        <span className="sr-only">{ACTION_HEADING}</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-border divide-y">
                {payouts.map((payout) => (
                    <PayoutRow key={payout.id} payout={payout} />
                ))}
            </tbody>
        </table>
    );
}

PayoutTable.displayName = "PayoutTable";
