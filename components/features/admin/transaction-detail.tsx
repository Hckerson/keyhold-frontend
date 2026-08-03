import { format } from "date-fns";
import { Callout } from "@/components/ui/callout";
import { StatusBadge } from "@/components/ui/status-badge";
import { transactionStatusMeta } from "@/components/features/admin/transaction-table-cells";
import { formatMillions, formatThousands, parseLocalDate } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

const INITIATED_FORMAT = "MMMM d, yyyy";

export interface TransactionDetailProps {
    transaction: Transaction;
    commissionRate: number;
}

function PartyRow({ label, name }: { label: string; name: string }) {
    return (
        <div className="border-border-light flex items-baseline justify-between gap-4 border-b py-1.5 last:border-b-0">
            <span className="micro-label">{label}</span>
            <span className="text-text text-xs font-medium">{name}</span>
        </div>
    );
}

export function TransactionDetail({
    transaction,
    commissionRate,
}: TransactionDetailProps) {
    const status = transactionStatusMeta[transaction.status];
    const parties = [
        { label: "Buyer", name: transaction.buyer },
        { label: "Agent", name: transaction.agent },
    ];

    return (
        <div className="space-y-4">
            <div className="bg-background-alt rounded-lg px-3 py-2.5">
                <p className="micro-label">Sale price</p>
                <p className="font-display text-h6 text-text mt-0.5 font-light tabular-nums">
                    {formatMillions(transaction.price, 2)}
                </p>
                <p className="text-text-secondary mt-1 text-xs tabular-nums">
                    {formatThousands(transaction.price * commissionRate)}{" "}
                    commission at {(commissionRate * 100).toFixed(1)}%
                </p>
            </div>

            <div className="flex items-center justify-between gap-3">
                <StatusBadge tone={status.tone} icon={status.icon} size="md">
                    {status.label}
                </StatusBadge>
                <span className="text-text-muted text-xs tabular-nums">
                    Initiated{" "}
                    {format(
                        parseLocalDate(transaction.initiatedDate),
                        INITIATED_FORMAT,
                    )}
                </span>
            </div>

            {status.openNote && (
                <Callout
                    variant={status.tone}
                    title={`${status.label} — not yet settled`}
                    description={status.openNote}
                />
            )}

            <div>
                <p className="micro-label">Parties</p>
                <div className="mt-1.5">
                    {parties.map((party) => (
                        <PartyRow key={party.label} {...party} />
                    ))}
                </div>
            </div>

            <div>
                <p className="micro-label">Property</p>
                <p className="text-text-secondary mt-1.5 text-xs leading-relaxed">
                    {transaction.property}
                </p>
            </div>
        </div>
    );
}

TransactionDetail.displayName = "TransactionDetail";
