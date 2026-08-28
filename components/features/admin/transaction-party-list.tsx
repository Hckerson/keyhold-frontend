import type { LedgerTransaction } from "@/lib/types";

const BUYER_LABEL = "Buyer";
const AGENT_LABEL = "Listing agent";

export interface TransactionPartyListProps {
    transaction: LedgerTransaction;
}

export function TransactionPartyList({
    transaction,
}: TransactionPartyListProps) {
    const parties = [
        { label: BUYER_LABEL, name: transaction.buyer },
        { label: AGENT_LABEL, name: transaction.agent },
    ];

    return (
        <dl className="divide-border divide-y">
            {parties.map((party) => (
                <div
                    key={party.label}
                    className="flex h-9 items-center justify-between gap-3"
                >
                    <dt className="micro-label">{party.label}</dt>
                    <dd className="text-text truncate text-xs font-medium">
                        {party.name}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

TransactionPartyList.displayName = "TransactionPartyList";
